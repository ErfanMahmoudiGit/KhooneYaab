from django.urls import path
from .views import get_buildings, find_best_building

urlpatterns = [
    path('api/buildings/', get_buildings, name='get_buildings'),
    path('api/find_best_building/', find_best_building, name='find_best_building'),
]