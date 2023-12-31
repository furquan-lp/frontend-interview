import os
import random
import string
import psycopg2
import google.generativeai as palm
import time

brands = [ 'Samsung', 'Apple', 'Google', 'OnePlus', 'Asus', 'Nokia', 'Xiaomi', 'Vivo', 'Oppo' ]
words = [ 'Call', 'Sky', 'Jet', 'Lumen', 'Bold', 'Glass', 'Gold' ]
superlatives = [ 'Pro', 'Plus', 'Pro+', 'Super', 'Ultra' ]
images_dir = 'phones/'

palm.configure(api_key=os.environ['WRITEDB_PALM_API_KEY'])
aimodels = [m for m in palm.list_models() if 'generateText' in m.supported_generation_methods]
ai = aimodels[0].name
print(f'Using LLM {ai}.')

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

def generate_phone_desc(brand, phone_model, price, ai):
    prompt = """
    Generate a brief description spanning about 5 lines for a (fictional) mobile phone named '%s' by
    %s which costs about %d INR. Do not use bullet points. Do not include the cost in the description.
    """
    completion = palm.generate_text(
        model=ai,
        prompt=prompt % (phone_model, brand, price),
        temperature=0,
        max_output_tokens=800,
    )
    return completion.result

def generate_phone_ids(phones, prices):
    ids = []
    for i in range(len(phones)):
        ids.append(f'{phones[i][0]}{phones[i][1]}_{prices[i]}_{i}'.replace(' ', '_'))
    return ids

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
    # 30k to 90k
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

def generate_phone_descriptions(phones, prices, ai):
    descs = []
    print('Prompting for descriptions...')
    for i in range(len(phones)):
        descs.append(generate_phone_desc(phones[i][1], phones[i][0], prices[i], ai))
        if ((i+1) % 90 == 0):
            print('Sleeping at %d\r' % i)
            time.sleep(60)
    return descs

phones = generate_phones(100)
prices = generate_prices(len(phones))
prices.sort()
ids = generate_phone_ids(phones, prices)
descriptions = generate_phone_descriptions(phones, prices, ai)

con = psycopg2.connect(
        host=os.environ['POSTGRES_DB_HOST'],
        port=os.environ['POSTGRES_DB_PORT'],
        database=os.environ['POSTGRES_DB_NAME'],
        user=os.environ['POSTGRES_DB_USERNAME'],
        password=os.environ['POSTGRES_DB_PASSWORD'])

cur = con.cursor()

if os.getenv('WRITEDB_LOGGING') == 'true':
    print('Previous data:')
    cur.execute("CREATE OR REPLACE FUNCTION select_phone_models() RETURNS TABLE(id varchar(50), brand varchar(32), model text, price int, image varchar(50), description text) AS $$ "
    "BEGIN "
        "IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'phone_models') THEN"
        "    RETURN QUERY SELECT * FROM \"phone_models\";"
        "END IF;"
    "END; $$ LANGUAGE plpgsql; SELECT select_phone_models();")
    previous_data = cur.fetchall()
    print(previous_data)

print('Dropping tables...\n')
cur.execute('DROP TABLE IF EXISTS phone_models;')
cur.execute('DROP TABLE IF EXISTS phone_metadata;')
cur.execute('CREATE TABLE phone_models ('
    'id varchar(50) PRIMARY KEY,'
    'brand varchar(32),'
    'model text NOT NULL,'
    'price int NOT NULL,'
    'description text,'
    'image varchar(50));')
cur.execute('CREATE TABLE phone_metadata ('
    'brands varchar[] NOT NULL,'
    'words varchar[] NOT NULL,'
    'superlatives varchar[] NOT NULL,'
    'image_files varchar[]);')

for phone, price, id, description in zip(phones, prices, ids, descriptions):
    image = random.choice(os.listdir(f'public/{images_dir}'))
    print(f'Running {phone[1]} {phone[0]}; ₹{price} - {image}; id: {id}')
    cur.execute('INSERT INTO phone_models (id, brand, model, price, image, description)'
                'VALUES (%s, %s, %s, %s, %s, %s)',
                (id, phone[1], phone[0], price, image, description))

brands_string = '{{"{0}"}}'.format('", "'.join(brands))
words_string = '{{"{0}"}}'.format('", "'.join(words))
superlatives_string = '{{"{0}"}}'.format('", "'.join(superlatives))
image_files_string = '{{"{0}"}}'.format('", "'.join(os.listdir(f'public/{images_dir}')))
print('Running', brands_string, words_string, superlatives_string, image_files_string)
cur.execute('INSERT INTO phone_metadata (brands, words, superlatives, image_files)'
            'VALUES (%s, %s, %s, %s)',
            (brands_string, words_string, superlatives_string, image_files_string))

con.commit()
cur.close()
con.close()

print('done')