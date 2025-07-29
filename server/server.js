// server.js - Express backend for SupportSpace
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const forumPosts = [
  {
    title: "How do you handle imposter syndrome?",
    author: "Anonymous",
    category: "Career Advice",
    tags: ["Imposter Syndrome", "Career Growth"],
    views: "2.1k",
    replies: 18
  },
  {
    title: "Best resources for advanced TypeScript patterns in 2025?",
    author: "Anonymous",
    category: "Technical",
    tags: ["TypeScript", "React", "Best Practices"],
    views: "5.8k",
    replies: 32
  },
  {
    title: "Negotiating a 4-day work week?",
    author: "Anonymous",
    category: "Work-Life Balance",
    tags: ["Negotiation", "Company Culture"],
    views: "12.3k",
    replies: 57
  }
];

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const DATA_FILE = path.join(__dirname, "../posts.json");

let posts = [];
if (fs.existsSync(DATA_FILE)) {
  posts = JSON.parse(fs.readFileSync(DATA_FILE));
}

app.get("/api/posts", (req, res) => {
  res.json(posts);
});

app.post("/api/posts", (req, res) => {
  const { message } = req.body;
  if (!message || message.length < 2) {
    return res.status(400).json({ error: "Message too short" });
  }

  const newPost = {
    id: Date.now(),
    message: message.trim(),
  };
  posts.unshift(newPost);

  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
  res.status(201).json({ success: true });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`),
);
