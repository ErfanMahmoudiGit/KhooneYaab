# Generated by Django 4.2.11 on 2024-08-01 09:53

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
                ("phone_number", models.CharField(max_length=15, unique=True)),
                ("name", models.CharField(blank=True, max_length=100)),
                ("email", models.EmailField(blank=True, max_length=254)),
                ("is_verified_phone_number", models.BooleanField(default=False)),
                ("is_active", models.BooleanField(default=False)),
                ("otp_code", models.CharField(blank=True, max_length=6)),
                ("otp_expires_in", models.DateTimeField(null=True)),
            ],
        ),
    ]
