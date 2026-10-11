# jmaen.github.io

Personal website, built with [Astro](https://astro.build) and deployed to GitHub Pages.
Everything is on one page (About → Publications → Projects → CV). Each project, publication and CV entry is its own small file.

The previous Jekyll site is kept on the `old-site` branch.

## Development

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve dist/
```

Every push to `main` builds and deploys via `.github/workflows/deploy.yml`.
Under repo **Settings → Pages**, **Source** must be set to **GitHub Actions**.

## Where things live

| What                       | Where                                   |
| -------------------------- | --------------------------------------- |
| Name, role, links, meta    | `src/site.config.ts`                    |
| Intro text                 | `src/content/about.md`                  |
| Profile photo              | `src/assets/profile.jpg`                |
| Projects                   | `src/content/projects/<slug>.md`        |
| Project images             | `src/content/projects/images/`          |
| Publications, posters, talks | `src/content/publications/<slug>.md`  |
| CV entries                 | `src/content/cv/<section>/<slug>.yaml`  |
| Colors and fonts           | `src/styles/global.css`                 |

Filenames are just identifiers. Ordering comes from the dates inside each file.
Every entry is checked against a schema (`src/content.config.ts`). If a required field is missing or a date is malformed, the build fails and names the file and field.

Any entry can be hidden without deleting it by adding `draft: true`.

**Dates** are written as `2025` or `2025-03` and render as "2025" or "Mar 2025". An empty `end` renders as "Present".

**One-line text fields** (`description`, `note`, CV `bullets`) support `*italic*`, `**bold**` and `[links](https://...)`.

## Add a project

Create `src/content/projects/<slug>.md`:

```yaml
---
title: my-project
description: One line about what it does
date: 2026-04                 # for ordering only, newest first
link: https://github.com/jmaen/my-project
# optional:
pinned: true                  # listed first, with a thumbnail
image: ./images/my-project.png
imageAlt: What the image shows
imagePosition: right          # crop anchor: center (default), left, right, top, bottom
note: "Presented at [Some Conference 2026](https://...)."
---
```

Pinned projects come first, then everything else from newest to oldest.
Thumbnails are shown to the left of the text and cropped to the same 4:3 frame (176×132px). Use `imagePosition` to choose which part of the image to keep.
Only pinned projects should have an image. Other projects render as compact text rows.

## Add a publication, poster or talk

Create `src/content/publications/<slug>.md`:

```yaml
---
title: "Title of the paper or poster"
authors: ["J. Mänzer", "Co-Author A", "Co-Author B"]
venue: "Conference name, City"
year: 2026
month: 7                      # optional, for ordering and the CV date
type: paper                   # paper | preprint | poster | talk
links:                        # all optional
  abstract: https://...       # e.g. the conference abstract page
  pdf: /files/paper.pdf       # files in public/files/ are served at /files/
  code: https://github.com/...
  arxiv: https://arxiv.org/abs/...
  poster: /files/poster.pdf
  slides: /files/slides.pdf
---
```

Your own name is shown in bold. The spellings to match are set in `selfAuthorNames` in `src/site.config.ts`.

Papers and preprints are listed under *Papers*, posters and talks under *Posters & Talks*. Each subsection appears only when it has entries. The Publications section and its nav link are hidden when there are no visible entries, for example when all of them are `draft: true`.

## Add a CV entry

Create `src/content/cv/<section>/<slug>.yaml`, where `<section>` is `education`, `experience` or `scholarships`:

```yaml
title: Working Student, AI Research
org: Mercedes-Benz AG
start: 2026-06
end:                          # leave empty for "Present"
bullets:                      # optional
  - One line on the area of work.
order: 0                      # optional tiebreaker
```

Entries are sorted with ongoing ones first, then newest start date first. A CV subsection with no entries is not shown.
