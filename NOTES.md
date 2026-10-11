# Site notes

Astro site, deployed to GitHub Pages on every push to `main`. The old Jekyll site is on the `old-site` branch.

```sh
npm run dev      # local preview at http://localhost:4321
npm run build    # fails with a clear error if an entry is invalid
```

## Content basics

- One file per entry. Filenames don't matter; order comes from the dates.
- Dates: `2025` or `2025-03`. An empty `end` means "Present".
- `description`, `note` and CV `bullets` support `*italic*`, `**bold**` and `[links](https://...)`.
- `draft: true` hides any entry without deleting it.
- Name, role, social links and meta description are in `src/site.config.ts`. The intro text is `src/content/about.md`.

## Project

`src/content/projects/<name>.md`

```yaml
---
title: my-project
description: One line about what it does
date: 2026-04
link: https://github.com/jmaen/my-project
pinned: true                  # optional: listed first, with a thumbnail
image: ./images/my-project.png  # optional, only for pinned projects
imageAlt: What the image shows  # required if image is set
imagePosition: right          # optional crop anchor: center (default), left, right, top, bottom
note: "Presented at [Some Conference](https://...)."  # optional
draft: false                  # optional
---
```

Pinned first, then newest first. Thumbnails are cropped to the same 4:3 frame.

## Publication

`src/content/publications/<name>.md`

```yaml
---
title: "Title of the paper or poster"
authors: ["J. Mänzer", "Co-Author A"]
venue: "Conference name, City"
year: 2026
month: 7                      # optional, for ordering
type: paper                   # paper | preprint | poster | talk
links:                        # all optional
  abstract: https://...
  pdf: /files/paper.pdf       # files in public/files/
  arxiv: https://arxiv.org/abs/...
  code: https://github.com/...
  poster: /files/poster.pdf
  slides: /files/slides.pdf
draft: false                  # optional
---
```

Papers and preprints go under *Papers*, posters and talks under *Posters & Talks*. The section is hidden if nothing is visible. My name is bolded using `selfAuthorNames` in the site config.

## CV entry

`src/content/cv/<section>/<name>.yaml`, where section is `education`, `experience` or `scholarships`.

```yaml
title: Working Student, AI Research
org: Mercedes-Benz AG
start: 2026-06
end:                          # empty = Present
bullets:                      # optional
  - One line on the area of work.
order: 0                      # optional tiebreaker
draft: false                  # optional
```

Ongoing entries first, then newest first. Empty sections are hidden.
