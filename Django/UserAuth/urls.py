from django.urls import path
from .views import UserAuthController

user_auth_controller = UserAuthController.as_view()

urlpatterns = [
    path('get-otp/', user_auth_controller, name='get_otp'),
    path('check-otp/', user_auth_controller, name='check_otp'),
    # Add other routes as needed
]