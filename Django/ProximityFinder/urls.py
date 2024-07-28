from django.urls import path
from .views import get_buildings, find_best_building, create_house

urlpatterns = [
    path('api/buildings/', get_buildings, name='get_buildings'),
    path('api/find_best_building/', find_best_building, name='find_best_building'),
    path('api/create_house/', create_house, name='create_house'),
]

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
    "build_date" : "2000-01-01",
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