/**
 * Solene-OS CMS Backend Server
 * ------------------------------------
 * This Express server handles:
 *  - Blogs API (GET, POST)
 *  - Notes API (GET, POST)
 *  - JSON file read/write
 *
 * This backend currently uses JSON files as storage,
 * but the structure allows easy migration to MongoDB/PostgreSQL later.
 *
 * Author: Solène Sun
 */


const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");

require("dotenv").config(); // Load ADMIN_PASSWORD & JWT_SECRET from backend/.env



const app = express();
const PORT = 4000;

// ------------------------------------
//  CORS CONFIGURATION
//  Allows the React frontend to talk to this backend
// ------------------------------------
app.use(cors( {
  origin: "*", // next for netlify
  methods:["GET", "POST"],
}) 
);

//Parse JSON request body
app.use(express.json());

// Make /uploads folder publicly accessible
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ------------------------------------
//  IMAGE UPLOAD HANDLER
// ------------------------------------

// Configue multer for file uploads (if needed in future)
const upload = multer({ dest: path.join(__dirname, "uploads/") });

// Image Upload API
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// ------------------------------------
//  Helper functions for JSON data storage
// ------------------------------------
/**
 * Returns absolute path to a data file
 */

function getDataFilePath(filename) {
  return path.join(__dirname, "data", filename);
}

/**
 * Reads JSON data from a file
 */
function readJSON(filename) {
  const filePath = getDataFilePath(filename);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  if (!raw.trim()) {
    return [];
  }
  return JSON.parse(raw);
}

/**
 * Writes JSON data to a file
 */
function writeJSON(filename, data) {
  const filePath = getDataFilePath(filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// ------------------------------------
//  Health Check Endpoint
// ------------------------------------

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Solene-OS Backend is running." });
});

// --------------------------------------------------------
//  AUTH MIDDLEWARE — PROTECTS ADMIN ROUTES
// --------------------------------------------------------
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "Authorization header missing" });

  const token = authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ error: "Token not provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ error: "Invalid or expired token" });

    req.user = decoded; // Token payload
    next();
  });
}

// --------------------------------------------------------
//  ADMIN LOGIN — RETURNS JWT TOKEN
// --------------------------------------------------------
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  const adminUser = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUser || !adminPassword) {
    return res.status(500).json({ error: "Server missing admin credentials" });
  }

  if (username !== adminUser || password !== adminPassword) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const token = jwt.sign({ role: "admin", username }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token });
});


// ------------------------------------
//  BLOGS API
// ------------------------------------

// Get all blog posts
app.get("/api/blogs", (req, res) => {
  const blogs = readJSON("blogs.json");
  res.json(blogs);
});


// Create a new blog post
app.post("/api/blogs", auth, (req, res) => {
  const { title, content, coverImage } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required." });
  }

  const blogs = readJSON("blogs.json");

  const newBlog = {
    id: Date.now(),
    title,
    content,
    coverImage: coverImage || "",
    createdAt: new Date().toISOString(),
  };

  blogs.push(newBlog);
  writeJSON("blogs.json", blogs);

  res.status(201).json(newBlog);
});

// Get a single blog post by ID
app.get("/api/blogs/:id", (req, res) => {
  const blogs = readJSON("blogs.json");
  const blog = blogs.find(b => b.id == req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "Blog post not found." });
  }
  res.json(blog);
});

// ------------------------------------
//  CONTACT FORM API — sends email using Brevo
// ------------------------------------
app.post("/api/contact", async (req, res) => {
  try {
    await sendMail(req.body);
    res.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});



// ------------------------------------
//  NOTES API
// ------------------------------------

// Get all notes
app.get("/api/notes", (req, res) => {
  const notes = readJSON("notes.json");
  res.json(notes);
});

// Create a new note
app.post("/api/notes", auth, (req, res) => {
  const { title, content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Title and content are required." });
  }
  const notes = readJSON("notes.json");

  const newNote = {
    id: Date.now(),
    title: title || "",
    content,
    createdAt: new Date().toISOString(),
  };

  notes.push(newNote);
  writeJSON("notes.json", notes);

  res.status(201).json(newNote);
});

// ------------------------------------
//  Start Server
// ------------------------------------
app.listen(PORT, () => {
  console.log(`Solene-OS Backend Server is running on http://localhost:${PORT}`);
});


