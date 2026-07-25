# Marketing Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a single-page static site showcasing Marisela's marketing/design work, live at `https://mariselapm.github.io/portfolio`, ready to link from her resume.

**Architecture:** Plain static HTML + CSS + vanilla JS, no build tools or frameworks. One `index.html`, one stylesheet, one script file, plus a folder of processed gallery images. Deployed as a GitHub Pages project site from the `main` branch.

**Tech Stack:** HTML5, CSS3 (Grid + media queries), vanilla JS. macOS `sips` for image processing. `gh` CLI for repo creation and Pages setup (already authenticated as `mariselapm`).

## Global Constraints

- No build step, no npm dependencies, no frameworks — plain files only.
- Accent color: `#0F766E` (deep teal), per spec.
- LinkedIn profile URL: `https://www.linkedin.com/in/marisela-pm`
- Contact email shown in footer: `marisela.perezmaita@austincc.edu`
- Repo: public GitHub repo named `portfolio` under account `mariselapm`.
- Source images live in `~/Desktop/Marketing` and must NOT be modified or deleted — only copied from.
- Since this is a static content site (no logic to unit test), "tests" in this plan are (a) automatable structural checks via `grep`/`curl` and (b) a manual visual check in a browser — call out both explicitly, don't skip the manual one.

---

### Task 1: Prepare gallery images

**Files:**
- Create: `~/portfolio/assets/images/design-01.jpg`
- Create: `~/portfolio/assets/images/design-02.jpg`
- Create: `~/portfolio/assets/images/design-03.jpg`
- Create: `~/portfolio/assets/images/design-04.jpg`

**Interfaces:**
- Produces: 4 JPEG files at `assets/images/design-0N.jpg` (N = 1..4), each ≤1000px on the long edge, used as `src`/`data-full` values by Task 2's gallery markup.

Source files (do not modify), mapped oldest → newest by their file dates, to `design-01.jpg`..`design-04.jpg`:
1. `~/Desktop/Marketing/LJR IG (1080 x 1350 px) (8).png` → `design-01.jpg`
2. `~/Desktop/Marketing/LJR IG (1080 x 1350 px) (9).png` → `design-02.jpg`
3. `~/Desktop/Marketing/LJR IG (1080 x 1350 px) (10).png` → `design-03.jpg`
4. `~/Desktop/Marketing/LJR IG (1080 x 1350 px) (28).png` → `design-04.jpg`

- [ ] **Step 1: Create the images directory**

```bash
mkdir -p ~/portfolio/assets/images
```

- [ ] **Step 2: Convert and resize each source image**

```bash
cd ~/portfolio
sips -s format jpeg -s formatOptions 82 -Z 1000 "$HOME/Desktop/Marketing/LJR IG (1080 x 1350 px) (8).png" --out assets/images/design-01.jpg
sips -s format jpeg -s formatOptions 82 -Z 1000 "$HOME/Desktop/Marketing/LJR IG (1080 x 1350 px) (9).png" --out assets/images/design-02.jpg
sips -s format jpeg -s formatOptions 82 -Z 1000 "$HOME/Desktop/Marketing/LJR IG (1080 x 1350 px) (10).png" --out assets/images/design-03.jpg
sips -s format jpeg -s formatOptions 82 -Z 1000 "$HOME/Desktop/Marketing/LJR IG (1080 x 1350 px) (28).png" --out assets/images/design-04.jpg
```

- [ ] **Step 3: Verify the 4 files exist and are reasonably sized**

Run: `ls -la ~/portfolio/assets/images/`
Expected: 4 files named `design-01.jpg` through `design-04.jpg`, each well under 500KB (JPEG at quality 82 should compress the ~2-3MB PNGs down significantly).

Run: `sips -g pixelWidth -g pixelHeight ~/portfolio/assets/images/design-01.jpg`
Expected: long edge (height, since source is portrait 1080x1350) is 1000px, width scaled proportionally (~800px).

- [ ] **Step 4: Commit**

```bash
cd ~/portfolio
git add assets/images/
git commit -m "Add processed gallery images"
```

---

### Task 2: Build the site (HTML, CSS, JS)

**Files:**
- Create: `~/portfolio/index.html`
- Create: `~/portfolio/css/style.css`
- Create: `~/portfolio/js/main.js`

**Interfaces:**
- Consumes: `assets/images/design-01.jpg`..`design-04.jpg` from Task 1.
- Produces: a complete, browsable static page. No other task depends on this one's internals beyond the file paths above.

