from django.db import models
from django.utils import timezone

class Area(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    demographics = models.JSONField()  # Example: {'population': 50000, 'avg_income': 60000}

    def __str__(self):
        return self.name

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
    build_date = models.IntegerField()
    rooms = models.IntegerField()
    facilities = models.JSONField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    priorities = models.JSONField()
    #area = models.ForeignKey(Area, related_name='buildings', on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class BuildingImage(models.Model):
    building = models.ForeignKey(Building, related_name='images', on_delete=models.CASCADE)
    image_path = models.ImageField(upload_to='house_images/')
    caption = models.CharField(max_length=255, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.building.title} - {self.caption if self.caption else 'Image'}"
    
