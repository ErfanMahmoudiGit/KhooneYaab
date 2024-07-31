from . import jalali
from django.utils import timezone
import re

def persian_numbers_convertor(mystr):
    numbers = {
    "0" : "۰",
    "1" : "۱",
    "2" : "۲",
    "3" : "۳",
    "4" : "۴",
    "5" : "۵",
    "6" : "۶",
    "7" : "۷",
    "8" : "۸",
    "9" : "۹",
    }
    #items is used to access key value
    for e,p in numbers.items():
        mystr = mystr.replace(e, p)
    return mystr

def jalali_convertor(time):
    time = timezone.localtime(time)
    jmonths = ["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"]
    time_to_str = "{},{},{}".format(time.year, time.month, time.day)
    time_to_tuple = jalali.Gregorian(time_to_str).persian_tuple()

    time_to_list = list (time_to_tuple)
    for index, month in enumerate(jmonths):
        if time_to_list[1] == index + 1:
            time_to_list[1] = month
            break

    output = "{} {} {} ساعت {}:{}".format(
    time_to_list[2],
    time_to_list[1],
    time_to_list[0],
    time.hour,
    time.minute,
    )

    return persian_numbers_convertor(output)

def convert_persian_text_to_english_digits(s):
    s = str(s)
    
    persian_to_english = {
        '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
        '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'
    }
    
    # Replace Persian digits with English digits
    for persian_digit, english_digit in persian_to_english.items():
        s = s.replace(persian_digit, english_digit)
    
    # Remove all non-numeric characters
    s = re.sub(r'\D', '', s)
    if s == '':
        s = 0
    return s