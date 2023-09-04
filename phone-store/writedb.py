import os
import random
import string
import psycopg2

brands = [ 'Samsung', 'Apple', 'Google', 'OnePlus', 'Asus', 'Nokia', 'Xiaomi', 'Vivo', 'Oppo' ]
words = [ 'Call', 'Sky', 'Jet', 'Lumen', 'Bold', 'Glass', 'Gold' ]
superlatives = [ 'Pro', 'Plus', 'Pro+', 'Super', 'Ultra' ]
images_dir = 'phones/'

def generate_phone_name():
    brand_name = random.choice(brands)
    word = random.choice(words)    
    first_letter = random.choice(string.ascii_uppercase) if random.random() > 0.1 else ''
    second_letter = random.choice(string.ascii_uppercase) if random.random() > 0.1 else ''
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
        return (f'{word} {number}{first_letter} {extra}'.strip(), brand_name)

    return (f'{word} {first_letter}{second_letter}{number} {extra}'.strip(), brand_name)

def generate_phones(n):
    phones = []
    for i in range(n):
        phones.append(generate_phone_name())
    return list(set(phones))

def generate_prices(n):
    prices = []
    # 6k to 10k
    # 10k to 20k
    # 20k to 30k
    # 30k+
    for i in range(n):
        if random.random() < 0.1:
            prices.append(random.randint(30, 90) * 1000 + random.choice([999, 998]))
        elif random.random() < 0.25:
            prices.append(random.randint(20, 30) * 1000 + random.choice([999, 998]))
        elif random.random() < 0.5:
            prices.append(random.randint(6, 10) * 1000 + random.choice([999, 998]))
        else:
            prices.append(random.randint(10, 20) * 1000 + random.choice([999, 998]))
    return prices

phones = generate_phones(100)
prices = generate_prices(len(phones))

con = psycopg2.connect(
        host=os.environ['POSTGRE_DB_HOST'],
        port=25060,
        database="defaultdb",
        user=os.environ['POSTGRE_DB_USERNAME'],
        password=os.environ['POSTGRE_DB_PASSWORD'])

cur = con.cursor()

if os.getenv('WRITEDB_LOGGING') == 'true':
    print('Previous data:')
    cur.execute("CREATE OR REPLACE FUNCTION select_phone_models() RETURNS TABLE(brand varchar(32), model text, price int, image varchar(50)) AS $$ "
    "BEGIN "
        "IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'phone_models') THEN"
        "    RETURN QUERY SELECT * FROM \"phone_models\";"
        "END IF;"
    "END; $$ LANGUAGE plpgsql; SELECT select_phone_models();")
    previous_data = cur.fetchall()
    print(previous_data)

print('Dropping table...\n')
cur.execute('DROP TABLE IF EXISTS phone_models;')
cur.execute('CREATE TABLE phone_models ('
    'brand varchar(32),'
    'model text NOT NULL,'
    'price int NOT NULL,'
    'image varchar(50));')

for phone, price in zip(phones, prices):
    image = random.choice(os.listdir(f'public/{images_dir}'))
    print(f'Running {phone[1]} {phone[0]}; ₹{price} - {image}')
    cur.execute('INSERT INTO phone_models (brand, model, price, image)'
                'VALUES (%s, %s, %s, %s)',
                (phone[1], phone[0], price, image)
    )

con.commit()
cur.close()
con.close()
print('done')