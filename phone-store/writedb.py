import os
import random
import string
import psycopg2

brands = [ 'Samsung', 'Apple', 'Google', 'OnePlus', 'Asus', 'Nokia', 'Xiaomi', 'Vivo', 'Oppo' ]
words = [ 'Call', 'Sky', 'Jet', 'Lumen', 'Bold', 'Glass', 'Gold' ]
superlatives = [ 'Pro', 'Plus', 'Pro+', 'Super', 'Ultra' ]

def generate_phone_name():
    brand_name = random.choice(brands)
    word = random.choice(words)    
    first_letter = random.choice(string.ascii_uppercase)
    second_letter = random.choice([*list(string.ascii_uppercase), *['']])
    number = random.choice(string.digits.replace('0', ''))
    extra = random.choice(superlatives) if random.random() < 0.2 else ''
    
    if brand_name == 'Samsung':
        word = random.choice([ 'Galaxy', 'Note', *words])
    elif brand_name == 'Google':
        word = 'Pixel'
    elif brand_name == 'Apple':
        word = 'iPhone'
        first_letter = random.choice(['s', 'c', 'SE', 'XS', 'X']) if random.random() < 0.2 else ''
        extra = random.choice(superlatives) if random.random() < 0.5 else ''
        return f'{brand_name} {word} {number}{first_letter} {extra}'

    return f'{brand_name} {word} {first_letter}{second_letter}{number} {extra}'

def generate_phones(n):
    phones = []
    for i in range(n):
        phones.append(generate_phone_name())
    return list(set(phones))