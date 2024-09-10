from django.shortcuts import render
import json
import numpy as np
from geopy.distance import geodesic
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
from django.db.models import Count  # Import Count for aggregation

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

@require_POST
def create_house(request):
    try:
        data = json.loads(request.body)
        owner_id = data.get('owner_id')
        city = data.get('city')
        category = data.get('category')
        title = data.get('title')
        time = parse_date(data.get('time'))
        prioritized = utils.convert_persian_text_to_english_digits(data.get('prioritized'))
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
        hospital=utils.convert_persian_text_to_english_digits(data.get('hospital'))
        park=utils.convert_persian_text_to_english_digits(data.get('park'))
        school =utils.convert_persian_text_to_english_digits(data.get('school'))

        # Create the new building object
        building = Building(
            owner_id = owner_id,
            title=title,
            time=time,
            prioritized = prioritized,
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
            priorities = f"[{hospital},{park},{school}]",
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

@require_POST
def delete_building(request, building_id):
    try:
        # Retrieve the building object
        building = get_object_or_404(Building, id=building_id)
        
        # Delete the building object
        building.delete()
        
        # Return a success message
        return JsonResponse({'message': 'Building deleted successfully'}, status=200)
    
    except Building.DoesNotExist:
        return JsonResponse({'error': 'Building not found'}, status=404)
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@require_POST
def update_building(request, building_id):
    try:
        # Retrieve the building object
        building = get_object_or_404(Building, id=building_id)
        
        # Load the data from the request
        data = json.loads(request.body)
        
        # Update fields if present in the request
        building.owner_id = data.get('owner_id', building.owner_id)
        building.city = data.get('city', building.city)
        building.category = data.get('category', building.category)
        building.title = data.get('title', building.title)
        building.time = parse_date(data.get('time')) if data.get('time') else building.time
        building.prioritized = utils.convert_persian_text_to_english_digits(data.get('prioritized', building.prioritized))
        building.meterage = utils.convert_persian_text_to_english_digits(data.get('meterage', building.meterage))
        building.price = utils.convert_persian_text_to_english_digits(data.get('price', building.price))
        building.price_per_meter = utils.convert_persian_text_to_english_digits(data.get('price_per_meter', building.price_per_meter))
        building.image = data.get('image', building.image)
        building.description = data.get('description', building.description)
        building.floor = utils.convert_persian_text_to_english_digits(data.get('floor', building.floor))
        building.all_floors = utils.convert_persian_text_to_english_digits(data.get('all_floors', building.all_floors))
        building.build_date = data.get('build_date', building.build_date)
        building.rooms = utils.convert_persian_text_to_english_digits(data.get('rooms', building.rooms))
        elevator = utils.convert_persian_text_to_english_digits(data.get('elevator', building.facilities[0]))
        parking = utils.convert_persian_text_to_english_digits(data.get('parking', building.facilities[1]))
        warehouse = utils.convert_persian_text_to_english_digits(data.get('warehouse', building.facilities[2]))
        building.facilities = f"[{elevator},{parking},{warehouse}]"
        building.direction = data.get('direction', building.direction)
        building.document_type = data.get('document_type', building.document_type)
        building.status = data.get('status', building.status)
        building.latitude = data.get('latitude', building.latitude)
        building.longitude = data.get('longitude', building.longitude)
        hospital = utils.convert_persian_text_to_english_digits(data.get('hospital', building.priorities[0]))
        park = utils.convert_persian_text_to_english_digits(data.get('park', building.priorities[1]))
        school = utils.convert_persian_text_to_english_digits(data.get('school', building.priorities[2]))
        building.priorities = f"[{hospital},{park},{school}]"
        
        # Save the updated building object
        building.save()
        
        # Return a success message
        return JsonResponse({'message': 'Building updated successfully'}, status=200)
    
    except (KeyError, TypeError, ValueError, ValidationError) as e:
        return JsonResponse({'error': str(e)}, status=400)
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@require_POST
def toggle_prioritized(request, building_id):
    try:
        # Retrieve the building object
        building = get_object_or_404(Building, id=building_id)
        
        # Toggle the prioritized field
        building.prioritized = 1 if building.prioritized == 0 else 0
        
        # Save the updated building object
        building.save()
        
        # Return the new state of the prioritized field
        return JsonResponse({'id': building.id, 'prioritized': building.prioritized}, status=200)
    
    except Building.DoesNotExist:
        return JsonResponse({'error': 'Building not found'}, status=404)
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@require_GET
def get_buildings(request):
    buildings = Building.objects.all()
    building_list = []

    for building in buildings:
        building_data = {
            'id':building.id,
            'owner_id':building.owner_id,
            'meterage': building.meterage,
            'price': building.price,
            'build_date': building.build_date,
            'prioritized': building.prioritized,
            'rooms': building.rooms,
            'warehouse': 1 if building.facilities[0] else 0,
            'parking': 1 if building.facilities[1] else 0,
            'elevator': 1 if building.facilities[2] else 0,
            'latitude': building.latitude,
            'longitude': building.longitude,
            'hospital': 1 if building.priorities[0] else 0,
            'park': 1 if building.priorities[1] else 0,
            'school': 1 if building.priorities[2] else 0,
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
            'category' :building.category,
            'times_viewed': building.times_viewed
        }
        building_list.append(building_data)

    return JsonResponse(building_list, safe=False)

#@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def get_buildings_by_owner_id(request):
    data = json.loads(request.body)
    owner_id = data.get('owner_id')
    buildings = Building.objects.filter(owner_id = owner_id)
    building_list = []

    for building in buildings:
        building_data = {
            'id':building.id,
            'meterage': building.meterage,
            'price': building.price,
            'build_date': building.build_date,
            'prioritized': building.prioritized,
            'rooms': building.rooms,
            'warehouse': 1 if building.facilities[0] else 0,
            'parking': 1 if building.facilities[1] else 0,
            'elevator': 1 if building.facilities[2] else 0,
            'latitude': building.latitude,
            'longitude': building.longitude,
            'hospital': 1 if building.priorities[0] else 0,
            'park': 1 if building.priorities[1] else 0,
            'school': 1 if building.priorities[2] else 0,
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
            'category' :building.category,
            'times_viewed': building.times_viewed
        }
        building_list.append(building_data)

    return JsonResponse(building_list, safe=False)

@require_GET
def search_buildings(request):
    query = request.GET.get('q', '')
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')
    min_meterage = request.GET.get('min_meterage')
    max_meterage = request.GET.get('max_meterage')
    room_count = request.GET.get('room_count')
    state_id = request.GET.get('state_id')

    # Initialize queryset
    buildings = Building.objects.all()
    
    if state_id:
        # Find the city center corresponding to the state_id
        state = next((item for item in STATE_DATA if item["id"] == state_id), None)
        if not state:
            return JsonResponse({'error': 'Invalid state ID'}, status=400)
        
        city_center = state["center"]
        buildings = buildings.filter(city=city_center)

    # Apply search filter if query is present
    if query:
        buildings = buildings.filter(Q(title__icontains=query) | Q(description__icontains=query))

    # Apply other filters based on provided parameters
    if min_price:
        buildings = buildings.filter(price__gte=min_price)
    if max_price:
        buildings = buildings.filter(price__lte=max_price)
    if min_meterage:
        buildings = buildings.filter(meterage__gte=min_meterage)
    if max_meterage:
        buildings = buildings.filter(meterage__lte=max_meterage)
    if room_count:
        buildings = buildings.filter(rooms=room_count)

    # Prepare data for JSON response
    buildings_data = [
        {
            'id': building.id,
            'owner_id': building.owner_id,
            'meterage': building.meterage,
            'price': building.price,
            'build_date': building.build_date,
            'prioritized': building.prioritized,
            'rooms': building.rooms,
            'warehouse': 1 if building.facilities[0] else 0,
            'parking': 1 if building.facilities[1] else 0,
            'elevator': 1 if building.facilities[2] else 0,
            'latitude': building.latitude,
            'longitude': building.longitude,
            'hospital': 1 if building.priorities[0] else 0,
            'park': 1 if building.priorities[1] else 0,
            'school': 1 if building.priorities[2] else 0,
            'title': building.title,
            'time': building.time,
            'price_per_meter': building.price_per_meter,
            'image': building.image,
            'description': building.description,
            'floor': building.floor,
            'all_floors': building.all_floors,
            'document_type': building.document_type,
            'status': building.status,
            'direction': building.direction,
            'city': building.city,
            'category': building.category,
            'times_viewed' : building.times_viewed,
        } for building in buildings
    ]

    return JsonResponse(buildings_data, safe=False)

def get_building_by_id(request, id):
    # Retrieve the building object by ID
    building = get_object_or_404(Building, id=id)

    # Increment the 'times_viewed' field by 1
    building.times_viewed = building.times_viewed + 1 if building.times_viewed else 1
    building.save()  # Save the updated building

    # Prepare the building data to return as JSON response
    building_data = {
        'id': building.id,
        'owner_id': building.owner_id,
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
        'prioritized': building.prioritized,
        'rooms': building.rooms,
        'direction': building.direction,
        'document_type': building.document_type,
        'status': building.status,
        'latitude': building.latitude,
        'longitude': building.longitude,
        'warehouse': 1 if building.facilities[0] else 0,
        'parking': 1 if building.facilities[1] else 0,
        'elevator': 1 if building.facilities[2] else 0,
        'hospital': 1 if building.priorities[0] else 0,
        'park': 1 if building.priorities[1] else 0,
        'school': 1 if building.priorities[2] else 0,
        'times_viewed': building.times_viewed + 1,  # Include times_viewed in the response. +1 is because this data is for before updating.
    }

    # Return the building data as JSON response
    return JsonResponse(building_data)

def get_buildings_by_category(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            state_id = data.get('state')
            category = data.get('category')
            min_price = data.get('min_price')
            max_price = data.get('max_price')
            min_meterage = data.get('min_meterage')
            max_meterage = data.get('max_meterage')
            room_count = data.get('room_count')
            
            if not category:
                buildings = Building.objects.all()
            else:
                buildings = Building.objects.filter(category=category)
            
            if state_id:
                # Find the city center corresponding to the state_id
                state = next((item for item in STATE_DATA if item["id"] == state_id), None)
                if not state:
                    return JsonResponse({'error': 'Invalid state ID'}, status=400)
                
                city_center = state["center"]
                buildings = buildings.filter(city=city_center)
            
            # Apply other filters based on provided parameters
            if min_price:
                buildings = buildings.filter(price__gte=min_price)
            if max_price:
                buildings = buildings.filter(price__lte=max_price)
            if min_meterage:
                buildings = buildings.filter(meterage__gte=min_meterage)
            if max_meterage:
                buildings = buildings.filter(meterage__lte=max_meterage)
            if room_count:
                buildings = buildings.filter(rooms=room_count)
            
            # Prepare data for JSON response
            buildings_data = []
            for building in buildings:
                buildings_data.append({
                    'id': building.id,
                    'owner_id': building.owner_id,
                    'city': building.city,
                    'category': building.category,
                    'title': building.title,
                    'prioritized': building.prioritized,
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
                    'direction': building.direction,
                    'document_type': building.document_type,
                    'status': building.status,
                    'latitude': building.latitude,
                    'longitude': building.longitude,
                    'warehouse': 1 if building.facilities[0] else 0,
                    'parking': 1 if building.facilities[1] else 0,
                    'elevator': 1 if building.facilities[2] else 0,
                    'hospital': 1 if building.priorities[0] else 0,
                    'park': 1 if building.priorities[1] else 0,
                    'school': 1 if building.priorities[2] else 0,
                })
            return JsonResponse(buildings_data, safe=False)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'POST request required'}, status=405)
    
