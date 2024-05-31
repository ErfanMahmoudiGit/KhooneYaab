import random
import numpy as np
from .models import Building
import math

def calculate_fitness(building, target):
    price_diff = abs(building.price - target['price'])
    meterage_diff = abs(building.meterage - target['meterage'])
    build_date_diff = abs(building.build_date.year - target['build_date'])
    rooms_diff = abs(building.rooms - target['rooms'])
    
    facilities_score = sum([1 for f, t in zip(building.facilities, target['facilities']) if f == t == 1])
    
    distances = [
        math.sqrt((building.latitude - loc['latitude']) ** 2 + (building.longitude - loc['longitude']) ** 2)
        for loc in target['locations']
    ]
    distance_score = sum(distances)
    
    fitness = price_diff + meterage_diff + build_date_diff + rooms_diff - facilities_score + distance_score
    return fitness

def genetic_algorithm(target, population_size=100, generations=100):
    population = list(Building.objects.all())
    best_fit = None
    best_score = float('inf')
    
    for _ in range(generations):
        scores = [(building, calculate_fitness(building, target)) for building in population]
        scores.sort(key=lambda x: x[1])
        
        if scores[0][1] < best_score:
            best_fit = scores[0][0]
            best_score = scores[0][1]
        
        selected = scores[:population_size // 2]
        population = [b for b, _ in selected]
        
        for _ in range(population_size // 2):
            parent1, parent2 = random.sample(population, 2)
            child = crossover(parent1, parent2)
            population.append(child)
    
    return best_fit

def crossover(parent1, parent2):
    child = Building(
        meterage=random.choice([parent1.meterage, parent2.meterage]),
        price=random.choice([parent1.price, parent2.price]),
        build_date=random.choice([parent1.build_date, parent2.build_date]),
        rooms=random.choice([parent1.rooms, parent2.rooms]),
        facilities=random.choice([parent1.facilities, parent2.facilities]),
        latitude=random.choice([parent1.latitude, parent2.latitude]),
        longitude=random.choice([parent1.longitude, parent2.longitude]),
        priorities=random.choice([parent1.priorities, parent2.priorities]),
    )
    return child
