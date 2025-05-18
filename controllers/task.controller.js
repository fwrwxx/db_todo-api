const db = require("../models");
const Task = db.task;

// Створити нову задачу
exports.create = async (req, res) => {
  try {
    const { title, completed } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Поле 'title' обов'язкове!" });
    }

    const task = await Task.create({ title, completed });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Отримати всі задачі
exports.findAll = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Оновити задачу за ID
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Task.update(req.body, {
      where: { id: id }
    });

    if (updated) {
      const updatedTask = await Task.findByPk(id);
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: `Задачу з id=${id} не знайдено.` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Видалити задачу за ID
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Task.destroy({
      where: { id: id }
    });

    if (deleted) {
      res.json({ message: "Задачу видалено." });
    } else {
      res.status(404).json({ message: `Задачу з id=${id} не знайдено.` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
