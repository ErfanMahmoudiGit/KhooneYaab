from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

app = FastAPI()

# Load pre-trained BERT model and tokenizer for Persian
tokenizer = AutoTokenizer.from_pretrained("HooshvareLab/bert-fa-base-uncased-sentiment-snappfood")
model = AutoModelForSequenceClassification.from_pretrained("HooshvareLab/bert-fa-base-uncased-sentiment-snappfood")

class CommentRequest(BaseModel):
    comment: str

class SentimentResponse(BaseModel):
    sentiment: str

# Sentiment analysis using BERT model
def bert_sentiment_analysis(text):
    # Tokenize input text
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128)

    # Perform inference
    with torch.no_grad():
        outputs = model(**inputs)
    
    # Convert logits to probabilities
    probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)

    # Get the predicted label (0: negative, 1: neutral, 2: positive)
    sentiment = torch.argmax(probabilities, dim=-1).item()

    # Map the result to sentiment labels
    if sentiment == 2:
        return "good"
    elif sentiment == 0:
        return "bad"
    else:
        return "neutral"

@app.post("/analyze-sentiment", response_model=SentimentResponse)
async def analyze_sentiment(request: CommentRequest):
    # Use the BERT model to analyze the sentiment
    sentiment = bert_sentiment_analysis(request.comment)
    return SentimentResponse(sentiment=sentiment)
