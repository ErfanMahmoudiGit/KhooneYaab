import torch
from transformers import MT5ForConditionalGeneration, MT5Tokenizer
import numpy as np

tokenizer = MT5Tokenizer.from_pretrained("persiannlp/mt5-base-parsinlu-sentiment-analysis")
model = MT5ForConditionalGeneration.from_pretrained("persiannlp/mt5-base-parsinlu-sentiment-analysis")


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


run_model(
  "خانه خیلی خوبی است و مناسب مشکل پسندان",
 "نظر شما در مورد خانه چیست؟"
)


run_model(
  "خانه  خوبی نیست و قدیمی بود",
 "نظر شما در مورد خانه چیست؟"
)
