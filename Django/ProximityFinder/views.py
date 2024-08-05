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


STATE_DATA = [
    {"name": "آذربايجان شرقی", "center": "تبریز", "latitude": "38.50", "longitude": "46.180", "id": 1},
    {"name": "آذربايجان غربی", "center": "ارومیه", "latitude": "37.320", "longitude": "45.40", "id": 2},
    {"name": "اردبيل", "center": "اردبیل", "latitude": "38.140", "longitude": "48.170", "id": 3},
    {"name": "اصفهان", "center": "اصفهان", "latitude": "32.390", "longitude": "51.400", "id": 4},
    {"name": "ايلام", "center": "ايلام", "latitude": "33.380", "longitude": "46.250", "id": 5},
    {"name": "بوشهر", "center": "بوشهر", "latitude": "28.590", "longitude": "50.500", "id": 6},
    {"name": "تهران", "center": "تهران", "latitude": "35.410", "longitude": "51.240", "id": 7},
    {"name": "چهارمحال بختیاری", "center": "شهركرد", "latitude": "32.190", "longitude": "50.510", "id": 8},
    {"name": "خراسان جنوبی", "center": "بيرجند", "latitude": "32.5216", "longitude": "59.1315", "id": 9},
    {"name": "خراسان رضوی", "center": "مشهد", "latitude": "36.170", "longitude": "59.350", "id": 10},
    {"name": "خراسان شمالی", "center": "بجنورد", "latitude": "37.2835", "longitude": "57.1954", "id": 11},
    {"name": "خوزستان", "center": "اهواز", "latitude": "31.190", "longitude": "48.410", "id": 12},
    {"name": "زنجان", "center": "زنجان", "latitude": "36.400", "longitude": "48.290", "id": 13},
    {"name": "سمنان", "center": "سمنان", "latitude": "35.340", "longitude": "53.230", "id": 14},
    {"name": "سيستان و بلوچستان", "center": "زاهدان", "latitude": "29.320", "longitude": "60.540", "id": 15},
    {"name": "فارس", "center": "شيراز", "latitude": "29.360", "longitude": "52.310", "id": 16},
    {"name": "قزوين", "center": "قزوين", "latitude": "36.167", "longitude": "50.010", "id": 17},
    {"name": "قم", "center": "قم", "latitude": "34.380", "longitude": "50.530", "id": 18},
    {"name": "البرز", "center": "کرج", "latitude": "35.8400", "longitude": "50.9391", "id": 19},
    {"name": "كردستان", "center": "سنندج", "latitude": "35.180", "longitude": "47.10", "id": 20},
    {"name": "کرمان", "center": "کرمان", "latitude": "30.160", "longitude": "57.40", "id": 21},
    {"name": "كرمانشاه", "center": "كرمانشاه", "latitude": "34.180", "longitude": "47.30", "id": 22},
    {"name": "كهكيلويه و بويراحمد", "center": "ياسوج", "latitude": "30.390", "longitude": "51.350", "id": 23},
    {"name": "گلستان", "center": "گرگان", "latitude": "36.500", "longitude": "54.250", "id": 24},
    {"name": "گيلان", "center": "رشت", "latitude": "37.160", "longitude": "49.350", "id": 25},
    {"name": "لرستان", "center": "خرم آباد", "latitude": "33.290", "longitude": "48.210", "id": 26},
    {"name": "مازندران", "center": "ساري", "latitude": "36.330", "longitude": "53.30", "id": 27},
    {"name": "مرکزی", "center": "اراک", "latitude": "34.50", "longitude": "49.410", "id": 28},
    {"name": "هرمزگان", "center": "بندرعباس", "latitude": "56.266", "longitude": "27.18", "id": 29},
    {"name": "همدان", "center": "همدان", "latitude": "34.470", "longitude": "48.300", "id": 30},
    {"name": "يزد", "center": "يزد", "latitude": "31.530", "longitude": "54.210", "id": 31},
]


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

def get_buildings_by_category(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            category = data.get('category')
            if not category:
                return JsonResponse({'error': 'Category is required'}, status=400)
            
            buildings = Building.objects.filter(category=category)
            buildings_data = []
            for building in buildings:
                buildings_data.append({
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
                })
            return JsonResponse(buildings_data, safe=False)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'POST request required'}, status=405)
    
def get_buildings_by_state(request):
    if request.method == 'GET':
        try:
            data = json.loads(request.body)
            state_id = data.get('state')
            if not state_id:
                return JsonResponse({'error': 'State ID is required'}, status=400)
            
            # Find the city center corresponding to the state_id
            state = next((item for item in STATE_DATA if item["id"] == state_id), None)
            if not state:
                return JsonResponse({'error': 'Invalid state ID'}, status=400)
            
            city_center = state["center"]
            buildings = Building.objects.filter(city=city_center)
            buildings_data = []
            for building in buildings:
                buildings_data.append({
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
                })
            return JsonResponse(buildings_data, safe=False)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'POST request required'}, status=405)