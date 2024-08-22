from django.urls import path
from .views import get_otp, check_otp, update_user_info, get_user_info
from .views import CaptchaView

urlpatterns = [
    path('get-otp/', get_otp, name='get_otp'),
    path('check-otp/', check_otp, name='check_otp'),
    path('captcha/', CaptchaView.as_view(), name='captcha'),
    
    path('update-user/', update_user_info , name = 'update_user_info'),
    path('get-user-info/', get_user_info , name = 'get_user_info')
]