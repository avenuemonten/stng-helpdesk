const express = require("express");
const router = express.Router();

const Category = require("../models/Category");
const Ticket   = require("../models/Ticket");

/* ============================================================
   USER: Главная Helpdesk — список тикетов + категории
============================================================ */
router.get("/", async (req, res) => {
  try {
    const [tickets, categories] = await Promise.all([
      Ticket.getAllTickets(),
      Category.getAllCategories(),
    ]);

    res.render("helpdesk", {
      username: "Zabolotskiy_DS",
      role: "user",
      tickets,
      categories,
    });
  } catch (err) {
    console.error("Ошибка при загрузке helpdesk:", err);
    res.status(500).send("Ошибка при загрузке helpdesk");
  }
});

/* ============================================================
   USER: Создание тикета (POST)
============================================================ */
router.post("/tickets", async (req, res) => {
  try {
    const { title, description, category_id, priority } = req.body;

    await Ticket.createTicket({
      title,
      description,
      category_id: category_id || null,
      author: "Zabolotskiy_DS",
      priority: priority || "medium",
    });

    res.redirect("/");
  } catch (err) {
    console.error("Ошибка при создании тикета:", err);
    res.status(500).send("Ошибка создания тикета");
  }
});

/* ============================================================
   ADMIN: Dashboard
============================================================ */
router.get("/admin/dashboard", async (req, res) => {
  try {
    const tickets = await Ticket.getAllTickets();
    res.render("admin-dashboard", {
      username: "Zabolotskiy_DS",
      role: "admin",
      tickets,
    });
  } catch (err) {
    console.error("Ошибка dashboard:", err);
  }
});

/* ============================================================
   ADMIN: Список категорий
============================================================ */
router.get("/admin/categories", async (req, res) => {
  try {
    const categories = await Category.getAllCategories();
    res.render("admin-categories", {
      username: "Zabolotskiy_DS",
      role: "admin",
      categories,
    });
  } catch (err) {
    console.error("Ошибка категорий:", err);
    res.status(500).send("Ошибка при чтении категорий");
  }
});

/* ============================================================
   ADMIN: Создание категории (POST)
============================================================ */
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
    res.status(500).send("Ошибка создания категории");
  }
});

module.exports = router;
