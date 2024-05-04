const express = require("express");
const { Task } = require("./module");

const router = express.Router();

router.get("/Crud_task", async (req, res) => {
  try {
    const data = await Task.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/Crud_task", async (req, res) => {
  const { content, description } = req.body; // Corrected Description to description
  const newTask = Task.build({
    content: content,
    description: description,
  });
  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/Crud_task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/Crud_task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content, description } = req.body;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    task.content = content;
    task.description = description;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/Crud_task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    await task.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