def recommend_buildings(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            meterage = int(utils.convert_persian_text_to_english_digits(data.get('meterage')))
            price = int(utils.convert_persian_text_to_english_digits(data.get('price')))
            build_date = int(utils.convert_persian_text_to_english_digits(data.get('build_date')))
            rooms = int(utils.convert_persian_text_to_english_digits(data.get('rooms')))
            location_1 = data.get('location_1')
            location_2 = data.get('location_2')
            elevator= utils.convert_persian_text_to_english_digits(data.get('elevator'))
            parking= utils.convert_persian_text_to_english_digits(data.get('parking'))
            warehouse = utils.convert_persian_text_to_english_digits(data.get('warehouse'))
            hospital= utils.convert_persian_text_to_english_digits(data.get('hospital'))
            park= utils.convert_persian_text_to_english_digits(data.get('park'))
            school = utils.convert_persian_text_to_english_digits(data.get('school'))
            facilities = [int(elevator), int(parking), int(warehouse)]
            priorities = [int (hospital), int(park), int(school)]
            state_id = data.get('city')
            
            if not all([meterage, price, build_date, rooms, elevator, parking, warehouse,
                        hospital, park, school, location_1, location_2, state_id]):
                return JsonResponse({'error': 'All fields are required'}, status=400)
            
            # Find the city center corresponding to the state_id
            state = next((item for item in STATE_DATA if item["id"] == state_id), None)
            if not state:
                return JsonResponse({'error': 'Invalid state ID'}, status=400)
            
            # Get all buildings in that city from the database
            city_center = state["center"]
            buildings = list(Building.objects.filter(city=city_center).values())

            if buildings:
                # Find the top 3 recommended buildings using a genetic algorithm
                #recommended_buildings = genetic_algorithm(buildings, meterage, price, build_date, rooms, facilities, location_1, location_2, priorities)
                recommended_buildings = cosine_similarity_algorithm(buildings, meterage, price, build_date, rooms, facilities, location_1, location_2, priorities)

                return JsonResponse(recommended_buildings, safe=False)
            else:
                return JsonResponse({'error': 'No Houses Available in that city.'}, status=400)
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'POST request required'}, status=405)
    
