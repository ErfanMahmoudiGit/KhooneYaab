from django.urls import path
from .views import get_buildings, recommend_buildings, create_house, search_buildings, get_building_by_id, get_buildings_by_category,get_buildings_by_owner_id, toggle_prioritized

urlpatterns = [
    path('api/building/buildings/', get_buildings, name='get_buildings'),
    path('api/building/my_buildings/', get_buildings_by_owner_id, name='get_buildings_by_owner_id'),
    path('api/building/recommend_buildings/', recommend_buildings, name='recommend_buildings'),
    path('api/building/create_house/', create_house, name='create_house'),
    path('api/building/search/', search_buildings, name='search_buildings'),
    path('api/building/<int:id>/', get_building_by_id, name='get_building_by_id'),
    path('api/building/category/', get_buildings_by_category, name='get_buildings_by_category'),
    path('api/building/toggle-prioritized/<int:building_id>/', toggle_prioritized, name='toggle_prioritized')
]
