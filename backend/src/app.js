const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessions
app.use(session({
  secret: "stng-help-secret",
  resave: false,
  saveUninitialized: false,
}));

// Static files (public)
app.use(express.static(path.join(__dirname, "../public")));

// Set EJS views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Web routes
const webRoutes = require("./routes/web.routes");
app.use("/", webRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("STNG Helpdesk backend работает!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
