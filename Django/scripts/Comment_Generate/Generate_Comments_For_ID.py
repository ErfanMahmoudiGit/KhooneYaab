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
    
    # Return the date and time in the desired format
    return random_time.strftime("%Y-%m-%d %H:%M")

# Persian names, last names, and sample comments
names = ["علی", "محمد", "زهرا", "فاطمه", "حسین", "رضا", "مینا", "احمد", "عرفان", "نگار"]
last_names = ["احمدی", "کاظمی", "کریمی", "مرادی", "نعمتی", "موسوی", "سلیمانی", "رضایی", "محمودی", "فرخی"]

comments = [
    "ملک از عکس‌ها بهتر بود.",
    "خیلی بزرگ و دلباز بود.",
    "تمیز و مرتب بود، ولی پارکینگ کوچک داشت.",
    "دسترسی به مراکز خرید خیلی خوب بود.",
    "به نسبت قیمت، امکانات مناسبی دارد.",
    "آسانسور خراب بود و نیاز به تعمیر داشت.",
    "این ملک نیاز به بازسازی داشت.",
    "از خرید خود راضی هستم.",
    "همسایه‌ها خیلی مهربان و کمک‌کننده بودند.",
    "محیط بسیار ساکت و آرام است.",
    "نور طبیعی خوبی داشت.",
    "ساخت ملک نسبتاً جدید بود.",
    "سرویس بهداشتی‌ها کوچک بودند.",
    "فضای حیاط بزرگ و دلباز است.",
    "پارکینگ کافی نبود و باید روی خیابان پارک کنیم.",
    "امکانات رفاهی اطراف ملک خیلی خوب است.",
    "برای خانواده‌ها خیلی مناسب نیست.",
    "فضای داخلی طراحی مدرنی داشت.",
    "سیستم گرمایشی خوب کار نمی‌کرد.",
    "ملک بسیار تمیز و مرتب تحویل داده شد.",
    "دسترسی به مدرسه‌ها نزدیک است.",
    "ملک در موقعیت خوبی قرار دارد.",
    "فضای نشیمن بزرگ و جادار بود.",
    "آشپزخانه کوچک است، اما قابل قبول.",
    "محله ملک جدید و مدرن است.",
    "به نظر می‌رسد مالک در نگهداری ملک کوتاهی کرده.",
    "سر و صدای زیاد از خیابان وجود داشت.",
    "نزدیکی به پارک و فضای سبز یک مزیت بزرگ است.",
    "ساخت و ساز اطراف ملک زیاد بود.",
    "سیستم ایمنی خوبی دارد.",
    "هزینه‌های نگهداری ملک کمی بالا است.",
    "از تهویه ملک رضایت دارم.",
    "ملک در نزدیکی ایستگاه مترو قرار دارد.",
    "ملک قدیمی است، اما موقعیت خوبی دارد.",
    "محل پارکینگ کوچک است و مشکل‌ساز است.",
    "خدمات محلی و دسترسی به سوپرمارکت عالی است.",
    "نورگیر بسیار عالی است.",
    "فضای اتاق‌ها نسبتاً کوچک است.",
    "ساختار ملک خیلی قدیمی است.",
    "بسیار نزدیک به مدارس و دانشگاه‌ها است.",
    "آب و هوای محله بسیار خوب است.",
    "سرعت اینترنت در این محل خوب نیست.",
    "ملک دور از امکانات شهری بود.",
    "نزدیکی به بیمارستان از نکات مثبت است.",
    "قیمت ملک نسبت به شرایط آن مناسب است.",
    "پارکینگ شخصی ندارد و باید در خیابان پارک کرد.",
    "خیلی تمیز و مرتب بود.",
    "ملک به مرکز خرید نزدیک است.",
    "سروصدای زیاد از خیابان وجود داشت.",
    "با وجود اینکه ملک قدیمی است، باز هم ارزش خرید دارد."
]

# Generating fake comments
def generate_fake_comments_with_last_name():
    writer_id = 10000
    fake_comments = []
    
    for day in range(30):
        num_comments = random.randint(6, 7)
        
        for _ in range(num_comments):
            first_name = random.choice(names)
            last_name = random.choice(last_names)
            comment_data = {
                "writer_id": writer_id,
                "writer_name": f"{first_name} {last_name}",
                "description": random.choice(comments),
                "building_id": 4,
                "created_at": random_date_within_last_30_days()
            }
            fake_comments.append(comment_data)
            writer_id += 1
    
    return fake_comments

# Generate the comments and save to a JSON file
fake_comments_with_last_name = generate_fake_comments_with_last_name()

# Save the comments to a JSON file
json_filename = 'fake_comments_with_last_name.json'
with open(json_filename, 'w', encoding='utf-8') as f:
    json.dump(fake_comments_with_last_name, f, ensure_ascii=False, indent=4)

print(f"Fake comments have been saved to {json_filename}")
