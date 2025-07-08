import json
import psycopg2

# Connect to Postgres
conn = psycopg2.connect(
    dbname="postgres",
    user="postgres",
    password="postgres",
    host="localhost",
    port=5432
)
cursor = conn.cursor()

# Example trait JSON structure:
#  "data": {
#     "TFTTutorial_Assassin": {
#       "id": "TFTTutorial_Assassin",
#       "name": "Assassin",
#       "image": {
#         "full": "Trait_Icon_Assassin.png",
#         "sprite": "tft-trait0.png",
#         "group": "tft-trait",
#         "x": 0,
#         "y": 0,
#         "w": 48,
#         "h": 48
#       }
#     },

cursor.execute("""
CREATE TABLE IF NOT EXISTS traits (
    trait_id     TEXT PRIMARY KEY,
    name         TEXT,
    image_full   TEXT,
    image_sprite TEXT,
    image_group  TEXT,
    image_x      INT,
    image_y      INT,
    image_w      INT,
    image_h      INT
);
""")


with open('/Volumes/workplace/my-app/src/riot_assets/15.12.1/data/en_US/tft-trait.json') as f:
    traits = json.load(f)["data"]

for trait_id, trait in traits.items():
    trait_id = trait["id"]
    name = trait["name"]
    image = trait["image"]
    image_full = image["full"]
    image_sprite = image["sprite"]
    image_group = image["group"]
    image_x, image_y, image_w, image_h = image["x"], image["y"], image["w"], image["h"]

    cursor.execute("""
        INSERT INTO traits (trait_id, name, image_full, image_sprite, image_group, image_x, image_y, image_w, image_h)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT (trait_id) DO NOTHING;
    """, (trait_id, name, image_full, image_sprite, image_group, image_x, image_y, image_w, image_h))

conn.commit()
cursor.close()
conn.close()