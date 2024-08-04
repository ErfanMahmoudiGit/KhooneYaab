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

from django.shortcuts import get_object_or_404

from extentions import utils
# Create your views here.

#@api_view(['POST'])
#@permission_classes([IsAuthenticated])
@require_POST
def create_house(request):
    try:
        data = json.loads(request.body)
        city = data.get('city')
        category = data.get('category')
        title = data.get('title')
        time = parse_date(data.get('time'))
        meterage = utils.convert_persian_text_to_english_digits(data.get('meterage'))
        price = utils.convert_persian_text_to_english_digits(data.get('price'))
        price_per_meter = utils.convert_persian_text_to_english_digits(data.get('price_per_meter'))
        image = data.get('image')
        description = data.get('description')
        floor = utils.convert_persian_text_to_english_digits(data.get('floor'))
        all_floors = utils.convert_persian_text_to_english_digits(data.get('all_floors'))
        build_date = data.get('build_date')
        rooms = utils.convert_persian_text_to_english_digits(data.get('rooms'))
        elevator=utils.convert_persian_text_to_english_digits(data.get('elevator'))
        parking=utils.convert_persian_text_to_english_digits(data.get('parking'))
        warehouse =utils.convert_persian_text_to_english_digits(data.get('warehouse'))
        direction = data.get('direction')
        document_type = data.get('document_type')
        status = data.get('status')
        latitude = data.get('latitude')
        longitude = data.get('longitude')
        priorities = data.get('priorities')

        # Create the new building object
        building = Building(
            title=title,
            time=time,
            meterage=meterage,
            price=price,
            price_per_meter=price_per_meter,
            image=image,
            description=description,
            floor=floor,
            all_floors = all_floors,
            build_date=build_date,
            rooms=rooms,
            facilities = f"[{elevator},{parking},{warehouse}]",
            latitude=latitude,
            longitude=longitude,
            priorities=priorities,
            document_type = document_type,
            status = status,
            direction = direction,
            city = city,
            category = category
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
            'build_date': building.build_date,
            'rooms': building.rooms,
            'warehouse': 1 if building.facilities[0] else 0,
            'parking': 1 if building.facilities[1] else 0,
            'elevator': 1 if building.facilities[2] else 0,
            'latitude': building.latitude,
            'longitude': building.longitude,
            'priorities': building.priorities,
            'title':building.title,
            'time':building.time,
            'price_per_meter':building.price_per_meter,
            'image':building.image,
            'description':building.description,
            'floor':building.floor,
            'all_floors' :building.all_floors,
            'document_type' :building.document_type,
            'status':building.status,
            'direction' :building.direction,
            'city' :building.city,
            'category' :building.category
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
            'meterage': building.meterage,
            'price': building.price,
            'build_date': building.build_date,
            'rooms': building.rooms,
            'warehouse': 1 if building.facilities[0] else 0,
            'parking': 1 if building.facilities[1] else 0,
            'elevator': 1 if building.facilities[2] else 0,
            'latitude': building.latitude,
            'longitude': building.longitude,
            'priorities': building.priorities,
            'title':building.title,
            'time':building.time,
            'price_per_meter':building.price_per_meter,
            'image':building.image,
            'description':building.description,
            'floor':building.floor,
            'all_floors' :building.all_floors,
            'document_type' :building.document_type,
            'status':building.status,
            'direction' :building.direction,
            'city' :building.city,
            'category' :building.category
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
    
def get_building_by_id(request, id):
    building = get_object_or_404(Building, id=id)
    building_data = {
        'id': building.id,
        'city': building.city,
        'category': building.category,
        'title': building.title,
        'time': building.time,
        'meterage': building.meterage,
        'price': building.price,
        'price_per_meter': building.price_per_meter,
        'image': building.image,
        'description': building.description,
        'floor': building.floor,
        'all_floors': building.all_floors,
        'build_date': building.build_date,
        'rooms': building.rooms,
        'facilities': building.facilities,
        'direction': building.direction,
        'document_type': building.document_type,
        'status': building.status,
        'latitude': building.latitude,
        'longitude': building.longitude,
        'priorities': building.priorities,
    }
    return JsonResponse(building_data)