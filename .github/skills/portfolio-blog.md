# Skill: Portfolio Blog Post

Use this skill whenever the user asks to write, draft, or publish a new blog post for the portfolio site (paulvisciano.com / repo `paulvisciano/portfolio`).

## Goal
Ship a clean, fast blog post with minimal tool calls. No placeholder files, no overwriting `index.html`, no multi-step surgery on the homepage.

## Hard rules (learned from mistakes)
1. **Never** write a placeholder or temporary version of `index.html`.
2. **Never** overwrite `index.html` to "fix" a card. If a homepage card is needed, do a single targeted edit on a branch — insert one `<a class="blog-card">...</a>` block in the right spot, then stop.
3. Prefer **one** `create_or_update_file` (or `push_files`) call for the blog HTML. Do not chain create-branch → update-file → create-PR → merge when a direct file write on `main` is enough and the user didn't ask for review.
4. **Always go through the PR process.** Even if the user says "just publish it," create a branch, push the file(s), open a PR against `main`, and stop. Do **not** merge unless the user explicitly says to merge. This gives them a chance to review the diff.
5. If the user explicitly asks for a PR, create the branch, push the file, open the PR — but still keep it to those three calls. No extra reads or rewrites.
6. Do not re-derive or re-apply homepage changes after a restore. One edit, done.
7. **Always include a live preview link** in the PR body so the post can be reviewed in a browser before merge.

## Workflow
1. **Read the template once** (cache it for the session):
   - `blog/beyond-the-chatbot.html` — structure, head tags, header, article, footer, scripts.
   - `blog/blog.css` and `blog/section-nav.css` are shared; do not copy them.
2. **Write the HTML** matching the template exactly:
   - `<title>`, meta description, og/twitter tags, canonical URL.
   - Sticky header with brand + "Blogs" link.
   - `<nav class="section-nav">` progress bar.
   - `<article>` with `.series`, `h1`, `.deck`, content, `.callout` for key lines, `.links`, `.more`, footer.
   - Scripts: `analytics.js` + `section-nav.js` at the bottom.
3. **Delivery (PR required):**
   - Create branch `blog/<slug>` from `main`.
   - Push `blog/<slug>.html` to that branch.
   - Open PR: title = post title, body = one-line summary + **live preview link** (see below), base = `main`, head = `blog/<slug>`.
   - Report the PR URL. Stop. Do not merge.
4. **Homepage card** (only if asked or clearly expected): one insertion of a `.blog-card` in the `#blog .blog-grid`, placed near the top, on the same branch. No other homepage edits.
5. **Stop.** Report the PR URL. Do not offer follow-ups unless useful.

## Live preview link (required in every PR)
Because the site is static HTML, a branch push does not automatically produce a public URL. Generate one of these and paste it into the PR body under a "Preview" heading:

- **Preferred:** Deploy the branch to a Vercel preview and use that deployment URL. Command shape:
  `vercel deploy --prebuilt` is not available here; instead use the Vercel MCP `deploy_to_vercel` tool with `target: "preview"`, project name `portfolio`, and the single blog HTML file (plus any shared assets the page needs, e.g. `blog.css`, `section-nav.css`, `analytics.js`, `section-nav.js` if referenced). Use the returned preview URL.
- **Fallback:** If Vercel deploy is unavailable, use the raw GitHub URL for the file on the branch:
  `https://raw.githubusercontent.com/paulvisciano/portfolio/blog/<slug>/<slug>.html`
  Note: raw HTML may render without styles; prefer the Vercel preview when possible.

Always include the link, even if it is the raw fallback. Label it clearly so the reviewer can open it in a browser.

## Template skeleton (fill in, don't reinvent)
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{Title} — Paul Visciano · Sci-Fi Labs</title>
  <meta name="description" content="{one-line summary}">
  <meta name="theme-color" content="#0a0a0a">
  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="icon" href="/favicon-48.png" type="image/png" sizes="48x48">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
  <meta property="og:type" content="article">
  <meta property="og:title" content="{Title}">
  <meta property="og:description" content="{deck}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{Title}">
  <meta name="twitter:description" content="{deck}">
  <link rel="canonical" href="https://paulvisciano.com/blog/{slug}">
  <link rel="stylesheet" href="blog.css">
  <link rel="stylesheet" href="section-nav.css">
</head>
<body>
  <header class="top">
    <div class="top-inner">
      <a class="brand" href="../index.html">Paul Visciano</a>
      <a href="../index.html#blog">Blogs</a>
    </div>
  </header>
  <nav class="section-nav" aria-label="Sections">
    <div class="progress"><div class="progress-bar"></div></div>
  </nav>
  <article>
    <p class="series">{Tag · Category}</p>
    <h1>{Title}</h1>
    <p class="deck">{Deck — one or two sentences.}</p>

    <div class="callout">{Key insight in one line.}</div>

    <!-- sections: h2 + p, use .callout sparingly -->

    <div class="links">
      <a href="{related}.html">{Related}</a>
      <a href="../index.html#blog">All blogs</a>
    </div>
    <div class="more">
      <h3>More from Sci-Fi Labs</h3>
      <a href="{a}.html">{A} →</a>
      <a href="{b}.html">{B} →</a>
    </div>
  </article>
  <footer>
    Sci-Fi Labs · Spatial apps for web, mobile, and XR · <a href="../index.html" style="color:inherit">paulvisciano.com</a>
  </footer>
<script src="analytics.js" defer></script>
<script src="section-nav.js" defer></script>
</body>
</html>
```

## Tone & style
- Short paragraphs. One idea per paragraph.
- Plain language first; technical terms only after a simple analogy.
- A single `.callout` for the thesis. Don't overuse.
- End with related links, not a summary.

## Anti-patterns to avoid
- Multiple sequential file writes for one post.
- Reading the whole `index.html` just to insert a card — use a surgical replace.
- Creating branches/PRs the user didn't ask for.
- Copying CSS or JS into the post.
- Leaving placeholder text or broken image paths.
- Merging the PR without an explicit user request.
- Opening a PR without a live preview link.
