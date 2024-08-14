import requests
import json
from divar_data import homes 
import time

# Function to fetch data from the API
def fetch_data_from_api(post_id):
    url = f"https://api.divar.ir/v8/posts-v2/web/{post_id}"

    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad responses
        return response.json()  # Return JSON response for further processing

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None

# Function to extract data from the response JSON
def extract_data(response_json):
    availability_mapping = {"true": "1", "false": "0"}

    fields = {
        'id': None,  # Will be set later
        'city': '',
        'title': '',
        'category': '',
        'time': '',
        'meterage': '',
        'price': '',
        'price_per_meter': '',
        'image': '',
        'description': '',
        'floor': '',
        'all_floors': '',
        'build_date': '',
        'rooms': '',
        'latitude': '',
        'longitude': '',
        'elevator': '',
        'parking': '',
        'warehouse': '',
        'jahat': '',
        'vahed': '',
        'sanad': '',
        'status': ''
    }

    # Extract city
    fields["city"] = response_json["seo"]["web_info"].get("city_persian", "")

    # Iterate through sections and widgets
    for section in response_json["sections"]:
        for widget in section.get("widgets", []):
            widget_type = widget.get("widget_type", "")

            if widget_type == "IMAGE_CAROUSEL":
                items = widget["data"].get("items", [])
                if items:
                    fields["image"] = items[0]["image"].get("url", "")

            elif widget_type == "LEGEND_TITLE_ROW":
                fields["title"] = widget["data"].get("title", "")
                fields["time"] = widget["data"].get("subtitle", "")

            elif widget_type == "DESCRIPTION_ROW":
                fields["description"] = widget["data"].get("text", "")

            elif widget_type == "WRAPPER_ROW":
                chips = widget["data"].get("chip_list", {}).get("chips", [])
                if chips:
                    fields["category"] = chips[0].get("text", "")

            elif widget_type == "MAP_ROW":
                location = widget["data"].get("location", {}).get("exact_data", {}).get("point", {})
                fields["latitude"] = location.get("latitude", "")
                fields["longitude"] = location.get("longitude", "")

            elif widget_type == "UNEXPANDABLE_ROW":
                title = widget["data"].get("title", "")
                value = widget["data"].get("value", "")

                if title == "قیمت کل":
                    fields["price"] = value.replace("تومان", "").replace(",", "").strip()
                elif title == "قیمت هر متر":
                    fields["price_per_meter"] = value.replace("تومان", "").strip().replace(",", "")
                elif title == "متراژ":
                    fields["meterage"] = value
                elif title == "طبقه":
                    parts = value.split("از")
                    if len(parts) == 2:
                        fields["floor"] = parts[0].strip()
                        fields["all_floors"] = parts[1].strip()
                    else:
                        fields["floor"] = value.strip()

            elif widget_type == "GROUP_INFO_ROW":
                items = widget["data"].get("items", [])
                if len(items) > 0:
                    fields["meterage"] = items[0].get("value", "")
                if len(items) > 1:
                    fields["build_date"] = items[1].get("value", "")
                if len(items) > 2:
                    fields["rooms"] = items[2].get("value", "")

            elif widget_type == "GROUP_FEATURE_ROW":
                items = widget["data"].get("items", [])
                if len(items) > 0:
                    fields["elevator"] = availability_mapping.get(items[0].get("available", "false"), "0")
                if len(items) > 1:
                    fields["parking"] = availability_mapping.get(items[1].get("available", "false"), "0")
                if len(items) > 2:
                    fields["warehouse"] = availability_mapping.get(items[2].get("available", "false"), "0")

    return fields


def write_homes_to_file(homes, filename):
    with open(filename, 'w', encoding='utf-8') as file:
        file.write("homes = [\n")
        for home in homes:
            file.write(f"    {json.dumps(home, ensure_ascii=False)},\n")
        file.write("]\n")

