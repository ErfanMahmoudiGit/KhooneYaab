import pandas as pd
import random
from faker import Faker

# Initialize Faker
fake = Faker()

# Function to generate random phone numbers
def generate_phone():
    return '0919' + ''.join([str(random.randint(0, 9)) for _ in range(7)])

# Function to generate records
def generate_record(id):
    meterage = random.randint(10, 500)
    price = random.randint(1000000000, 100000000000)
    price_per_meter = price / meterage
    floor = random.randint(1, 20)
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
        "build_date": fake.date_between(start_date='-20y', end_date='today').strftime("%Y-%m-%d"),
        "rooms": random.randint(1, 20),
        "facilities": facilities,
        "latitude": round(random.uniform(51.132826, 51.609179), 6),
        "longitude": round(random.uniform(35.608353, 35.779512), 6),
        "priorities": priorities
    }
    return record

# Generate 2000 records
records = [generate_record(i + 1) for i in range(2000)]

# Convert to DataFrame
df = pd.DataFrame(records)

# Save to CSV
df.to_csv("buildings.csv", index=False)

print("CSV file 'buildings.csv' generated successfully.")
