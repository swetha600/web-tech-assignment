// server.js - Simple REST API + static file server
const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());                                  // parse JSON request bodies
app.use(express.static(path.join(__dirname, "public")));  // serve the front-end

// In-memory "database"
let students = [
  { id: 1, name: "Asha Kumar",  email: "asha@example.com",  course: "Computer Science", age: 20 },
  { id: 2, name: "Ravi Menon",  email: "ravi@example.com",  course: "Electronics",      age: 21 },
  { id: 3, name: "Meena Iyer",  email: "meena@example.com", course: "Mechanical",       age: 19 }
];
let nextId = 4;

// Q1: GET /api/students -> 200 OK with list of students
app.get("/api/students", (req, res) => {
  res.status(200).json(students);
});

// GET /api/students/:id -> 200 or 404
app.get("/api/students/:id", (req, res) => {
  const s = students.find(x => x.id === Number(req.params.id));
  if (!s) return res.status(404).json({ message: "Student not found" });
  res.status(200).json(s);
});

// Q2: POST /api/students -> 201 Created, 400 Bad Request, 409 Conflict
app.post("/api/students", (req, res) => {
  const { name, email, course, age } = req.body || {};

  if (!name || !email || !course || age === undefined || age === "") {
    return res.status(400).json({ message: "name, email, course and age are required" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  const ageNum = Number(age);
  if (!Number.isInteger(ageNum) || ageNum < 5 || ageNum > 100) {
    return res.status(400).json({ message: "Age must be a whole number between 5 and 100" });
  }
  if (students.some(s => s.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ message: "A student with this email already exists" });
  }

  const student = { id: nextId++, name: name.trim(), email: email.trim(), course: course.trim(), age: ageNum };
  students.push(student);
  res.status(201).json({ message: "Student registered successfully", student });
});

// Unknown API route -> 404 ; unexpected errors -> 500
app.use("/api", (req, res) => res.status(404).json({ message: "Endpoint not found" }));
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") return res.status(400).json({ message: "Malformed JSON" });
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
