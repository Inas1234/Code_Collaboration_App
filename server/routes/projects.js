const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/create", async (req, res) => {
  const { name, description, type, userId, duration } = req.body;
  try {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const sqlQuery = `
        INSERT INTO projects (name, description, type, duration) 
        VALUES ($1, $2, $3, $4) RETURNING project_id
      `;
      const values = [
        name,
        description,
        type,
        type === "Interview" ? duration : null,
      ];

      const newProject = await client.query(sqlQuery, values);
      const projectId = newProject.rows[0].project_id;

      await client.query(
        "INSERT INTO project_users (project_id, user_id) VALUES ($1, $2)",
        [projectId, userId]
      );

      await client.query("COMMIT");
      res.status(201).json({ projectId });
    } catch (err) {
      await client.query("ROLLBACK");
      console.error(err);
      res.status(500).send("Server error during transaction");
    } finally {
      client.release();
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error unable to connect");
  }
});

router.post("/join", async (req, res) => {
  const { projectId, userId } = req.body;
  try {
    const project = await pool.query(
      "SELECT * FROM projects WHERE project_id = $1",
      [projectId]
    );
    if (project.rowCount === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    const userInProject = await pool.query(
      "SELECT * FROM project_users WHERE project_id = $1 AND user_id = $2",
      [projectId, userId]
    );
    if (userInProject.rowCount > 0) {
      return res.status(409).json({ message: "User already in project" });
    }

    await pool.query(
      "INSERT INTO project_users (project_id, user_id) VALUES ($1, $2)",
      [projectId, userId]
    );
    res.status(200).json({ message: "User added to project" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.post("/stop", async (req, res) => {
  const { projectId, languageId } = req.body;
  try {
    const updateLanguage = await pool.query(
      "UPDATE projects SET language_id = $1 WHERE project_id = $2 RETURNING *",
      [languageId, projectId]
    );
    if (updateLanguage.rows.length > 0) {
      res.status(200).json(updateLanguage.rows[0]);
    } else {
      res.status(404).send("Project not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
