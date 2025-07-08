const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:3000"]
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/get-all/items", async (req, res) => {
  try {
    const result = await pool.query("SELECT item_id, name FROM tft_items");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/get-all/augments", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tft_augments");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/get-all/champions", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT c.name, i.image_splash, title FROM champion c JOIN champion_image i ON c.id=i.champion_id"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/get-all/skin-by-champion", async (req, res) => {
  const { champion } = req.query;

  try {
    const queryText = `
    SELECT champion_id as champion, name, (champion_id || '_' || num || '.jpg') as full_splash FROM skin
    ${champion ? "WHERE champion_id = $1" : ""}
    `;
    const queryValues = champion ? [champion] : [];

    const result = await pool.query(queryText, queryValues);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/get-all/spell-by-champion", async (req, res) => {
  const { champion } = req.query;
  try {
    const queryText = `SELECT champion_id as champion, id, name, description, cooldown, cost, image_full from spell
    ${champion ? "WHERE champion_id = $1" : ""}
    `;
    const queryValues = champion ? [champion] : [];

    const result = await pool.query(queryText, queryValues);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/get-all/stats-by-champion", async (req, res) => {
  const { champion } = req.query;
  try {
    const queryText = `SELECT champion_id as champion, hp, mp, movespeed, armor, spellblock, hpregen, attackdamage, attackspeed FROM champion_stats
    ${champion ? "WHERE champion_id = $1" : ""}
    `;
    const queryValues = champion ? [champion] : [];

    const result = await pool.query(queryText, queryValues);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/get-all/stats", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM champion_stats");
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
