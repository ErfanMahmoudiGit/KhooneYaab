import requests
import json
import csv
from divar_data import homes 

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
    fields["price"] = response_json["webengage"]["credit"]
    fields["price_per_meter"] = response_json["webengage"]["rent"]

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

    #         elif widget_type == "RENT_SLIDER":
    # # Extract data from widget
    #             credit_value = widget["data"].get("credit", {}).get("value", "")
    #             rent_value = widget["data"].get("rent", {}).get("value", "")
                
    #             # Extract and clean the values based on the title
                
    #             fields["price"] = credit_value
    #             fields["price_per_meter"] = rent_value
           
            elif widget_type == "UNEXPANDABLE_ROW":
                title = widget["data"].get("title", "")
                value = widget["data"].get("value", "")

                if title == "طبقه":
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
# کرمان سمنان زنجان اصفهان اذزبایجان مشهد
if __name__ == "__main__":

    # post_ids = ["gZFP575I","gZ6GP0tw","gZHHHp7y","gZHXHE2e","gZH_HMX8","gZHvHm9V","gZHn3wL3","gZHX45gB","gZHXoQWY","gZHTIEUq","gZHf4CQu","gZ_2qAXa"]
    # post_ids = ["gZHThpHv","gZHbRUfL","gZHHRs9V","gZ3-h7te","gZHLUWQp","gZHTkCud","gZHX0NoT","gZHXTqi6","gZHHznpw","gZHTCyKx","gZymTFhQ","gZy6QO7D","gZHvke11","gZHv0UbD","gZH70suZ","gZHLkAU-","gZHDExVd","gZH3T3TW","gZsipVF-","gZHbFQTN","gZHTFSxu","gZHL1B8Z","gZDvXzSX","gZHv1lN3","gZHLmaWN","gZoGdrLZ","gZHblory","gZHbV-4h","gZHf1TKY","gZHvmfPM","gZHb2-ax","gZHX2VUV","gZH3omoN","gZH_nFC1","gZHXXyh7","gZHrnsWS","gZGfyvvL","gZ0asFCs","gZH32vRg","gZH3mfQ7","gZHHnaZF"]
    # post_ids =["gZGjvgP1","gZGjPiQK","gZGvfPOW","gZEPFUZz","gZGvvvz2","gZA33smg","gZG7fLlT","gZ7aCsr3","gZEj2ZEE","gZvCUsHn","gZBHabxO","gZ5ycbNl","gZHrAmpv","gZG3vYZP","gZHnQu3_"]
    # post_ids =["gZG3NFmF","gZG_ir28","gZGD-VYq","gZAfs0sL","gZGnebIl","gZALlrsI","gZGr-Xes","gZGrOpyn","gZGv-RjI","gZGD_WSz","gZmywwmQ","gZGH__tC","gZG__NT2","gZGXfT36","gZG7fK9g"]
    # post_ids =["gZGvAW23","gZ4291HM","gZGvARsd","gZG_rkFt","gZGXrwde","gZGTrPXk","gZ5-QTDJ","gZGPzF2x","gZGfjc4k","gZGHkNHL","gZG3lO3k","gZGn9blW","gZGX9LBo","gZGzNUXC","gZGvduGj"]
    # post_ids =["gZGbgDSM","gZCLEoWT","gZFr_-BA","gZD7FfBY","gZF_vK-n","gZGDgk2W","gZEzqNUA","gZxOtjBu","gZGHgp2v","gZGTwW5q","gZ8y9I-p","gZGTCRt5","gZF_bQhD","gZG_Bp5V","gZCrQc1U","gZySVGvf"]
    # post_ids = ["gZHrIwUH","gZiKwNA6","gZHvoMwL","gZHv47ze","gZHzofu4","gZHzY-od","gZH7o1fo","gZHDZg2X","gZHf53VY","gZHrZ6wS","gZmehsqI","gZHPJSWH","gZHfpkYS","gZHr5C32","gZA7dflG"]
    # post_ids = ["gZHnXmWJ","gZHnH5TA","gZZez5BZ","gZH33IVH","gZH3n50v","gZH7Xv8V","gZH3n6sZ","gZ9yMQ4s","gZETyFFw","gZDXJoPU","gZHPINF9","gZHrodcr","gZHbIxkz","gZ2uy-Gz","gZHfY5bV"]
    # post_ids = ["gZHrHm3b","gZHvnUqs","gZGXfVv1","gZHbJpJN","gZH_GUtl","gZBmpz2h","gZHjJK_e","gZHb5h6E","gZHvZhOx","gZHjYA_o","gZHLZqIx","gZHbJPBK","gZ7aKzwI","gZHb5h6E","gZHnIIFx"]
    # post_ids = ["gZHHVGwW","gZ-2CAKd","gZHTVA1h","gZHXVYgb","gZHn1ZAX","gZHP418N","gZHD4VqY","gZnONnDp","gZHjXids","gZHXndT9","gZHP2_du","gZHjm4nk","gZHTG5TX","gZHj2tGy","gZH_GBPB"]
    # post_ids = ["gZHLVWAb","gZGbeGo5","gZD_mTzL","gZH3p7Db","gZHzp2Jj","gZH_Jk4d","gZBrg-_-","gZCvURz_","gZHHqmOT","gZxC7hJf","gZH_1dgz","gZHz1ysE","gZHzFle6","gZ2GSXGZ"]
    # post_ids = ["gZG7uYee","gZEDX71F","gZHfohSE","gZHjIjsV","gZHnYqNk","gZHXXhFa","gZHz0nPE","gZHvI42O","gZHTpdVI","gZH_4AJo","gZHD5cP_","gZDrm4nc","gZHz5MGj","gZrWur8e","gZHfZN3D","gZHfZIMN"]
    # post_ids = ["gZHXYCjS","gZludfd7","gZHj3nlr","gZHn3JrH","gZHHozQL","gZHvnqe0","gZHvX5J7","gZHvn1cD","gZF_q0x4","gZHz38It","gZHfHjzi","gZHnnkO5","gZH3HhFB","gZHToWdI","gZHLo2Go","gZHToWdI"]
    # post_ids = ["gZQ6_BDB","gZHPZ2cv","gZEzdL5F","gZH34OVI","gZHzoXIp","gZHrF4La","gZHrYuSc","gZHHIjNn","gZH_IGlc","gZHb6Fzw","gZHPKCRG","gZHXZtkH","gZHTJuf1","gZZiiQ8h","gZHrXgOF","gZHj3OzF"]
    # post_ids = ["gZpeEgZx","gZHfK-7J","gZpaUj8I","gZzOgc6H","gZHbacAP","gZHXqUxy","gZ3unwzl","gZ7axX4w","gZEnCH4V","gZFfqvqS","gZDXCIe3","gZi6waAw","gZHbqXxo","gZHb61Hd","gZ52ggAD","gZ7m5ISf"]
    # post_ids = ["gZ-yub2i","gZFLshXb","gZHT6P31","gZn-ZP5f","gZHTqXb2","gZDfYVPP","gZ4VnYKx","gZHTqbSk","gZHTKQ_G","gZDnzQL0","gZ9GS_-Q"]
    post_ids = ["","","","","","","","","","","","","","","",""]
    for post_id in post_ids:
        response_json = fetch_data_from_api(post_id)

        if response_json:
            fields = extract_data(response_json)
            fields['id'] = len(homes) + 1  # Assign a new ID based on current homes length
            homes.append(fields)  # Add the new home to the homes list
            write_homes_to_file(homes, 'divar.py')  # Write to newfile.py
            print("Updated homes list has been written to newfile.py")
