#this file should be at the same level with manage.py to run correctly.
import pandas as pd
import os
import django
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'CharKhone.settings')
django.setup()

from ProximityFinder.models import Building

df = pd.read_csv("buildings.csv")
for _, row in df.iterrows():
    Building.objects.create(
        id=row['id'],
        city = row['city'],
        title=row['title'],
        category = row['category'],
        time=row['time'],
        meterage=row['meterage'],
        price=row['price'],
        price_per_meter=row['price_per_meter'],
        image=row['image'],
        description=row['description'],
        # phone=row['phone'],
        floor=row['floor'],
        all_floors=row['all_floors'],
        #build_date=row['build_date'],
        build_date=2001,
        rooms=row['rooms'],
        # facilities=row['facilities'],
        latitude=row['latitude'],
        longitude=row['longitude'],
        elevator = row['elevator'],
        parking = row['parking'],
        warehouse =row['warehouse'],
        jahat = row['jahat'],
        vahed = row['vahed'],
        sanad= row['sanad'],
        status =row['status']
        # priorities=row['priorities']
    )
