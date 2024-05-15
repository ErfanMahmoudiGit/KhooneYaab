from django.db import models
from django.utils import timezone
import math

class Area(models.Model):
    name = models.CharField(max_length=100)
    # Other relevant fields for the area, such as location coordinates, demographics, etc.
    ...

class Building(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    time = models.DateField()
    meterage = models.FloatField()
    price = models.BigIntegerField()
    price_per_meter = models.FloatField()
    image = models.URLField()
    description = models.TextField()
    phone = models.CharField(max_length=11)
    floor = models.IntegerField()
    all_floors = models.IntegerField()
    build_date = models.DateField()
    rooms = models.IntegerField()
    facilities = models.JSONField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    priorities = models.JSONField()

    def __str__(self):
        return self.title


class BuildingImage(models.Model):
    house = models.ForeignKey(Building, related_name='images', on_delete=models.CASCADE)
    image_path = models.ImageField(upload_to='house_images/')
    caption = models.CharField(max_length=255, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
