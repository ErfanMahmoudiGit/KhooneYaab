# realestate/genetic_algorithm.py
import random
import math
import numpy as np
from .models import Building

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

def initialize_population(size):
    return list(Building.objects.all()[:size])

def select_parents(population, fitnesses, num_parents):
    parents = random.choices(population, weights=fitnesses, k=num_parents)
    return parents

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

def mutate(individual, mutation_rate=0.01):
    if random.random() < mutation_rate:
        individual.meterage = random.uniform(10, 500)
    if random.random() < mutation_rate:
        individual.price = random.uniform(1_000_000_000, 100_000_000_000)
    if random.random() < mutation_rate:
        individual.build_date = random.choice(range(1900, 2024))
    if random.random() < mutation_rate:
        individual.rooms = random.choice(range(1, 21))
    if random.random() < mutation_rate:
        individual.facilities = [random.choice([0, 1]) for _ in range(3)]
    if random.random() < mutation_rate:
        individual.latitude = random.uniform(51.132826, 51.609179)
    if random.random() < mutation_rate:
        individual.longitude = random.uniform(35.608353, 35.779512)
    if random.random() < mutation_rate:
        individual.priorities = [random.choice([0, 1]) for _ in range(3)]

def genetic_algorithm(target, population_size=100, generations=100, mutation_rate=0.01):
    population = initialize_population(population_size)
    best_fit = None
    best_score = float('inf')
    
    for generation in range(generations):
        fitnesses = [calculate_fitness(individual, target) for individual in population]
        if min(fitnesses) < best_score:
            best_fit = population[fitnesses.index(min(fitnesses))]
            best_score = min(fitnesses)
        
        parents = select_parents(population, fitnesses, population_size // 2)
        population = []
        
        for i in range(population_size // 2):
            parent1, parent2 = random.sample(parents, 2)
            child1 = crossover(parent1, parent2)
            child2 = crossover(parent1, parent2)
            mutate(child1, mutation_rate)
            mutate(child2, mutation_rate)
            population.extend([child1, child2])
    
    return best_fit