def genetic_algorithm(buildings, meterage, price, build_date, rooms, facilities, location_1, location_2, priorities):
    def fitness(building):
        score = 0
        
        # Assign weights to each factor based on their importance
        weight_price = 0.25
        weight_meterage = 0.25
        weight_build_date = 0.1
        weight_rooms = 0.1
        weight_facilities = 0.15
        weight_priorities = 0.1
        weight_location = 0.25

        # Factor: Price (Closer to target price is better)
        price_score = max(0, (price - abs(price - building['price'])) / price)
        score += weight_price * price_score
        
        # Factor: Meterage (Closer to target meterage is better)
        meterage_score = max(0, (meterage - abs(meterage - building['meterage'])) / meterage)
        score += weight_meterage * meterage_score
        
        # Factor: Build Date (Newer is often better, but closer to the desired build date)
        build_date_score = max(0, (build_date - abs(build_date - building['build_date'])) / build_date)
        score += weight_build_date * build_date_score
        
        # Factor: Rooms (Closer to target number of rooms is better)
        rooms_score = max(0, (rooms - abs(rooms - building['rooms'])) / rooms)
        score += weight_rooms * rooms_score
        
        # Factor: Facilities (Count matching facilities)
        facilities_score = sum(1 for u, b in zip(facilities, building['facilities']) if u == b)
        score += weight_facilities * facilities_score
        
        # Factor: Priorities (Count matching priorities)
        priorities_score = sum(1 for u, b in zip(priorities, building['priorities']) if u == b)
        score += weight_priorities * priorities_score
        
        # Factor: Locations (Closer to the key locations is better)
        loc1_dist = geodesic((building['latitude'], building['longitude']), location_1).km
        loc2_dist = geodesic((building['latitude'], building['longitude']), location_2).km
        location_score = max(0, (1 / (1 + loc1_dist))) + max(0, (1 / (1 + loc2_dist)))
        score += weight_location * location_score
        
        return score
    
    # Calculate fitness for each building
    fitness_scores = np.array([fitness(building) for building in buildings])

    # Sort the buildings by fitness score in descending order
    sorted_indices = np.argsort(fitness_scores)[::-1]

    # Collect the top 3 unique buildings based on their ID
    top_buildings = []
    seen_ids = set()

    for index in sorted_indices:
        building = buildings[index]
        building_id = building['id']  # Assuming each building has a unique 'id' field
        if building_id not in seen_ids:
            top_buildings.append(building)
            seen_ids.add(building_id)
        if len(top_buildings) == 3:
            break
    
    return top_buildings

