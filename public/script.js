const postsDiv = document.getElementById('posts');

async function loadPosts() {
  try {
    const res = await fetch('/api/posts');
    const posts = await res.json();

    if (!posts.length) {
      postsDiv.innerHTML = '<p>Žádné články nejsou k dispozici.</p>';
      return;
    }

    postsDiv.innerHTML = posts.map(p => `
      <div class="post">
        <h3>${p.title}</h3>
        <p>${p.content}</p>
        <small>${new Date(p.date).toLocaleString()}</small>
      </div>
    `).join('');
  } catch (err) {
    postsDiv.innerHTML = '<p style="color:red;">❌ Chyba při načítání článků z databáze.</p>';
    console.error(err);
  }
}

loadPosts();
