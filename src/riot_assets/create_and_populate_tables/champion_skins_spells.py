import json
import psycopg2

conn = psycopg2.connect(
    dbname="postgres",
    user="postgres",
    password="postgres",
    host="localhost",
    port=5432
)
cur = conn.cursor()

with open("/Volumes/workplace/my-app/src/riot_assets/15.12.1/data/en_US/championFull.json") as f:
    blob = json.load(f)

for champ_id, data in blob["data"].items():
    # Insert skins
    for skin in data.get("skins", []):
        cur.execute("""
            INSERT INTO skin (champion_id, skin_id, num, name, chromas)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT DO NOTHING
        """, (champ_id, skin["id"], skin["num"], skin["name"], skin["chromas"]))

    # Insert spells
    for s in data.get("spells", []):
        img = s.get("image", {})
        cur.execute("""
            INSERT INTO spell (
                id, champion_id, name, description, tooltip, maxrank, cooldown, cost, range,
                cooldown_burn, cost_burn, range_burn, cost_type, resource,
                image_full, image_sprite, image_group, image_x, image_y, image_w, image_h
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s,
                      %s, %s, %s, %s, %s,
                      %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT DO NOTHING
        """, (
            s.get("id"), champ_id, s.get("name"), s.get("description"), s.get("tooltip"), s.get("maxrank"),
            s.get("cooldown"), s.get("cost"), s.get("range"), s.get("cooldownBurn"), s.get("costBurn"), s.get("rangeBurn"),
            s.get("costType"), s.get("resource"),
            img.get("full"), img.get("sprite"), img.get("group"), img.get("x"), img.get("y"), img.get("w"), img.get("h")
        ))

conn.commit()
cur.close()
conn.close()