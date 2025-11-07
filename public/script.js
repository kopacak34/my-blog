const form = document.getElementById('form');
const postsDiv = document.getElementById('posts');

async function loadPosts() {
  try {
    const res = await fetch('/api/posts');
    const posts = await res.json();

    postsDiv.innerHTML = posts.map(p => `
      <div class="post">
        <h3>${p.title}</h3>
        <p>${p.content}</p>
        <small>${new Date(p.date).toLocaleString()}</small>
      </div>
    `).join('');
  } catch (err) {
    postsDiv.innerHTML = '<p style="color:red;">Chyba při načítání článků.</p>';
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();

  if (!title || !content) return;

  await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });

  form.reset();
  loadPosts();
});

loadPosts();
