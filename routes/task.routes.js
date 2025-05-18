const express = require("express");
const router = express.Router();
const tasks = require("../controllers/task.controller.js");

router.post("/", tasks.create);         // Створити задачу
router.get("/", tasks.findAll);         // Отримати всі задачі
router.put("/:id", tasks.update);       // Оновити задачу за id
router.delete("/:id", tasks.delete);    // Видалити задачу за id

module.exports = router;
