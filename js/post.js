/**
 * post.js — Individual post page: reads ?slug= from URL, fetches the
 * corresponding .md file, and renders it with marked.js.
 */
(function () {
  const container = document.getElementById('post-content');
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');

  if (!slug) {
    container.innerHTML = '<p class="loading">No post specified.</p>';
    return;
  }

  // Load post metadata + markdown in parallel
  Promise.all([
    fetch('./posts.json').then((r) => r.json()),
    fetch(`./posts/${slug}.md`).then((r) => {
      if (!r.ok) throw new Error('Not found');
      return r.text();
    }),
  ])
    .then(([posts, md]) => {
      const meta = posts.find((p) => p.slug === slug);
      const title = meta ? meta.title : slug;
      const date = meta ? meta.date : '';
      const tags = meta && meta.tags ? meta.tags : [];

      document.title = `${title} — Beyond Breaking In`;

      const html = marked.parse(md);

      container.innerHTML = `
        <div class="post-header">
          <div class="post-title-row">
            <h1>${escapeHtml(title)}</h1>
            <img src="./images/logo.png" alt="" class="post-title-logo">
          </div>
          <p class="post-meta">
            ${date ? formatDate(date) : ''}
            ${tags.length ? ' · ' + tags.map((t) => `<span class="post-tag">${escapeHtml(t)}</span>`).join(' ') : ''}
          </p>
        </div>
        <div class="post-body">${html}</div>
      `;
    })
    .catch(() => {
      container.innerHTML = '<p class="loading">Post not found.</p>';
    });

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
