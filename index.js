const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// In-memory database
const users = [
  { email: "test@example.com", password: "test123" } // ✅ DEBUG TEST USER
];


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from public/

// Serve login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Handle login/signup
app.post("/auth", (req, res) => {
  const { email, password, mode } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (mode === "signup") {
    const exists = users.find((u) => u.email === email);
    if (exists) return res.status(409).json({ message: "User already exists" });

    users.push({ email, password });
    return res.status(201).json({ message: "Signup successful" });
  }

  // Login
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  // ✅ On successful login, respond OK
  return res.json({ message: "Login successful", email: user.email });

});
app.get("/api/forums", (req, res) => {
  res.json(forumPosts);
});

app.post("/api/forums", (req, res) => {
  const { title, category, tags } = req.body;
  if (!title || !category) {
    return res.status(400).json({ message: "Title and category are required" });
  }

  const newPost = {
    title,
    author: "Anonymous",
    category,
    tags: tags || [],
    views: "0",
    replies: 0,
  };

  forumPosts.unshift(newPost); // add to top
  res.status(201).json({ message: "Post added", post: newPost });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
