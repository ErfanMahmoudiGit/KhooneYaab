from django.db import models

# Create your models here.


class User(models.Model):
    name = models.CharField(max_length=100, blank=True)
    phone_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(blank=True)
    is_verified_user = models.BooleanField(default=False)
    is_verified_phone_number = models.BooleanField(default=False)
    otp_code = models.CharField(max_length=6, blank=True)
    otp_expires_in = models.DateTimeField(null=True)
    login_expires_in = models.DateTimeField(null=True)
   
    def __str__(self):
        return self.phone_number