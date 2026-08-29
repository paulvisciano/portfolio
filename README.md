# Paul Visciano — Portfolio

Personal portfolio for **Paul Visciano** — designer and engineer behind **Sci-Fi Labs**.

**Live:** [paulvisciano.com](https://paulvisciano.com)

## What this is

**Not so static, static sites.** Minimal, editorial site for work across **web, mobile, and XR**. Spatial apps that treat life, memory, and music as environments you move through — not chat windows or timeline tools.

Thesis: **make science fiction real**, and ship it across every surface.

Underneath it: **your life is your data.** Conversations, photos, documents, moments — mapped in time, browsed on your own machine, instead of sitting in someone else's cloud training their models. The spatial UI is how you navigate what's yours.

## Sections

- **Work** — featured Sci-Fi apps with video previews
- **Blogs** — field notes on each project
- **About** — background, timeline, expertise
- **Contact** — reach out

## Sci-Fi apps

| Project | What it is | Links |
|---|---|---|
| **Where is Paul?** | Spatial life map — 3D globe, timeline, stories | [Live](https://paulvisciano.github.io/) · [Blog](/blog/where-is-paul.html) |
| **Knowledge Graph** | Private journal of your life — local AI, infinite canvas. Labeled demo of the running UI, plus a how-to for wiring it into your own stack. | [Repo](https://github.com/paulvisciano/knowledge-graph) · [Blog](/blog/knowledge-graph.html) |
| **Musical Cubes** | Music production in 3D — rotating cube instruments | [Live](https://paulvisciano.com/apps/musical-cubes) · [Repo](https://github.com/paulvisciano/musical-cubes) · [Blog](/blog/musical-cubes.html) |

## The through-line

Every project is a different lens on the same archive — your content, mapped in time:

- **Neuro Graph** finds the connections between people, places, and moments.
- **Where is Paul?** puts those moments on a globe.
- **Knowledge Graph** journals the conversations and images privately, on your machine.

Same data. Different visualizations. One catalog.

## Stack

- Static HTML / CSS / JS (no build step)
- Self-hosted fonts (Fraunces, Inter, JetBrains Mono)
- Media on Cloudflare R2
- Deployed on [Vercel](https://vercel.com)

## Local

Open `index.html` in a browser, or:

```bash
npx serve .
```

## Deploy

Push to `main`. With the repo linked to Vercel, production updates automatically. `vercel.json` targets the `paulvisciano.com` alias.

---

*Sci-Fi is reality.*  
*Let's build the future together.*
