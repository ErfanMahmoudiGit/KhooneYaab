from django.shortcuts import render
from .genetic_algorithm import genetic_algorithm
import json
import math
from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_POST
from .models import Building
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError
from django.utils.dateparse import parse_date
from .models import Building
from django.db.models import Q

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
# Create your views here.

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_house(request):
    try:
        data = json.loads(request.body)
        
        title = data.get('title')
        time = parse_date(data.get('time'))
        meterage = data.get('meterage')
        price = data.get('price')
        price_per_meter = data.get('price_per_meter')
        image = data.get('image')
        description = data.get('description')
        phone = data.get('phone')
        floor = data.get('floor')
        all_floors = data.get('all_floors')
        build_date = data.get('build_date')
        rooms = data.get('rooms')
        facilities = data.get('facilities')
        latitude = data.get('latitude')
        longitude = data.get('longitude')
        priorities = data.get('priorities')

        if all_floors < floor:
            return JsonResponse({'error': 'All floors must be greater than or equal to floor number'}, status=400)

        # Validate facilities and priorities
        if not isinstance(facilities, list) or len(facilities) != 3 or not all(isinstance(i, int) and i in [0, 1] for i in facilities):
            return JsonResponse({'error': 'Facilities must be a list of three elements containing 0 or 1'}, status=400)
        
        if not isinstance(priorities, list) or len(priorities) != 3 or not all(isinstance(i, int) and i in [0, 1] for i in priorities):
            return JsonResponse({'error': 'Priorities must be a list of three elements containing 0 or 1'}, status=400)

        # Create the new building object
        building = Building(
            title=title,
            time=time,
            meterage=meterage,
            price=price,
            price_per_meter=price_per_meter,
            image=image,
            description=description,
            phone=phone,
            floor=floor,
            all_floors=all_floors,
            build_date=build_date,
            rooms=rooms,
            facilities=facilities,
            latitude=latitude,
            longitude=longitude,
            priorities=priorities
        )

        # Save the building object to the database
        building.save()

        return JsonResponse({'message': 'Building created successfully', 'id': building.id}, status=201)
    
    except (KeyError, TypeError, ValueError, ValidationError) as e:
        return JsonResponse({'error': str(e)}, status=400)


@require_GET
def get_buildings(request):
    buildings = Building.objects.all()
    building_list = []

    for building in buildings:
        building_data = {
            'meterage': building.meterage,
            'price': building.price,
            'build_date': building.build_date.year,
            'rooms': building.rooms,
            'facilities': ['warehouse' if building.facilities[0] else '', 
                           'parking' if building.facilities[1] else '', 
                           'elevator' if building.facilities[2] else ''],
            'latitude': building.latitude,
            'longitude': building.longitude,
            'priorities': building.priorities
        }
        building_list.append(building_data)

    return JsonResponse(building_list, safe=False)

@require_GET
def search_buildings(request):
    query = request.GET.get('q', '')
    if query:
        buildings = Building.objects.filter(Q(title__icontains=query) | Q(description__icontains=query))
    else:
        buildings = Building.objects.none()

    buildings_data = [
        {
            'id': building.id,
            'title': building.title,
            'description': building.description,
            'price': building.price,
            'meterage': building.meterage,
            'rooms': building.rooms,
            'latitude': building.latitude,
            'longitude': building.longitude,
            #'area': building.area.name if building.area else None
        } for building in buildings
    ]

    return JsonResponse(buildings_data, safe=False)

@require_GET
def find_best_building(request):
    target = {
        'meterage': int(request.GET.get('meterage', 0)),
        'price': int(request.GET.get('price', 0)),
        'build_date': int(request.GET.get('build_date', 0)),
        'rooms': int(request.GET.get('rooms', 0)),
        'facilities': json.loads(request.GET.get('facilities', '[]')),
        'locations': json.loads(request.GET.get('locations', '[]')),
        'priorities': json.loads(request.GET.get('priorities', '[]')),
    }
    
    best_building = genetic_algorithm(target)
    
    if best_building:
        response_data = {
            'meterage': best_building.meterage,
            'price': best_building.price,
            'build_date': best_building.build_date,
            'rooms': best_building.rooms,
            'facilities': best_building.facilities,
            'latitude': best_building.latitude,
            'longitude': best_building.longitude,
            'priorities': best_building.priorities
        }
        return JsonResponse(response_data, safe=False)
    else:
        return JsonResponse({'error': 'No suitable building found'}, status=404)