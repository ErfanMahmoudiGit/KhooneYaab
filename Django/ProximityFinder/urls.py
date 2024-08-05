from django.urls import path
from .views import get_buildings, recommend_buildings, create_house, search_buildings, get_building_by_id, get_buildings_by_category, get_buildings_by_state

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('api/buildings/', get_buildings, name='get_buildings'),
    path('api/recommend_buildings/', recommend_buildings, name='recommend_buildings'),
    path('api/create_house/', create_house, name='create_house'),
    path('api/search/', search_buildings, name='search_buildings'),
    path('api/building/<int:id>/', get_building_by_id, name='get_building_by_id'),
    path('api/building/category/', get_buildings_by_category, name='get_buildings_by_category'),
    path('api/building/state/', get_buildings_by_state, name='get_buildings_by_state'),
    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