- [ ] **Step 1: Write `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Marisela Perez Maita — Marketing Portfolio</title>
  <meta name="description" content="Marketing and promotional design work by Marisela Perez Maita.">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <div>
        <h1>Marisela Perez Maita</h1>
        <p class="tagline">Marketing &amp; Communications</p>
      </div>
      <a class="btn btn-accent" href="https://www.linkedin.com/in/marisela-pm" target="_blank" rel="noopener">Connect on LinkedIn</a>
    </div>
  </header>

  <main>
    <section id="bio" class="section container">
      <p class="bio-text">
        I'm a journalism student and Deputy Director at CGCS, where I plan and
        produce marketing and promotional content for print and social media.
        This page collects a selection of that work — original designs,
        campaign graphics, and posts as they went live.
      </p>
    </section>

    <section id="gallery" class="section container">
      <h2>Designs</h2>
      <p class="section-note">Pieces without a separate published post.</p>
      <div class="gallery-grid">
        <button class="gallery-item" data-full="assets/images/design-01.jpg">
          <img src="assets/images/design-01.jpg" alt="Marketing design 1" loading="lazy">
        </button>
        <button class="gallery-item" data-full="assets/images/design-02.jpg">
          <img src="assets/images/design-02.jpg" alt="Marketing design 2" loading="lazy">
        </button>
        <button class="gallery-item" data-full="assets/images/design-03.jpg">
          <img src="assets/images/design-03.jpg" alt="Marketing design 3" loading="lazy">
        </button>
        <button class="gallery-item" data-full="assets/images/design-04.jpg">
          <img src="assets/images/design-04.jpg" alt="Marketing design 4" loading="lazy">
        </button>
      </div>
    </section>

    <section id="posts" class="section container">
      <h2>Published Posts</h2>
      <p class="section-note">Live posts from Instagram and LinkedIn.</p>
      <div class="posts-grid">
        <div class="post-slot">
          <p class="post-slot-empty">
            Instagram post coming soon. To add one: open the post on
            Instagram, click "...", choose "Embed", copy the code, and paste
            it here in place of this paragraph.
          </p>
          <!--
            INSTAGRAM EMBED SLOT
            Paste the <blockquote class="instagram-media">...</blockquote>
            code Instagram gives you here, replacing the <p> above.
          -->
        </div>
        <div class="post-slot">
          <p class="post-slot-empty">
            LinkedIn post coming soon. To add one: open the post on
            LinkedIn, click "Share" then "Embed this post", copy the iframe
            code, and paste it here in place of this paragraph.
          </p>
          <!--
            LINKEDIN EMBED SLOT
            Paste the <iframe src="https://www.linkedin.com/embed/..."></iframe>
            code LinkedIn gives you here, replacing the <p> above.
          -->
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <a class="btn btn-accent" href="https://www.linkedin.com/in/marisela-pm" target="_blank" rel="noopener">Connect on LinkedIn</a>
      <p class="footer-contact"><a href="mailto:marisela.perezmaita@austincc.edu">marisela.perezmaita@austincc.edu</a></p>
    </div>
  </footer>

  <div id="lightbox" class="lightbox" hidden>
    <button id="lightbox-close" class="lightbox-close" aria-label="Close">&times;</button>
    <img id="lightbox-img" src="" alt="">
  </div>

  <script src="js/main.js"></script>
  <!-- Renders any Instagram embed added to the posts section above -->
  <script async src="//www.instagram.com/embed.js"></script>
</body>
</html>
```

- [ ] **Step 2: Write `css/style.css`**

```bash
mkdir -p ~/portfolio/css
```

```css
:root {
  --accent: #0F766E;
  --accent-dark: #0B5C56;
  --bg: #FFFFFF;
  --bg-alt: #F7F7F5;
  --text: #1F2937;
  --text-muted: #6B7280;
  --border: #E5E7EB;
  --radius: 8px;
  --max-width: 1000px;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: var(--text);
  background: var(--bg);
  line-height: 1.6;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

.site-header {
  border-bottom: 1px solid var(--border);
  padding: 32px 0;
}

.header-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

h1 {
  margin: 0 0 4px;
  font-size: 1.75rem;
}

.tagline {
  margin: 0;
  color: var(--text-muted);
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  border-radius: var(--radius);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
}

.btn-accent {
  background: var(--accent);
  color: #fff;
}

.btn-accent:hover {
  background: var(--accent-dark);
}

.section {
  padding: 48px 0;
}

.section h2 {
  margin: 0 0 4px;
  font-size: 1.4rem;
}

.section-note {
  margin: 0 0 24px;
  color: var(--text-muted);
  font-size: 0.95rem;
}

.bio-text {
  font-size: 1.1rem;
  max-width: 640px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (min-width: 640px) {
  .gallery-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 960px) {
  .gallery-grid { grid-template-columns: repeat(4, 1fr); }
}

.gallery-item {
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: var(--radius);
  overflow: hidden;
  aspect-ratio: 4 / 5;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.2s ease;
}

.gallery-item:hover img {
  transform: scale(1.03);
}

.posts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 640px) {
  .posts-grid { grid-template-columns: 1fr 1fr; }
}

.post-slot {
  border: 1px dashed var(--border);
  border-radius: var(--radius);
  padding: 24px;
  background: var(--bg-alt);
}

.post-slot-empty {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin: 0;
}

.site-footer {
  border-top: 1px solid var(--border);
  padding: 32px 0;
  background: var(--bg-alt);
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.footer-contact a {
  color: var(--text);
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 100;
}

.lightbox[hidden] {
  display: none;
}

.lightbox img {
  max-width: 100%;
  max-height: 100%;
  border-radius: var(--radius);
}

.lightbox-close {
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
}
```

