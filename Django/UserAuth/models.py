from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
class UserManager(BaseUserManager):
    def create_user(self, phone_number, password=None, **extra_fields):
        if not phone_number:
            raise ValueError("The Phone Number field must be set")
        user = self.model(phone_number=phone_number, **extra_fields)
        user.set_password(password)  # Set the password properly
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(phone_number, password, **extra_fields)

class User(AbstractBaseUser):
    name = models.CharField(max_length=100, blank=True)
    phone_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(blank=True)
    is_verified_user = models.BooleanField(default=False)
    is_verified_phone_number = models.BooleanField(default=False)
    otp_code = models.CharField(max_length=6, blank=True)
    otp_expires_in = models.DateTimeField(null=True)
    login_expires_in = models.DateTimeField(null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # Custom manager
    objects = UserManager()

    # Required fields for Django authentication
    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = ['email']  # Fields required when creating a superuser

    def __str__(self):
        return self.phone_number