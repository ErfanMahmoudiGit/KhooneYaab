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

from Get_Data_By_ID.divar_data import homes

for home in homes:
    mtr = utils.convert_persian_text_to_english_digits(home['meterage'])
    prc = utils.convert_persian_text_to_english_digits(home['price'])
    ppm = utils.convert_persian_text_to_english_digits(home['price_per_meter'])
    flr = utils.convert_persian_text_to_english_digits(home['floor'])
    avhd= utils.convert_persian_text_to_english_digits(home['all_floors'])
    rms = utils.convert_persian_text_to_english_digits(home['rooms'])
    elevator= utils.convert_persian_text_to_english_digits(home['elevator'])
    parking= utils.convert_persian_text_to_english_digits(home['parking'])
    warehouse = utils.convert_persian_text_to_english_digits(home['warehouse'])
    bdt = utils.convert_persian_text_to_english_digits(home['build_date'])
    
    if home['latitude']:
        Building.objects.create(
            owner_id=0,
            city=home['city'],
            category=home['category'],
            title=home['title'],
            #time=home['time'],
            time = "2001-01-01", ### TODO
            meterage=mtr,
            price=prc,
            price_per_meter=ppm,
            image=home['image'],
            description=home['description'],
            floor=flr,
            all_floors=avhd,
            build_date=bdt,
            rooms=rms,
            facilities = f"[{elevator},{parking},{warehouse}]",
            direction=home['jahat'],
            document_type=home['sanad'],
            status=home['status'],
            latitude=home['latitude'],
            longitude=home['longitude'],
            priorities = "[1,1,1]"# TODO, shows if the building is close to: hospital, school, park
        )
    else:
        print (str(home['id']) + " Home id does not have a latitude.")