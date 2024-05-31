from django.shortcuts import render
from .genetic_algorithm import genetic_algorithm

# Create your views here.
import json
import math
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from .models import Building

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
            'build_date': best_building.build_date.year,
            'rooms': best_building.rooms,
            'facilities': best_building.facilities,
            'latitude': best_building.latitude,
            'longitude': best_building.longitude,
            'priorities': best_building.priorities
        }
        return JsonResponse(response_data, safe=False)
    else:
        return JsonResponse({'error': 'No suitable building found'}, status=404)