import ast

def cosine_similarity_algorithm(buildings, meterage, price, build_date, rooms, facilities, location_1, location_2, priorities):
    """
    Finds the top N buildings that best match the user's preferences using cosine similarity.

    Parameters:
        buildings (list of dict): List of building data with their features.
        meterage (int): User's desired meterage.
        price (int): User's desired price.
        build_date (int): User's desired build date.
        rooms (int): User's desired number of rooms.
        facilities (list of int): List of user's desired facilities as binary values (1 or 0).
        location_1 (tuple): Tuple (latitude, longitude) of the first preferred location.
        location_2 (tuple): Tuple (latitude, longitude) of the second preferred location.
        priorities (list of int): List of user's priorities as binary values (1 or 0).
        top_n (int): Number of top matching buildings to return.

    Returns:
        list of dict: Top N buildings that best match the user's preferences.
    """
    top_n = 3
    
    # Ensure facilities and priorities are numeric lists
    facilities = list(map(float, facilities))  # Convert all elements to float
    priorities = list(map(float, priorities))  # Convert all elements to float
    
    # Combine facilities and priorities as part of the user vector
    user_vector = np.array([
        float(price),    # Ensure each value is a float
        float(meterage),
        float(build_date),
        float(rooms)
    ] + facilities + priorities + [0, 0])  # Add placeholders for location similarity
    
    # Normalize the user vector
    user_vector_norm = np.linalg.norm(user_vector)
    if user_vector_norm == 0:
        raise ValueError("User preference vector cannot be zero.")
    
    user_vector = user_vector / user_vector_norm  # Normalize user vector

    building_vectors = []
    building_ids = []
    similarity_scores = []

    for building in buildings:
        # Parse facilities and priorities if they are in string format
        building_facilities = building.get('facilities', [])
        building_priorities = building.get('priorities', [])

        if isinstance(building_facilities, str):
            building_facilities = ast.literal_eval(building_facilities)
        if isinstance(building_priorities, str):
            building_priorities = ast.literal_eval(building_priorities)

        # Convert to float
        building_facilities = list(map(float, building_facilities))
        building_priorities = list(map(float, building_priorities))

        # Calculate location similarity
        loc1_dist = geodesic(
            (building.get('latitude'), building.get('longitude')),
            location_1
        ).kilometers
        loc2_dist = geodesic(
            (building.get('latitude'), building.get('longitude')),
            location_2
        ).kilometers

        location_similarity = [(1 / (1 + loc1_dist)), (1 / (1 + loc2_dist))]

        # Build the building vector
        building_vector = np.array([
            float(building.get('price', 0)),
            float(building.get('meterage', 0)),
            float(building.get('build_date', 0)),
            float(building.get('rooms', 0))
        ] + building_facilities + building_priorities + location_similarity)

        # Ensure the building vector matches the length of the user vector
        if len(building_vector) != len(user_vector):
            raise ValueError(f"Building vector length {len(building_vector)} does not match user vector length {len(user_vector)}.")

        # Normalize building vector
        building_vector_norm = np.linalg.norm(building_vector)
        if building_vector_norm == 0:
            continue  # Skip buildings with zero vector
        building_vector = building_vector / building_vector_norm

        # Compute cosine similarity (dot product since vectors are normalized)
        similarity = np.dot(user_vector, building_vector)

        building_vectors.append(building_vector)
        building_ids.append(building.get('id'))
        similarity_scores.append(similarity)

    # Combine building data with their similarity scores
    building_similarity_data = list(zip(building_ids, similarity_scores, buildings))

    # Sort buildings by similarity score in descending order
    sorted_buildings = sorted(
        building_similarity_data,
        key=lambda x: x[1],
        reverse=True
    )

    # Select top N buildings
    top_buildings = [item[2] for item in sorted_buildings[:top_n]]

    return top_buildings

@require_GET
def get_state_by_categories(request):
    # Prepare a list to hold the result rows
    result = []
    counter = 1
    
    # Iterate over each state in STATE_DATA
    for state in STATE_DATA:
        city = state['center']
        
        # Group buildings by category for each city and count them
        categories = Building.objects.filter(city=city).values('category').annotate(count=Count('id'))
        
        # Add each category with its count to the result list
        for category_data in categories:
            result.append({
                'id': counter,
                'city': city,  # City name
                'category': category_data['category'],  # Category of the building
                'count': category_data['count']  # Number of buildings in that category
            })
            counter += 1  # Increment the counter

    # Return the result as a JSON response
    return JsonResponse(result, safe=False)
