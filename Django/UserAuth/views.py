from django.shortcuts import render
import random
import os
from django.views.decorators.http import require_GET, require_POST
from datetime import datetime, timedelta
from django.http import JsonResponse
from django.views import View
from .models import User
from django.utils.decorators import method_decorator
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
import json
from kavenegar import KavenegarAPI, HTTPException, APIException
from pytz import timezone as pytz_timezone
from datetime import datetime, timedelta, timezone as tm

# Define the Tehran timezone
tehran_tz = pytz_timezone('Asia/Tehran')

CODE_EXPIRES = 90  # seconds

KAVENEGAR_API_KEY = "79306A46484F77372B4476373756565968416444784D63435445647857436B55364E5755314758553975493D"

def generate_random_number(length=6):
    return str(random.randint(10**(length-1), 10**length - 1))

@require_POST
def get_otp(request):
    data = json.loads(request.body)
    phone_number = data.get('phoneNumber')
    user_string = data.get('user_string')
    captcha_string = data.get('captcha_string')
    
    if user_string == captcha_string:
        if not phone_number:
            return JsonResponse({"error": "شماره موبایل معتبر را وارد کنید"}, status=400)

        phone_number = phone_number.strip()
        code = generate_random_number(6)

        result = save_user(phone_number, code)
        
        if not result:
            return JsonResponse({"error": "ورود شما انجام نشد."}, status=401)

        response = send_otp(phone_number, code)
        return response
    else:
        return JsonResponse({"error": "کد امنیتی صحیح نمی‌باشد."}, status=403)

@require_POST
def check_otp(request):
    data = json.loads(request.body)
    otp_code = data.get('otp')
    phone_number = data.get('phoneNumber')
    
    user = User.objects.filter(phone_number=phone_number).first()
    if not user:
        return JsonResponse({"error": "کاربری با این مشخصات یافت نشد"}, status=404)
    if user.otp_code != otp_code:
        return JsonResponse({"error": "کد ارسال شده صحیح نمیباشد"}, status=400)
    
    # Define the UTC time
    utc_datetime_str = str(user.otp_expires_in)

    # Parse the datetime string into a datetime object with UTC timezone
    utc_datetime = datetime.fromisoformat(utc_datetime_str)

    # Manually set the new timezone offset (Tehran time +03:30)
    # Create a new timezone object for +03:30
    new_offset = tm(timedelta(hours=3, minutes=30))

    # Replace the timezone information without altering the actual time
    new_datetime = utc_datetime.replace(tzinfo=new_offset)
    now_in_tehran = timezone.now().astimezone(tehran_tz)

    if new_datetime < now_in_tehran:
        return JsonResponse({"error": "کد اعتبار سنجی منقضی شده است"}, status=400)

    user.is_verified_phone_number = True
    user.login_expires_in = now_in_tehran + timedelta(days=2)
    user.save()

    welcome_message = "کد تایید شد، به خونه‌یاب خوش آمدید"
    
    user_from_db = User.objects.filter(phone_number=phone_number).first()

    return JsonResponse({
        "statusCode": 200,
        "data": {
            "message": welcome_message,
            "user": {
                "is_verified_user": user_from_db.is_verified_user,
                "phoneNumber": user_from_db.phone_number,
                "name": user_from_db.name,
                "email": user_from_db.email,
                "login_expires_in": user_from_db.login_expires_in,
                "user_id": user_from_db.id,
            }
        }
    }, status=200)

def save_user(phone_number, otp):
    otp_expires_in = datetime.now() + timedelta(seconds=CODE_EXPIRES)

    user, created = User.objects.get_or_create(phone_number=phone_number, defaults={'otp_code': otp, 'otp_expires_in': otp_expires_in})

    if not created:
        user.otp_code = otp
        user.otp_expires_in = otp_expires_in
        user.save()

    return True

def send_otp(phone_number, code):
    api_key = KAVENEGAR_API_KEY
    kavenegar_api = KavenegarAPI(api_key)

    try:
        response = kavenegar_api.verify_lookup({
            "receptor":phone_number,
            "token":code,
            "template":"registerVerify"
        })
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
        
import random
import base64
import io
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from PIL import Image, ImageDraw, ImageFont

class CaptchaView(View):

    @method_decorator(csrf_exempt)  # Allows CSRF exempt for public access
    def get(self, request):
        permitted_chars = '0123456789'
        string_length = 4

        def generate_string(chars, length):
            return ''.join(random.choice(chars) for _ in range(length))

        captcha_string = generate_string(permitted_chars, string_length)

        # Create an image with PIL
        width, height = 200, 50
        image = Image.new('RGB', (width, height), color=(255, 255, 255))
        draw = ImageDraw.Draw(image)

        # Draw random lines
        for _ in range(10):
            line_color = (
                random.randint(0, 255),
                random.randint(0, 255),
                random.randint(0, 255)
            )
            draw.line(
                [(random.randint(0, width), random.randint(0, height)) for _ in range(2)],
                fill=line_color,
                width=random.randint(2, 10)
            )

        # Draw the text
        for i in range(string_length):
            letter_space = width / string_length
            initial = 35
            text_color = (0, 0, 0) if random.random() > 0.5 else (255, 255, 255)
            draw.text(
                (initial + i * letter_space, random.randint(5, 25)),
                captcha_string[i],
                fill=text_color,
                font = ImageFont.load_default()
                #font=ImageFont.truetype(FONT_PATH, 24)
            )

        # Save to a BytesIO object
        buffered = io.BytesIO()
        image.save(buffered, format='PNG')
        imagedata = buffered.getvalue()

        # Base64 encode the image
        encoded_image = base64.b64encode(imagedata).decode('utf-8')

        # Normally here you would save the captcha string in session or cache
        request.session['captcha_string'] = captcha_string

        # Return the response
        return JsonResponse({'image': encoded_image, 'captcha_string': captcha_string})

@require_POST
def update_user_info(request):
    data = json.loads(request.body)
    name = data.get('name')
    email = data.get('email')
    is_verified_user = 'True'
    phone_number = data.get('phoneNumber')
    user = User.objects.filter(phone_number=phone_number).first()
    user.name = name
    user.email = email
    user.is_verified_user = is_verified_user
    
    user.save()
    return JsonResponse({'message':'welcome'})

@require_POST
def get_user_info(request):
    data = json.loads(request.body)
    id = data.get('owner_id')
    if id != 0:
        user = User.objects.filter(id=id).first()
        if user:
            phone_number = user.phone_number
            email = user.email
    else:
        phone_number = "شماره همراه این کاربر قابل نمایش نیست"
        email = "ایمیل این کاربر قابل نمایش نیست"
    
    return JsonResponse({'email': email,
                         'phone_number': phone_number})
    