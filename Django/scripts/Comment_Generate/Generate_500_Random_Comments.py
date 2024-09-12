import random
from datetime import datetime, timedelta
import json

# Helper function to generate random dates with format 'YYYY-MM-DD HH:MM'
def random_date_within_last_30_days():
    today = datetime.now()
    start_date = today - timedelta(days=30)
    random_date = start_date + timedelta(days=random.randint(0, 30))
    
    # Add random hours and minutes to the random date
    random_time = random_date + timedelta(
        hours=random.randint(0, 23),
        minutes=random.randint(0, 59)
    )
    
    # Return the date and time as a string in the desired format 'YYYY-MM-DD HH:MM'
    return random_time.strftime("%Y-%m-%d %H:%M")

# Persian names, last names, and sample comments
names = ["علی", "محمد", "زهرا", "فاطمه", "حسین", "رضا", "مینا", "احمد"]
last_names = ["احمدی", "کاظمی", "کریمی", "مرادی", "نعمتی", "موسوی", "سلیمانی", "رضایی"]
comments = [
    "این ملک عالی بود!", "اصلاً از اینجا راضی نیستم.", "قیمت خیلی بالا است.", 
    "منظره زیبا است و امکانات عالی.", "مکان خوبی است، اما قدیمی است.", 
    "این ملک برای خانواده‌ها مناسب است.", "محله امن و آرامی دارد.", 
    "پارکینگ و آسانسور خوبی دارد.", "نورگیر عالی و محله خلوت."
]

# Generate 500 random comments
def generate_500_random_comments():
    writer_id = 10000
    random_comments = []
    
    for _ in range(500):
        # Generate random comment data
        first_name = random.choice(names)
        last_name = random.choice(last_names)
        comment_data = {
            "writer_id": writer_id,
            "writer_name": f"{first_name} {last_name}",
            "description": random.choice(comments),
            "building_id": random.randint(1, 1000),  # Random building ID between 1 and 1000
            "created_at": random_date_within_last_30_days()  # Use the formatted date
        }
        random_comments.append(comment_data)
        writer_id += 1
    
    return random_comments

# Generate the comments and save them to a JSON file
random_comments = generate_500_random_comments()

# Save to a JSON file
json_filename = '500_random_comments.json'
with open(json_filename, 'w', encoding='utf-8') as f:
    json.dump(random_comments, f, ensure_ascii=False, indent=4)

print(f"500 random comments have been saved to {json_filename}")