# Main execution
if __name__ == "__main__":
    
    post_ids = [
                """
                "gZ8y318a",
                "gZwG_pG-",
                "gZ8qfIBH",
                "gZFCwGeq",
                "gZ4uFgfp",
                "gZ3GYu0x",
                "gZ8mP-Kg",
                "gZ3WWadu",
                "gZqGwY3X",
                "gZmGxPW0",
                "gZ1Ct6sk",
                "gZ8ivsVD",
                "gZ8iPtTB",
                "gZ8WPLHQ",
                "gZ8mPLai",
                "gZ8iPF0O",
                "gZja3ELr",
                "gZ8mvZIK",
                "gZvWnJcb",
                "gZkm9Hsx",
                "gZ8mv0g-",
                "gZ8mv1ce",
                "gZ8Sv7jG",
                "gZ8WPLHQ",
                "gZ8iPtTB",
                "gZ8ivsVD",
                "gZ1Ct6sk",
                "gZ8ifc1l",
                "gZ8iErWP",
                "gZeCTKO-",
                "gZ8i_HzA",
                "gZ8ivD7o",
                "gZv-Veap",
                "gZ8ePfmw",
                "gZ8evHhv",
                "gZlqx1e_",
                "gZrGPJDE",
                "gZ7WGBkQ",
                "gZBiHhuB",
                "gZ8aPcum",
                "gZmKXVT5",
                "gZ52L1sT",
                "gZ8avVqp",
                "gZ8uVs8i",
                "gZ8OfG5X",
                "gZ8WfdMp",
                "gZ4u_0o1",
                "gZ8WfYZS",
                "gZ8WfWuV",
                "gZqmpJ1y",
                "gZmRvoL_",
                "gZ8SPXdB",
                "gZ8WPKB9",
                "gZ4WnykD",
                "gZ8W_Ga-",
                "gZ62RQcz",
                "gZ8S_5bu",
                "gZzGTQ9X",
                "gZxWwPU7",
                "gZ8SPG9C",
                "gZ8Ovvjm",
                "gZ8OvEIM",
                "gZ8O_OVN",
                "gZ8K_vNL",
                "gZ4aeysd",
                "gZ8KvcG9",
                "QZSS9gfd",
                "gZ8KfcoV",
                "gZnK6hq4",
                "gZXxjKmD",
                "gZIt3UHH",
                "gZo6YIvq",
                "gZ8KPM_5",
                "gZ7uOzic",
                "gZ8K_Bso",
                "gZ0mHh_h",
                "gZwawIu-",
                "gZ86ayf5",
                "gZ8G_aD3",
                "gZhq1Ehb",
                "gZ8G_K9g",
                "gZ8CPxOE",
                "gZ8C_9jg",
                "gZ8Cv5PT",
                "gZuCUy_G",
                "gZ8CPMk_",
                "gZtSekFx",
                "gZwy_NDH",
                "gZ5CbuJn",
                "gZ7mRKR-",
                "gZ72mta8",
                "gZ8--PMt",
                "gZnmO_nf",
                "gZ82eq7z",
                "gZ86us_3",
                "gZ6qPqv-",
                "gZ7Kx_IF",
                "gZ86O5Hn",
                "gZ8abmFx",
                "gZ86OlgF",
                "gZ86OU0S",
                "gZ76yq1v",
                "gZ8tIFHp",
                "gZ0y2289",
                "gZ82-wy3",
                "gZ82OpwK",
                "gZ82uncX",
                "gZOaZNJp",
                "gZ8yuhaP",
                "gZ8ye4tv",
                "gZ8yeG0G",
                "gZ8yevVd",
                "gZ8y-MUM",
                "gZ8yeX4k",
                "gZ8ueeZI",
                "gZ8yeO8_",
                "gZ8yOHFn",
                "gZ8u-zlQ",
                "gZ8uOhAt",
                "gZ7i1DKV",
                "gZ1Cs7c-",
                "gZ8ueZMy",
                "gZ4y128h",
                "gZ8uOUgq",
                "gZ8qOiKd",
                "gZ4W3gtY",
                "gZ0m6u3n",
                "gZ8qu3x0",
                "gZ8WexBb",
                "gZdy040H",
                "gZ1Ct8an",
                "gZ8Gu5Qv",
                "gZvmOB47",
                "gZoiqEjX",
                "gZpWBLOJ",
                "gZaeynXs",
                "gZ8C-tb2",
                "gZ3qSbW-",
                "gZf2Y7N6",
                "gZ86YQvx",
                "gZrmpJpa",
                "gZNmEsAu",
                "gZDmLf76",
                "gZLa4prY",
                "gZFKmxjP",
                "gZ86tbrZ",
                "gZ7-UHW7",
                "gZky6T5v",
                "gZ424Lgi",
                "gZ8mORxW",
                "gZ8mODeP",
                "gZoE_eIa",
                "gZ7K4HzL",
                "gZ8muHgd",
                "QZRyxlxA",
                "gZ8iuuG7",
                "gZ8iOjBN",
                "gZXy9z-d",
                "gZvGkQfX",
                "gZ8i-XZv",
                "gZ8OuSnH",
                "gZrOEDj0",
                "gZ8ieCcR",
                "gZzW8z57",
                "gZwmZreE",
                "gZ8euUvf",
                "gZeGqNZi",
                "QZVLPju0",
                "gZ5uMM3B",
                "gZ8eODoS",
                "gZw-5HgU",
                "gZjVFYgT",
                "gZtuuHrU",
                "gZpuzLOF",
                "gZ5q-tM7",
                "gZjVFYgT",
                "gZtuuHrU",
                "gZpuzLOF",
                "gZ5q-tM7",
                "gZwS_a2L",
                "gZuOSRu4",
                "gZ2mBeGl",
                "gZ8C-yzk",
                "gZfyZ2AE",
                "gZfO6jDf",
                "gZ42mzhf",
                "gZ_YnVQ3",
                "gZimq983",
                "gZ8KOKd_",
                "gZ8WOs_e",
                "gZ8W-uU4",
                "gZ8CWp6U",
                "gZ8RzvF9",
                "gZzCys7O",
                "gZi8ApW8",
                "gZ8WeYeS",
                "gZ8WOXjI",
                "gZu6VqTk",
                "gZxmwhNo",
                "gZ8W-Ako",
                "gZ8S-6NJ",
                "gZ8W8Q8C",
                "gZ8Su5TB",
                "gZntAOGu",
                "gZqaH1kJ",
                "gZ8SOrOD",
                "gZ8C5v1q",
                "gZ8S-qEp",
                "gZ8SOrFQ",
                "gZ8Sek5X",
                "gZ8S-Y8U",
                "gZfSO_S0",
                "gZXu4PtU",
                "gZbOelZ3",
                "gZXGZjM3",
                "gZ5SdxvB",
                "gZX-o4Hm",
                "gZiqauyA",
                "gZX2oJ7h",
                "gZ8SeKM_",
                "gZxideuv",
                "gZX6Ybcn",
                "gZc29FHl",
                "gZ7CisbG",
                "gZ7CisbG",
                "gZ8OOr4J",
                "gZ82arSN",
                "gZ8O-isT",
                "gZ8OuJf4",
                "gZ4Wd91u",
                "gZrezVl9",
                "gZ8OOcN5",
                "gZ7-EnS9",
                "gZ5ytrqg",
                "gZwCs3NO",
                "gZ8OuDbV",
                "gZ7qiLCG",
                "gZ8Ku0Fo",
                "gZ8Ku_3Z",
                "gZyaT3HV",
                "gZ8G-yr9",
                "gZ6WAMlU",
                "gZxOkTlV",
                "gZ8WKg2X",
                "gZ8yFGbJ",
                "gZzymEXm",
                "gZ6agaus",
                "gZh2iVTL",
                "gZ82tb7b",
                "gZBe1gls",
                "gZ8KeCus",
                "gZxeO6cx",
                "gZci81Uf",
                "gZ8KGPsn",
                "gZ8SWcc5",
                "gZjqmcxn",
                "gZnmk4dE",
                "gZX-v4tS",
                "gZi2gf2a",
                "gZ5OOHpl",
                "gZ8GOhZL",
                "gZeWWsa3",
                "gZi-j0i6",
                """
    ]
    
    counter = 0
    
    for post_id in post_ids:
        response_json = fetch_data_from_api(post_id)
        counter += 1
        if response_json:
            fields = extract_data(response_json)
            fields['id'] = len(homes) + 1001  # Assign a new ID based on current homes length
            if fields['latitude']:
                homes.append(fields)  # Add the new home to the homes list
                write_homes_to_file(homes, 'divar_data.py')  # Write to divar_data
                print(str(counter) + " Updated homes list has been written to divar_data.")
            else:
                print (str(counter) + " Latitude is Empty.")
        time.sleep(1)