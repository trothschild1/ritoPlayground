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

cursor.execute("""
CREATE TABLE IF NOT EXISTS items (
    item_id      TEXT PRIMARY KEY,
    name         TEXT,
    image        text,
    image_full   text,
    image_sprite text,
    image_group  text,
    image_x      int,
    image_y      int,
    image_w      int,
    image_h      int
);
""")

## Example item JSON structure:
# "TFT_Item_BFSword": {
#       "id": "TFT_Item_BFSword",
#       "name": "B.F. Sword",
#       "image": {
#         "full": "TFT_Item_BFSword.png",
#         "sprite": "tft-item0.png",
#         "group": "tft-item",
#         "x": 192,
#         "y": 0,
#         "w": 48,
#         "h": 48
#       }
#     },

# Load your match JSON file
with open('/Volumes/workplace/my-app/src/riot_assets/15.12.1/data/en_US/tft-item.json') as f:
    items = json.load(f)["data"]

for item_id, item in items.items():
    name = item["name"]
    image = item["image"]
    image_full = image["full"]
    image_sprite = image["sprite"]
    image_group = image["group"]
    image_x, image_y, image_w, image_h = image["x"], image["y"], image["w"], image["h"]

    cursor.execute("""
        INSERT INTO items (item_id, name, image_full, image_sprite, image_group, image_x, image_y, image_w, image_h)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT (item_id) DO NOTHING;
    """, (item_id, name, image_full, image_sprite, image_group, image_x, image_y, image_w, image_h))

conn.commit()
cursor.close()
conn.close()