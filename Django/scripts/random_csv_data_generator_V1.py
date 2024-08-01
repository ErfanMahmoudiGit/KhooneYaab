import pandas as pd
import random
from faker import Faker

fake = Faker()

def generate_phone():
    return '0919' + ''.join([str(random.randint(0, 9)) for _ in range(7)])

# Function to generate records
def generate_record(id):
    meterage = random.randint(10, 500)
    price = random.randint(1000000000, 100000000000)
    price_per_meter = price / meterage
    floor = random.randint(1, 20)
    build_date = random.randint(1980, 2024)
    all_floors = random.randint(floor, 20)
    facilities = [random.randint(0, 1) for _ in range(3)]
    priorities = [random.randint(0, 1) for _ in range(3)]
    
    record = {
        "id": id,
        "title": fake.catch_phrase(),
        "time": fake.date_between(start_date='-2y', end_date='today').strftime("%Y-%m-%d"),
        "meterage": meterage,
        "price": price,
        "price_per_meter": price_per_meter,
        "image": fake.image_url(),
        "description": fake.text(max_nb_chars=200),
        "phone": generate_phone(),
        "floor": floor,
        "all_floors": all_floors,
        "build_date": build_date,
        "rooms": random.randint(1, 20),
        "facilities": facilities,
        "latitude": round(random.uniform(51.132826, 51.609179), 6),
        "longitude": round(random.uniform(35.608353, 35.779512), 6),
        "priorities": priorities
    }
    return record

records = [generate_record(i + 1) for i in range(2000)]

df = pd.DataFrame(records)

df.to_csv("buildings.csv", index=False)

print("CSV file 'buildings.csv' generated successfully.")
