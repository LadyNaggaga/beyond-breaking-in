# ✏️ My Blog

A minimal, sketch-styled personal blog powered by plain HTML, CSS, and vanilla JavaScript. Hosted on GitHub Pages.

## Quick Start

1. Clone / fork this repo.
2. Push to a repo named `<your-username>.github.io` (or enable GitHub Pages on the `main` branch).
3. Visit your site!

## How to Add a New Post

Adding a post takes two steps:

### 1. Write the Markdown file

Create a new `.md` file in the `/posts` directory. The filename should be a URL-friendly slug:

```
posts/my-new-post.md
```

Write your post using standard Markdown — headings, lists, code blocks, images, etc.

### 2. Add an entry to `posts.json`

Open `posts.json` and add a new object to the array:

```json
{
  "slug": "my-new-post",
  "title": "My New Post Title",
  "date": "2026-03-15",
  "excerpt": "A short one-liner that appears on the home page.",
  "tags": ["tutorial", "javascript"]
}
```

| Field     | Description                                      |
| --------- | ------------------------------------------------ |
| `slug`    | Filename without `.md` — used in the URL         |
| `title`   | Post title displayed on the home page and post   |
| `date`    | `YYYY-MM-DD` format — posts are sorted by this   |
| `excerpt` | Short description shown on the home page card    |
| `tags`    | Array of tag strings for filtering (can be empty) |

### 3. Push

```bash
git add posts/my-new-post.md posts.json
git commit -m "Add new post: My New Post Title"
git push
```

That's it. No build step required.

## File Structure

```
├── index.html          # Home page
├── post.html           # Post template (renders Markdown)
├── about.html          # About page
├── posts.json          # Post manifest (source of truth)
├── css/
│   └── style.css       # All styles
├── js/
│   ├── app.js          # Home page logic
│   └── post.js         # Post page logic
├── posts/
│   ├── hello-world.md
│   └── markdown-features-demo.md
├── images/             # Put your images here
└── README.md
```

## Local Development

No build tools needed. Just serve the files with any static server:

```bash
# Python
python3 -m http.server 8000

# Node.js (npx)
npx serve .

# Or just open index.html in your browser
# (note: fetch() won't work with file:// — use a server)
```

## Customization

- **Site title / name**: Edit the `<title>` tags and `.nav-logo` text in the HTML files.
- **Colors & fonts**: Tweak CSS custom properties at the top of `css/style.css`.
- **About page**: Edit `about.html` with your info, photo, and links.
- **Footer**: Update the footer text in each HTML file.

## License

Do whatever you want with it. It's your blog. ✌️
