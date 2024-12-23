const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const db = new sqlite3.Database(":memory:");

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Verilənlər bazasında cədvəl yaratmaq
db.serialize(() => {
  db.run(`
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL
        )
    `);
  console.log("Users cədvəli yaradıldı.");
});

app.post("/addUser", (req, res) => {
  const { name, email } = req.body;
  const query = `INSERT INTO users (name, email) VALUES ('${name}', '${email}')`; // SQL injection
  db.run(query, function (err) {
    if (err) {
      return res.status(500).json({ message: "Xəta: " + err.message });
    }
    res.json({ message: "İstifadəçi əlavə edildi!", id: this.lastID });
  });
});

app.get("/getUsers", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Xəta: " + err.message });
    }
    res.json(rows);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server işləyir: http://localhost:${PORT}`);
});
