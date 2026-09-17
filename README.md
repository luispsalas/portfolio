# Luis Salas — Projects

A hub for AI enablement and governance work alongside creative audiovisual work. It frames the projects and links out; each one keeps its own home, repo and documentation.

> **Status: draft for review.** Published at a draft path while the structure and copy settle. Contact links are placeholders.

| Section | What's there |
|---|---|
| **[AI Enablement & Governance](https://luispsalas.github.io/portfolio/#governance)** | Guides, catalogs and standards for building and overseeing AI systems. |
| **[Creative · Audiovisual](https://luispsalas.github.io/portfolio/#creative)** | Sound art, audio instruments and audio-reactive visuals. |

## How it's built

A single static page — hand-written HTML, one stylesheet, one script. No framework, no build step, no dependencies.

```
index.html          markup and copy (EN + ES in data attributes)
assets/style.css    design tokens, layout, components
assets/app.js       project data, rendering, language and theme switches
assets/banner-*.svg light and dark banners
```

Design follows GitHub Primer so this hub reads as a sibling of the [Applied AI Concepts wiki](https://github.com/luispsalas/applied-ai-concepts) and the Autonomous AI Casebook. Blue marks the governance track, orange the creative one — the same orange the casebook banner uses.

## Editing

Projects live in the `PROJECTS` object in `assets/app.js`. Each entry carries its English and Spanish description, tags, a status, and an optional link; a project without a link renders as a plain card instead of a clickable one.

Interface strings live in `data-en` / `data-es` attributes in `index.html`.

## Authorship

Made by a human working with AI models — see the [Authorship Meter](https://luispsalas.github.io/authorship-meter/).
