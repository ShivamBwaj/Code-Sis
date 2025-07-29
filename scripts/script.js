document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = document.getElementById("message").value;
  await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  document.getElementById("message").value = "";
  loadPosts();
});

async function loadPosts() {
  const res = await fetch("/api/posts");
  const posts = await res.json();
  const wall = document.getElementById("wall");
  wall.innerHTML = posts.map(p => `<div class="post">${p.message}</div>`).join("");
}

loadPosts();
