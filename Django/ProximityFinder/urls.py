from django.urls import path
from .views import get_buildings, find_best_building, create_house, search_buildings

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('api/buildings/', get_buildings, name='get_buildings'),
    path('api/find_best_building/', find_best_building, name='find_best_building'),
    path('api/create_house/', create_house, name='create_house'),
    path('api/search/', search_buildings, name='search_buildings'),
    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
