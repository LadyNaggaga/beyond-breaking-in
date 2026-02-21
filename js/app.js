/**
 * app.js — Home page: loads posts.json and renders post cards with tag filtering.
 */
(function () {
  const postList = document.getElementById('post-list');
  const tagsFilter = document.getElementById('tags-filter');

  fetch('./posts.json?v=' + Date.now())
    .then((res) => res.json())
    .then((posts) => {
      // Sort newest first
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Collect unique tags
      const allTags = [...new Set(posts.flatMap((p) => p.tags || []))].sort();

      if (allTags.length > 0) {
        tagsFilter.style.display = 'flex';
        allTags.forEach((tag) => {
          const btn = document.createElement('button');
          btn.className = 'tag-btn';
          btn.dataset.tag = tag;
          btn.textContent = tag;
          tagsFilter.appendChild(btn);
        });
      }

      renderPosts(posts);

      // Tag filtering
      tagsFilter.addEventListener('click', (e) => {
        if (!e.target.classList.contains('tag-btn')) return;

        tagsFilter.querySelectorAll('.tag-btn').forEach((b) => b.classList.remove('active'));
        e.target.classList.add('active');

        const tag = e.target.dataset.tag;
        if (tag === 'all') {
          renderPosts(posts);
        } else {
          renderPosts(posts.filter((p) => (p.tags || []).includes(tag)));
        }
      });
    })
    .catch(() => {
      postList.innerHTML = '<p class="loading">Could not load posts.</p>';
    });

  function renderPosts(posts) {
    if (posts.length === 0) {
      postList.innerHTML = '<p class="loading">No posts yet — check back soon!</p>';
      return;
    }

    postList.innerHTML = posts
      .map(
        (p) => `
      <div class="post-card">
        <a class="post-card-link" href="./post.html?slug=${encodeURIComponent(p.slug)}">
          <h2 class="post-card-title">${escapeHtml(p.title)}</h2>
          <p class="post-card-date">${formatDate(p.date)}</p>
          <p class="post-card-excerpt">${escapeHtml(p.excerpt)}</p>
          ${
            p.tags && p.tags.length
              ? `<div class="post-card-tags">${p.tags.map((t) => `<span class="post-tag">${escapeHtml(t)}</span>`).join('')}</div>`
              : ''
          }
        </a>
      </div>`
      )
      .join('');
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
})();
