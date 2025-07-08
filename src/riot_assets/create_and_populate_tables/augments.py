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

# Example augment JSON structure:
#  "data": {
#     "TFTTutorial_Augment_BackRowAS1": {
#       "id": "TFTTutorial_Augment_BackRowAS1",
#       "name": "Swift Strike",
#       "description": "Combat start: Your champions in the back 2 rows gain 20 Attack Speed.",
#       "image": {
#         "full": "Tutorial-Swift-Strike-I.png",
#         "sprite": "tft-augment0.png",
#         "group": "tft-augment",
#         "x": 48,
#         "y": 0,
#         "w": 48,
#         "h": 48
#       }
#     },

cursor.execute("""
CREATE TABLE IF NOT EXISTS augments (
    augment_id   TEXT PRIMARY KEY,
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


with open('/Volumes/workplace/my-app/src/riot_assets/15.12.1/data/en_US/tft-augments.json') as f:
    augments = json.load(f)["data"]

for augment_id, augment in augments.items():
    augment_id = augment["id"]
    name = augment["name"]
    image = augment["image"]
    image_full = image["full"]
    image_sprite = image["sprite"]
    image_group = image["group"]
    image_x, image_y, image_w, image_h = image["x"], image["y"], image["w"], image["h"]

    cursor.execute("""
        INSERT INTO augments (augment_id, name, image_full, image_sprite, image_group, image_x, image_y, image_w, image_h)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT (augment_id) DO NOTHING;
    """, (augment_id, name, image_full, image_sprite, image_group, image_x, image_y, image_w, image_h))

conn.commit()
cursor.close()
conn.close()