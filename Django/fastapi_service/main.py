from fastapi import FastAPI
from pydantic import BaseModel
from parsivar import Normalizer, Tokenizer, FindStems

app = FastAPI()

# Initialize Parsivar tools
normalizer = Normalizer(statistical_space_correction=True)
tokenizer = Tokenizer()
stemmer = FindStems()

class CommentRequest(BaseModel):
    comment: str

class SentimentResponse(BaseModel):
    sentiment: str
    
import torch
from transformers import MT5ForConditionalGeneration, MT5Tokenizer
import numpy as np

tokenizer = MT5Tokenizer.from_pretrained(r"C:\\mt5-base-parsinlu-sentiment-analysis")
model = MT5ForConditionalGeneration.from_pretrained(r"C:\\mt5-base-parsinlu-sentiment-analysis")


def model_predict(text_a, text_b):
    features = tokenizer( [(text_a, text_b)], padding="max_length", truncation=True, return_tensors='pt')
    output = model(**features)
    logits = output[0]
    probs = torch.nn.functional.softmax(logits, dim=1).tolist()
    idx = np.argmax(np.array(probs))
    print(labels[idx], probs) # type: ignore


def run_model(context, query, **generator_args):
    input_ids = tokenizer.encode(context + "<sep>" + query, return_tensors="pt")
    res = model.generate(input_ids, **generator_args)
    output = tokenizer.batch_decode(res, skip_special_tokens=True)
    
    return output

@app.post("/analyze-sentiment", response_model=SentimentResponse)
async def analyze_sentiment(request: CommentRequest):
    print(request)
    sentiment = run_model(str(request.comment), "نظر شما در مورد خانه چیست؟")[0]
    if sentiment == 'positive' or sentiment == 'very positive' :
        return SentimentResponse(sentiment="good")
    elif sentiment == 'negative' or sentiment == 'very negative' :
        return SentimentResponse(sentiment="bad")
    else:
        return SentimentResponse(sentiment="neutral")
