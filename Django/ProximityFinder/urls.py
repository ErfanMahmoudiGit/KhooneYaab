from django.urls import path
from .views import get_buildings, recommend_buildings, create_house, search_buildings, get_building_by_id, get_buildings_by_category,get_buildings_by_owner_id, toggle_prioritized, delete_building, update_building, get_state_by_categories, add_comment, get_comment_count, get_building_comments

urlpatterns = [
    path('api/building/buildings/', get_buildings, name='get_buildings'),
    path('api/building/my_buildings/', get_buildings_by_owner_id, name='get_buildings_by_owner_id'),
    path('api/building/recommend_buildings/', recommend_buildings, name='recommend_buildings'),
    path('api/building/create_house/', create_house, name='create_house'),
    path('api/building/search/', search_buildings, name='search_buildings'),
    path('api/building/<int:id>/', get_building_by_id, name='get_building_by_id'),
    path('api/building/category/', get_buildings_by_category, name='get_buildings_by_category'),
    path('api/building/toggle-prioritized/<int:building_id>/', toggle_prioritized, name='toggle_prioritized'),
    path('api/building/delete-building/<int:building_id>/', delete_building, name='delete_building'),
    path('api/building/update-building/<int:building_id>/', update_building, name='update_building'),
    path('api/building/get_state_by_categories/', get_state_by_categories, name='get_state_by_categories'),
    path('api/building/comments/add-comment/', add_comment, name='add_comment'),
    path('api/building/comments/count/<int:building_id>/', get_comment_count, name='get_comment_count'),
    path('api/building/comments/<int:building_id>/', get_building_comments, name='get_building_comments')
]