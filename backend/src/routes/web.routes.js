const Category = require("../models/Category");
const express = require("express");
const router = express.Router();

// Настройки категорий (GET)
router.get("/admin/categories", async (req, res) => {
  try {
    const categories = await Category.getAllCategories();
    res.render("admin-categories", {
      username: "Zabolotskiy_DS",
      role: "admin",
      categories,
    });
  } catch (err) {
    console.error("Ошибка при чтении категорий:", err);
    res.status(500).send("Ошибка при чтении категорий");
  }
});

// Создание категории (POST)
router.post("/admin/categories", async (req, res) => {
  try {
    const { name, queue_name, sla_hours } = req.body;
    const is_active = req.body.is_active ? 1 : 0;

    await Category.createCategory({
      name,
      queue_name,
      sla_hours,
      is_active,
    });

    res.redirect("/admin/categories");
  } catch (err) {
    console.error("Ошибка при создании категории:", err);
    res.status(500).send("Ошибка при создании категории");
  }
});

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
