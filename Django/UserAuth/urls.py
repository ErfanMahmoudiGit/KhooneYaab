from django.urls import path
from .views import get_otp, check_otp

urlpatterns = [
    path('get-otp/', get_otp, name='get_otp'),
    path('check-otp/', check_otp, name='check_otp'),
    # Add other routes as needed
]