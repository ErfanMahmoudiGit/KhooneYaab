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

"""
GET request to /search/?q=keyword.
"""
"""
test for create_house api.
{
    "title" : "خانه خوب",
    "time" : "2024-01-11",
    "meterage" : "333",
    "price" : "400000000000",
    "price_per_meter" : "5867867",
    "image" : "https://unsplash.com/s/photos/image/3" , 
    "description" : "خیلی خانه خوبیه و فلان بهمان",
    "phone" : "09127564545",
    "floor" : 5,
    "all_floors" : 155,
    "build_date" : "2000",
    "rooms" : "6",
    "facilities" : [0, 1, 1],
    "latitude" : "11.9837",
    "longitude" : "24.983",
    "priorities" : [0, 0 , 0]
}
"""
"""
test for find_best_building api
{
    "meterage" : 333,
    "price" : 400000000000,
    "build_date" : 2000,
    "rooms" : 6,
    "facilities" : [0, 1, 1],
    "latitude" : 11.9837,
    "longitude" : 24.983,
    "priorities" : [0, 0 , 0],
    "locations" : [[1,2]]
}
"""