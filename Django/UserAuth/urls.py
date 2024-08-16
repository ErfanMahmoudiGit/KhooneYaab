from django.urls import path
from .views import get_otp, check_otp
from .views import CaptchaView

urlpatterns = [
    path('get-otp/', get_otp, name='get_otp'),
    path('check-otp/', check_otp, name='check_otp'),
    path('captcha/', CaptchaView.as_view(), name='captcha'),
]