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
            'id':building.id,
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


def recommend_buildings(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            meterage = data.get('meterage')
            price = data.get('price')
            build_date = data.get('build_date')
            rooms = data.get('rooms')
            facilities = data.get('facilities')
            location_1 = data.get('location_1')
            location_2 = data.get('location_2')
            priorities = data.get('priorities')
            
            if not all([meterage, price, build_date, rooms, facilities, location_1, location_2, priorities]):
                return JsonResponse({'error': 'All fields are required'}, status=400)

            # Get all buildings from the database
            buildings = list(Building.objects.all().values())
            
            # Find the top 3 recommended buildings using a genetic algorithm
            recommended_buildings = genetic_algorithm(buildings, meterage, price, build_date, rooms, facilities, location_1, location_2, priorities)
            
            return JsonResponse(recommended_buildings, safe=False)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'POST request required'}, status=405)
    
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
    
def genetic_algorithm(buildings, meterage, price, build_date, rooms, facilities, location_1, location_2, priorities):
    def fitness(building):
        score = 0
        
        # Factor: Price
        score += max(0, (price - abs(price - building['price'])) / price)
        
        # Factor: Meterage
        score += max(0, (meterage - abs(meterage - building['meterage'])) / meterage)
        
        # Factor: Build Date
        score += max(0, (build_date - abs(build_date - building['build_date'])) / build_date)
        
        # Factor: Rooms
        score += max(0, (rooms - abs(rooms - building['rooms'])) / rooms)
        
        # Factor: Facilities
        score += sum(1 for u, b in zip(facilities, building['facilities']) if u == b)
        
        # Factor: Priorities
        score += sum(1 for u, b in zip(priorities, building['priorities']) if u == b)
        
        # Factor: Locations
        loc1_dist = geodesic((building['latitude'], building['longitude']), location_1).km
        loc2_dist = geodesic((building['latitude'], building['longitude']), location_2).km
        score += max(0, (1 / (1 + loc1_dist)))
        score += max(0, (1 / (1 + loc2_dist)))
        
        return score

    def crossover(parent1, parent2):
        child = parent1.copy()
        for key in parent1.keys():
            if np.random.rand() > 0.5:
                child[key] = parent2[key]
        return child

    def mutate(building):
        if np.random.rand() < 0.1:
            key = np.random.choice(list(building.keys()))
            if isinstance(building[key], int) or isinstance(building[key], float):
                building[key] += np.random.uniform(-0.1, 0.1) * building[key]
        return building

    # Genetic algorithm parameters
    population_size = 100
    generations = 50
    mutation_rate = 0.1

    # Initialize population
    population = np.random.choice(buildings, size=population_size, replace=True).tolist()

    for generation in range(generations):
        # Calculate fitness for each building
        fitness_scores = np.array([fitness(building) for building in population])
        
        # Select the best buildings
        selected_indices = np.argsort(fitness_scores)[-population_size//2:]
        selected_buildings = [population[i] for i in selected_indices]

        # Create the next generation
        next_generation = []
        while len(next_generation) < population_size:
            parent1, parent2 = np.random.choice(selected_buildings, size=2, replace=False)
            child = crossover(parent1, parent2)
            if np.random.rand() < mutation_rate:
                child = mutate(child)
            next_generation.append(child)
        
        population = next_generation
    
    # Return the top 3 buildings
    fitness_scores = np.array([fitness(building) for building in population])
    top_indices = np.argsort(fitness_scores)[-3:]
    top_buildings = [population[i] for i in top_indices]
    return top_buildings