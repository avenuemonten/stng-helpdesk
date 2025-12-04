const db = require("./db");

async function getAllCategories() {
  const [rows] = await db.query(
    "SELECT id, name, queue_name, sla_hours, is_active FROM categories ORDER BY id ASC"
  );
  return rows;
}

async function createCategory({ name, queue_name, sla_hours, is_active }) {
  await db.query(
    "INSERT INTO categories (name, queue_name, sla_hours, is_active) VALUES (?, ?, ?, ?)",
    [name, queue_name, sla_hours || 8, is_active ? 1 : 0]
  );
}

module.exports = {
  getAllCategories,
  createCategory,
};