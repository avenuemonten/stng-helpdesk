const express = require("express");
const router = express.Router();

// Главная страница helpdesk (пользователь)
router.get("/", (req, res) => {
  res.render("helpdesk", {
    username: "Zabolotskiy_DS",    // потом возьмём из AD/сессии
    role: "user",
  });
});

// Дашборд админа
router.get("/admin/dashboard", (req, res) => {
  res.render("admin-dashboard", {
    username: "Zabolotskiy_DS",
    role: "admin",
  });
});

// Настройки категорий
router.get("/admin/categories", (req, res) => {
  res.render("admin-categories", {
    username: "Zabolotskiy_DS",
    role: "admin",
  });
});

module.exports = router;
