from django.db import models
from django.utils import timezone

class Building(models.Model):
    id = models.AutoField(primary_key=True)
    owner_id = models.IntegerField()
    city = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    time = models.DateField()
    meterage = models.FloatField()
    price = models.BigIntegerField()
    price_per_meter = models.FloatField()
    image = models.URLField()
    description = models.TextField()
    floor = models.IntegerField()
    all_floors = models.IntegerField()
    build_date = models.IntegerField()
    rooms = models.IntegerField()
    facilities = models.JSONField() #elevator, parking, warehouse
    direction = models.CharField(max_length=255)
    document_type = models.CharField(max_length=255)
    status = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    priorities = models.JSONField()# TODO, shows if the building is close to: hospital, school, park

    def __str__(self):
        return self.title


class BuildingImage(models.Model):
    building = models.ForeignKey(Building, related_name='images', on_delete=models.CASCADE)
    image_path = models.ImageField(upload_to='house_images/')
    caption = models.CharField(max_length=255, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.building.title} - {self.caption if self.caption else 'Image'}"
