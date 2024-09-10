# Generated by Django 5.0.4 on 2024-09-10 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("password", models.CharField(max_length=128, verbose_name="password")),
                (
                    "last_login",
                    models.DateTimeField(
                        blank=True, null=True, verbose_name="last login"
                    ),
                ),
                ("name", models.CharField(blank=True, max_length=100)),
                ("phone_number", models.CharField(max_length=15, unique=True)),
                ("email", models.EmailField(blank=True, max_length=254)),
                ("is_verified_user", models.BooleanField(default=False)),
                ("is_verified_phone_number", models.BooleanField(default=False)),
                ("otp_code", models.CharField(blank=True, max_length=6)),
                ("otp_expires_in", models.DateTimeField(null=True)),
                ("login_expires_in", models.DateTimeField(null=True)),
                ("is_active", models.BooleanField(default=True)),
                ("is_staff", models.BooleanField(default=False)),
                ("is_superuser", models.BooleanField(default=False)),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
