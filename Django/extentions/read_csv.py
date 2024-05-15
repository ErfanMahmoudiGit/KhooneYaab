import pandas as pd
import os

#print("Current Working Directory:", os.getcwd())
df = pd.read_csv('Django/extentions/buildings.csv')

print(df.head())