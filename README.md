# Student Management Web Application

A full-stack web application that demonstrates REST API usage with GET and POST methods. Built with Node.js/Express on the back end and plain HTML, CSS and JavaScript on the front end. Features a dark mode UI.

---

## Features

- **Q1 – Student List:** fetches all students via `GET /api/students` and displays them in a table
- **Q2 – Student Registration:** submits a new student via `POST /api/students` with a JSON body
- HTTP response codes handled on both pages (200, 201, 400, 404, 409, 500, network error)
- Dark mode styling throughout

---

## Project Structure

```
student-app/
├── package.json
├── server.js            # REST API + static file server
└── public/
    ├── index.html       # Q1 – Student list page (GET)
    ├── register.html    # Q2 – Registration form (POST)
    └── style.css        # Dark mode styles
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher

---

## Installation & Setup

```bash
# 1. Enter the project folder
cd student-app

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

The server runs on **http://localhost:3000** by default.

---

## Pages

| URL | Description |
|-----|-------------|
| `http://localhost:3000/index.html` | Student list (Q1) |
| `http://localhost:3000/register.html` | Registration form (Q2) |

---

## REST API Reference

### GET /api/students
Returns all students as a JSON array.

**Response: 200 OK**
```json
[
  { "id": 1, "name": "Asha Kumar", "email": "asha@example.com", "course": "Computer Science", "age": 20 }
]
```

---

### GET /api/students/:id
Returns a single student by ID.

| Status | Meaning |
|--------|---------|
| 200 | Student found |
| 404 | Student not found |

---

### POST /api/students
Adds a new student. Send the student details as a JSON body.

**Request body**
```json
{
  "name": "Ravi Menon",
  "email": "ravi@example.com",
  "course": "Electronics",
  "age": 21
}
```

| Status | Meaning |
|--------|---------|
| 201 Created | Student added successfully |
| 400 Bad Request | Missing/invalid fields or bad email format |
| 409 Conflict | Email already registered |

---

## HTTP Status Code Handling

Both pages handle all expected API responses and show the user a clear message:

| Code | Front-end behaviour |
|------|---------------------|
| 200 | Table rendered (or "no students found") |
| 201 | Green success message, form is cleared |
| 400 | Red error message with the reason from the API |
| 404 | Red error message — endpoint or resource not found |
| 409 | Red error message — duplicate email |
| 5xx | Red error message — server problem |
| Network failure | Red error message — server unreachable |

---

## Notes

- Student data is stored **in memory**. It resets when the server restarts.
- To point the front end at a different API, change the `API_URL` constant at the top of the `<script>` block in each HTML file.
