const express = require("express");
const router = express.Router();
const pool = require("../db");
const { v4: uuidv4 } = require("uuid");

router.post("/create", async (req, res) => {
  const { name, description, type, userId, duration, username } = req.body;

  if (!name || !type || !userId || !username) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const projectId = uuidv4();

  console.log("Generated Project UUID: ", projectId);

  try {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const sqlQuery = `
        INSERT INTO projects (project_id, name, description, type, duration, admin) 
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
      const values = [
        projectId,
        name,
        description,
        type,
        type === "Interview" ? duration : null,
        username,
      ];

      await client.query(sqlQuery, values);

      await client.query(
        "INSERT INTO project_users (projects_id, user_id, role) VALUES ($1, $2, $3)",
        [projectId, userId, "admin"]
      );

      await client.query("COMMIT");
      res.status(201).json({ projectId });
    } catch (err) {
      await client.query("ROLLBACK");
      console.error("Transaction Error: ", err);
      res.status(500).send("Server error during transaction");
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Connection Error: ", err);
    res.status(500).send("Server error unable to connect");
  }
});

router.post("/join", async (req, res) => {
  const { projectId, userId } = req.body;

  if (!projectId || !userId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const project = await pool.query(
      "SELECT * FROM projects WHERE project_id = $1",
      [projectId]
    );
    if (project.rowCount === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    const userInProject = await pool.query(
      "SELECT * FROM project_users WHERE projects_id = $1 AND user_id = $2",
      [projectId, userId]
    );
    if (userInProject.rowCount > 0) {
      return res.status(409).json({ message: "User already in project" });
    }

    await pool.query(
      "INSERT INTO project_users (projects_id, user_id) VALUES ($1, $2)",
      [projectId, userId]
    );
    res.status(200).json({ message: "User added to project" });
  } catch (error) {
    console.error("Join Error: ", error);
    res.status(500).send("Server error");
  }
});

router.post("/stop", async (req, res) => {
  const { projectId, languageId } = req.body;

  if (!projectId || !languageId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

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
    console.error("Stop Error: ", err);
    res.status(500).send("Server error");
  }
});

router.get("/:projectId/isAdmin/:userId", async (req, res) => {
  const { projectId, userId } = req.params;

  if (!projectId || !userId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  console.log(
    "Checking if user is admin - Project ID:",
    projectId,
    "User ID:",
    userId
  );

  try {
    const result = await pool.query(
      "SELECT admin FROM projects WHERE project_id = $1",
      [projectId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    const isAdmin = result.rows[0].admin === userId;
    res.status(200).json({ isAdmin });
  } catch (error) {
    console.error("IsAdmin Error: ", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
