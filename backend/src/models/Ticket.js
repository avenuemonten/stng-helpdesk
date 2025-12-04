// backend/src/models/Ticket.js
const db = require("./db");

async function getAllTickets() {
  const [rows] = await db.query(`
    SELECT
      t.id,
      t.title,
      t.description,
      t.author,
      t.priority,
      t.status,
      t.created_at,
      c.name AS category_name
    FROM tickets t
    LEFT JOIN categories c ON t.category_id = c.id
    ORDER BY t.created_at DESC
  `);
  return rows;
}

async function createTicket({ title, description, category_id, author, priority }) {
  await db.query(
    `INSERT INTO tickets (title, description, category_id, author, priority, status)
     VALUES (?, ?, ?, ?, ?, 'new')`,
    [title, description, category_id || null, author, priority || "normal"]
  );
}

module.exports = {
  getAllTickets,
  createTicket,
};