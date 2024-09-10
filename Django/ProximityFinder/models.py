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
    prioritized = models.IntegerField()
    rooms = models.IntegerField()
    facilities = models.JSONField() #elevator, parking, warehouse
    direction = models.CharField(max_length=255)
    document_type = models.CharField(max_length=255)
    status = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    priorities = models.JSONField()
    times_viewed = models.IntegerField()

    def __str__(self):
        return self.title

class Comment(models.Model):
    writer_id = models.IntegerField()
    writer_name = models.CharField(max_length=255)
    description = models.TextField()
    building = models.ForeignKey(Building, on_delete=models.CASCADE, related_name='comments')
    created_at = models.DateTimeField(default=timezone.now)
    sentiment = models.CharField(max_length=50, blank=True)  # New field for sentiment analysis

    def __str__(self):
        return f"Comment by {self.writer_name} on {self.building.title}"