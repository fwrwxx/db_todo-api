const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Підключення до бази через Sequelize
const db = require("./models");

db.sequelize.authenticate()
  .then(() => {
    console.log("Підключено до MySQL успішно!");
  })
  .catch(err => {
    console.error("Помилка підключення:", err);
  });

// Синхронізація моделі Task
db.sequelize.sync()
  .then(() => {
    console.log("Таблиця Task створена.");
  })
  .catch(err => {
    console.error("Помилка синхронізації:", err);
  });

// Початковий маршрут
app.get("/", (req, res) => {
  res.json({ message: "Успіхів з TODO API!" });
});

const taskRoutes = require("./routes/task.routes.js");
app.use("/api/tasks", taskRoutes);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