- [ ] **Step 3: Write `js/main.js`**

```bash
mkdir -p ~/portfolio/js
```

```js
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");
  const galleryItems = document.querySelectorAll(".gallery-item");

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.hidden = false;
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
  }

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const full = item.getAttribute("data-full");
      const alt = item.querySelector("img").alt;
      openLightbox(full, alt);
    });
  });

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
});
```

- [ ] **Step 4: Structural check (automatable)**

```bash
cd ~/portfolio
grep -q "Marisela Perez Maita" index.html && \
grep -q "linkedin.com/in/marisela-pm" index.html && \
grep -q "gallery-grid" index.html && \
grep -q "design-04.jpg" index.html && \
grep -q "lightbox" js/main.js && \
echo "STRUCTURE OK"
```

Expected: `STRUCTURE OK` printed, no grep failures.

- [ ] **Step 5: Manual visual check (do not skip)**

```bash
cd ~/portfolio && python3 -m http.server 8000 &
open http://localhost:8000
```

Confirm in the browser:
- Header shows name, tagline, and a working "Connect on LinkedIn" button
- Bio paragraph renders
- Gallery shows all 4 images in a grid; clicking one opens it larger (lightbox), Escape or clicking outside closes it
- Posts section shows the two empty-state placeholder cards
- Footer shows the LinkedIn button again and the email link
- Resize the browser window narrow (~375px) and confirm the gallery collapses to 2 columns and nothing overflows horizontally

Stop the server after checking: `kill %1`

- [ ] **Step 6: Commit**

```bash
cd ~/portfolio
git add index.html css/style.css js/main.js
git commit -m "Build marketing portfolio site (header, bio, gallery, posts, footer)"
```

---

### Task 3: Deploy to GitHub Pages

**Files:** none created; this task pushes the existing repo and configures Pages.

**Interfaces:**
- Consumes: the committed `~/portfolio` repo from Tasks 1-2.
- Produces: a live URL, `https://mariselapm.github.io/portfolio`.

- [ ] **Step 1: Confirm gh auth**

```bash
gh auth status
```

Expected: shows logged in to github.com as `mariselapm`.

- [ ] **Step 2: Create the GitHub repo and push**

```bash
cd ~/portfolio
gh repo create portfolio --public --source=. --remote=origin --push
```

Expected: repo created at `https://github.com/mariselapm/portfolio`, local `main` pushed, `origin` remote set.

- [ ] **Step 3: Enable GitHub Pages from the `main` branch root**

```bash
gh api -X POST repos/mariselapm/portfolio/pages \
  -f "source[branch]=main" \
  -f "source[path]=/"
```

Expected: JSON response with `"status"` field (e.g. `"building"`) and `"html_url": "https://mariselapm.github.io/portfolio/"`.

- [ ] **Step 4: Verify the live site responds**

Pages builds can take 1-2 minutes. Then run:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://mariselapm.github.io/portfolio/
```

Expected: `200`. If it returns `404`, wait another minute and retry — first Pages deploys are sometimes slow to propagate.

- [ ] **Step 5: Final confirmation**

Open `https://mariselapm.github.io/portfolio/` in a browser and do the same visual check as Task 2 Step 5, this time on the live URL. Report the URL back — this is what goes in the resume.

---

## Notes for Marisela (post-deploy, not automated)

- To add real posts later: open `index.html`, find the `INSTAGRAM EMBED SLOT` / `LINKEDIN EMBED SLOT` comments in the `#posts` section, and replace the `<p class="post-slot-empty">...</p>` in that block with the embed code the platform gives you. Commit and push (`git add index.html && git commit -m "Add published post embed" && git push`) — GitHub Pages redeploys automatically.
- To add more gallery images later: process them the same way as Task 1 (via `sips`, or just drop a web-sized JPEG into `assets/images/`), then add a matching `<button class="gallery-item">` block in the `#gallery` section of `index.html`.
