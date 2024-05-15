import pandas as pd
import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'CharKhone.settings')
django.setup()

from ProximityFinder.models import Building

df = pd.read_csv('buildings.csv')

for _, row in df.iterrows():
    Building.objects.create(
        id=row['id'],
        title=row['title'],
        time=row['time'],
        meterage=row['meterage'],
        price=row['price'],
        price_per_meter=row['price_per_meter'],
        image=row['image'],
        description=row['description'],
        phone=row['phone'],
        floor=row['floor'],
        all_floors=row['all_floors'],
        build_date=row['build_date'],
        rooms=row['rooms'],
        facilities=row['facilities'],
        latitude=row['latitude'],
        longitude=row['longitude'],
        priorities=row['priorities']
    )
