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
from extentions import utils

df = pd.read_csv("buildings.csv")
for _, row in df.iterrows():
    mtr = utils.convert_persian_text_to_english_digits(row['meterage'])
    prc = utils.convert_persian_text_to_english_digits(row['price'])
    ppm = utils.convert_persian_text_to_english_digits(row['price_per_meter'])
    vhd = utils.convert_persian_text_to_english_digits(row['vahed'])
    rms = utils.convert_persian_text_to_english_digits(row['rooms'])
    elevator=utils.convert_persian_text_to_english_digits(row['elevator'])
    parking=utils.convert_persian_text_to_english_digits(row['parking'])
    warehouse =utils.convert_persian_text_to_english_digits(row['warehouse'])
    
    Building.objects.create(
        city = row['city'],
        category = row['category'],
        title=row['title'],
        time = "2001-01-01", ### TODO
        meterage=mtr,
        price=prc,
        price_per_meter=ppm,
        image=row['image'],
        description=row['description'],
        floor=vhd,
        build_date=row['build_date'],
        rooms=rms,
        facilities = f"[{elevator},{parking},{warehouse}]", # type: ignore
        direction = row['jahat'],
        document_type= row['sanad'],
        status =row['status'],
        latitude=row['latitude'],
        longitude=row['longitude'],
        priorities = "[1,1,1]"# TODO, shows if the building is close to: hospital, school, park
    )
