from django.shortcuts import render
import random
import os
from kavenegar import KavenegarAPI, HTTPException, APIException

# Create your views here.

from datetime import datetime, timedelta
from django.http import JsonResponse
from django.views import View
from .models import User
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json

from django.views.decorators.http import require_GET, require_POST

CODE_EXPIRES = 90  # seconds

KAVENEGAR_API_KEY = "79306A46484F77372B4476373756565968416444784D63435445647857436B55364E5755314758553975493D"

def generate_random_number(length=6):
    return str(random.randint(10**(length-1), 10**length - 1))

class UserAuthController(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    @require_POST
    async def get_otp(self, request):
        data = json.loads(request.body)
        phone_number = data.get('phoneNumber')

        if not phone_number:
            return JsonResponse({"error": "شماره موبایل معتبر را وارد کنید"}, status=400)

        phone_number = phone_number.strip()
        code = generate_random_number(6)

        result = await self.save_user(phone_number, code)
        if not result:
            return JsonResponse({"error": "ورود شما انجام نشد."}, status=401)

        self.send_otp(phone_number, code)

    async def check_otp(self, request):
        data = json.loads(request.body)
        otp_code = data.get('otp')
        phone_number = data.get('phoneNumber')

        user = await User.objects.filter(phone_number=phone_number).first()

        if not user:
            return JsonResponse({"error": "کاربری با این مشخصات یافت نشد"}, status=404)

        if user.otp_code != otp_code:
            return JsonResponse({"error": "کد ارسال شده صحیح نمیباشد"}, status=400)

        if user.otp_expires_in < datetime.now():
            return JsonResponse({"error": "کد اعتبار سنجی منقضی شده است"}, status=400)

        user.is_verified_phone_number = True
        user.save()

        welcome_message = "کد تایید شد، به فرانت هوکس خوش آمدید"
        if not user.is_active:
            welcome_message = "کد تایید شد، لطفا اطلاعات خود را تکمیل کنید"

        return JsonResponse({
            "statusCode": 200,
            "data": {
                "message": welcome_message,
                "user": {
                    "phoneNumber": user.phone_number,
                    "name": user.name,
                    "email": user.email,
                }
            }
        }, status=200)

    async def save_user(self, phone_number, otp):
        otp_expires_in = datetime.now() + timedelta(seconds=CODE_EXPIRES)

        user, created = await User.objects.get_or_create(phone_number=phone_number, defaults={'otp_code': otp, 'otp_expires_in': otp_expires_in})

        if not created:
            user.otp_code = otp
            user.otp_expires_in = otp_expires_in
            user.save()

        return True

    def send_otp(self, phone_number, code):
        api_key = os.getenv('KAVENEGAR_API_KEY')
        kavenegar_api = KavenegarAPI(api_key)

        try:
            response = kavenegar_api.verify_lookup(
                receptor=phone_number,
                token=code,
                template="registerVerify"
            )

            message_status = str(response)  # This can be adjusted based on the response format you need

            # Logging the message status
            print("Kavenegar message status:", message_status)

            return JsonResponse({
                "statusCode": 200,
                "data": {
                    "message": f"کد تائید برای شماره موبایل {phone_number} ارسال گردید",
                    "expiresIn": CODE_EXPIRES,
                    "phoneNumber": phone_number,
                }
            }, status=200)

        except HTTPException as e:
            print(f"HTTPException: {e}")
            return JsonResponse({
                "statusCode": 500,
                "message": "کد اعتبارسنجی ارسال نشد"
            }, status=500)
        except APIException as e:
            print(f"APIException: {e}")
            return JsonResponse({
                "statusCode": 500,
                "message": "کد اعتبارسنجی ارسال نشد"
            }, status=500)