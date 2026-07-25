# Marketing Portfolio Site — Design

## Purpose

A single public webpage that showcases Marisela's marketing/promotional design
work, to be linked from her resume for the UT Austin Student Assistant —
Thomas Jefferson Center application. Also serves as a general portfolio link
for future applications.

## Approach

Plain static HTML/CSS site, no build tools or framework. A tiny amount of
vanilla JS for the image lightbox. Deployed via GitHub Pages as a project
site. Chosen over a static site generator (unnecessary templating complexity
for one page) and a no-code builder (costs money, lives outside GitHub,
doesn't fit the "link in resume" + GitHub Pages plan).

## Page structure

Single scrolling page, in this order:

1. **Header** — name, one-line title, LinkedIn profile button
2. **Intro/bio** — 2-3 sentence draft (see Content below), editable by
   Marisela
3. **Design gallery** — grid of flyer/graphic images that don't have a live
   published post (currently 4 images from `~/Desktop/Marketing`)
4. **Published posts** — embedded live Instagram and LinkedIn posts (mixed
   together or in two sub-groups, whichever reads cleaner once real posts are
   in hand)
5. **Footer** — LinkedIn link again, contact email if she wants it public

## Visual style

- Neutral light background, one accent color — deep teal (`#0F766E`) as the
  default, easy to swap for a different color later
- Simple sans-serif type, generous whitespace, professional/clean —
  materials are the visual interest, not the template
- Responsive grid gallery: 2 columns mobile, 3-4 columns desktop
- Mobile-friendly throughout

## Content mechanics

- **Gallery images**: the 4 PNGs currently in `~/Desktop/Marketing` are
  copied into the project (originals untouched) and compressed/resized for
  web. More can be added the same way later.
- **LinkedIn embeds**: LinkedIn's official "Embed this post" iframe snippet,
  one per published post Marisela wants featured. She supplies the post
  URLs/embed codes; not yet collected as of this spec.
- **Instagram embeds**: Instagram's official post embed code (via the "..."
  menu → Embed), same pattern as LinkedIn. Not yet collected as of this spec.
- Placeholders are used in the initial build until real embed codes are
  supplied; the implementation plan should make it obvious where to drop
  them in (clearly marked section in the HTML).
- **Bio text**: drafted by Claude based on known context (journalism
  student, Deputy Director at CGCS), left in place as editable copy for
  Marisela to revise before publishing.

## Deployment

- New public GitHub repo named `portfolio` under account `mariselapm`
- Built and previewed locally first (open `index.html` in a browser)
- Once approved, pushed to GitHub and GitHub Pages enabled on it
- Live URL: `https://mariselapm.github.io/portfolio`
- That URL goes into the resume

## Out of scope

- No backend, CMS, or contact form
- No custom domain (can be added later if desired)
- No analytics
- Not building an ingestion pipeline for future posts — new embeds are added
  by hand-editing the HTML
