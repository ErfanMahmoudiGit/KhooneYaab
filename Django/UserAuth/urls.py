from django.urls import path
from .views import get_otp, check_otp, update_user_info, get_user_info, remove_user, logout_user
from .views import CaptchaView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('get-otp/', get_otp, name='get_otp'),
    path('check-otp/', check_otp, name='check_otp'),
    path('captcha/', CaptchaView.as_view(), name='captcha'),
    
    path('update-user/', update_user_info , name = 'update_user_info'),
    path('get-user-info/', get_user_info , name = 'get_user_info'),
    path('remove/', remove_user, name='remove_user'),
    path('logout/', logout_user, name='logout_user'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]