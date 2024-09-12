import requests
import json

# Load the comments from the JSON file
with open('500_random_comments.json', 'r', encoding='utf-8') as f:
    comments = json.load(f)

# URL of your API to add comments
url = "http://localhost:8000/ProximityFinder/api/building/comments/add-comment/"

# Loop through the comments and send each one to the API
for comment in comments:
    response = requests.post(url, json=comment)
    if response.status_code == 201:
        print(f"Successfully added comment: {comment['writer_name']}")
    else:
        print(f"Failed to add comment: {comment['writer_name']}, Error: {response.content}")
