from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

# Initialize FastAPI app
app = FastAPI()

# Load the sentiment analysis pipeline
classifier = pipeline('sentiment-analysis', model="HooshvareLab/bert-fa-base-uncased-sentiment-persian")

# Define the request body structure
class Comment(BaseModel):
    text: str

# Define the response structure
class SentimentResponse(BaseModel):
    sentiment: str
    score: float

@app.post("/analyze-sentiment/", response_model=SentimentResponse)
async def analyze_sentiment(comment: Comment):
    # Perform sentiment analysis
    result = classifier(comment.text)[0]
    
    # Prepare the response
    sentiment = result['label']
    score = result['score']
    
    return SentimentResponse(sentiment=sentiment, score=score)
