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
cur = conn.cursor()

def insert_champion(champion_id, data):
    cur.execute("""
        INSERT INTO champion (id, key, name, title, lore, blurb, partype, attack, defense, magic, difficulty)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT (id) DO NOTHING
    """, (
        champion_id,
        data.get('key'),
        data.get('name'),
        data.get('title'),
        data.get('lore', ''),
        data.get('blurb', ''),
        data.get('partype', ''),
        data['info']['attack'],
        data['info']['defense'],
        data['info']['magic'],
        data['info']['difficulty']
    ))

    # Image
    img = data['image']
    cur.execute("""
        INSERT INTO champion_image (champion_id, "full", sprite, grp, x, y, w, h)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """, (champion_id, img['full'], img['sprite'], img['group'], img['x'], img['y'], img['w'], img['h']))

    # Stats
    stats = data['stats']
    cur.execute("""
        INSERT INTO champion_stats (champion_id, hp, hpperlevel, mp, mpperlevel, movespeed, armor,
        armorperlevel, spellblock, spellblockperlevel, attackrange, hpregen, hpregenperlevel,
        mpregen, mpregenperlevel, crit, critperlevel, attackdamage, attackdamageperlevel,
        attackspeedperlevel, attackspeed)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (champion_id, *stats.values()))

    # Tags
    for tag in data.get('tags', []):
        cur.execute("INSERT INTO champion_tag (champion_id, tag) VALUES (%s, %s)", (champion_id, tag))

    # Ally tips
    for tip in data.get('allytips', []):
        cur.execute("INSERT INTO ally_tip (champion_id, tip) VALUES (%s, %s)", (champion_id, tip))

    # Enemy tips
    for tip in data.get('enemytips', []):
        cur.execute("INSERT INTO enemy_tip (champion_id, tip) VALUES (%s, %s)", (champion_id, tip))

    # Skins
    for skin in data.get('skins', []):
        cur.execute("""
            INSERT INTO skin (id, champion_id, num, name, chromas)
            VALUES (%s, %s, %s, %s, %s)
        """, (skin['id'], champion_id, skin['num'], skin['name'], skin['chromas']))

    # Passive
    p = data.get('passive', {})
    img = p.get('image', {})
    cur.execute("""
        INSERT INTO passive (champion_id, name, description, image_full, image_sprite, image_group, image_x, image_y, image_w, image_h)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (champion_id, p.get('name'), p.get('description'), img.get('full'), img.get('sprite'), img.get('group'), img.get('x'), img.get('y'), img.get('w'), img.get('h')))

    # Spells
    for s in data.get('spells', []):
        img = s.get('image', {})
        cur.execute("""
            INSERT INTO spell (
                id, champion_id, name, description, tooltip, maxrank, cooldown, cost, range,
                cooldown_burn, cost_burn, range_burn, cost_type, resource,
                image_full, image_sprite, image_group, image_x, image_y, image_w, image_h
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s,
                %s, %s, %s, %s, %s,
                %s, %s, %s, %s, %s, %s, %s
            )
        """, (
            s.get('id'), champion_id, s.get('name'), s.get('description'), s.get('tooltip'), s.get('maxrank'),
            s.get('cooldown'), s.get('cost'), s.get('range'), s.get('cooldownBurn'), s.get('costBurn'), s.get('rangeBurn'),
            s.get('costType'), s.get('resource'),
            img.get('full'), img.get('sprite'), img.get('group'), img.get('x'), img.get('y'), img.get('w'), img.get('h')
        ))

with open("/Volumes/workplace/my-app/src/riot_assets/15.12.1/data/en_US/champion.json") as f:
    champions_json = json.load(f)['data']

for champion_id, data in champions_json.items():
    insert_champion(champion_id, data)

conn.commit()
cur.close()
conn.close()