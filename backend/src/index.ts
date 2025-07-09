import express, { Request, Response } from "express";
import cors from "cors";
import pool from "./db"

const app = express();
const corsOptions = {
  origin: ["http://localhost:5173"]
};

// TODO's
// * replace Pool w/ Prisma
// * Figure out how to get NestJs working
// * Enabling logging ??
// * Singleton logs ?
// * Pagination & making endpoints more RESTFUL
// * More dynamic content: use RIOT API key?

app.use(express.json());
app.use(cors(corsOptions));

app.get("/get-all/items", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT item_id, name FROM tft_items");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/get-all/augments", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM tft_augments");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/get-all/champions", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT id, name, title, tag, image_splash FROM champion ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/get-all/skin-by-champion", async (req: Request, res: Response) => {
  const { champion } = req.query;

  try {
    const queryText = `
    SELECT champion_id as champion, s.name as skin_name, (t.champion_id || '_' || num || '.jpg') AS full_splash FROM skin s JOIN champion ch ON ch.id=s.champion_id
    ${champion ? "WHERE ch.id = $1" : ""}
    `;
    const queryValues = champion ? [champion] : [];

    const result = await pool.query(queryText, queryValues);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/get-all/spell-by-champion", async (req: Request, res: Response) => {
  const { champion } = req.query;
  try {
    const queryText = `SELECT ch.id as champion, s.id as spell_id, s.name as spell_name, description, cooldown, cost, s.image_full FROM spell s JOIN champion ch ON ch.id=s.champion_id
    ${champion ? "WHERE ch.id = $1" : ""}
    `;
    const queryValues = champion ? [champion] : [];

    const result = await pool.query(queryText, queryValues);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/get-all/stats-by-champion", async (req: Request, res: Response) => {
  const { champion } = req.query;

  try {
    let queryText = `SELECT ch.id AS champion, hp, mp, movespeed, armor, spellblock, hpregen, attackdamage, attackspeed FROM champion_stats s JOIN champion ch ON ch.id=s.champion_id
    `;

    const queryValues: string[] = [];

    if (champion) {
      queryText += ` WHERE ch.id ILIKE $1`;
      queryValues.push(`%${champion}%`);
    }
    const result = await pool.query(queryText, queryValues);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/get-all/stats", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT ch.id, s.* FROM champion_stats s JOIN champion ch ON ch.id=s.champion_id"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
