---
marp: true
theme: default
size: 16:9
backgroundColor: #0a0a0a
color: #f5f5f5
style: |
  section {
    font-family: 'Inter', system-ui, sans-serif;
  }
  h1, h2 {
    color: #00ff9d;
  }
  .lead {
    font-size: 1.6em;
    font-weight: 700;
  }
  .tagline {
    font-size: 1.1em;
    color: #888;
  }
  footer {
    color: #555;
    font-size: 0.7em;
  }
---

<!-- _class: lead -->

# Jailbreak Your Laptop

Own the OS. Own the apps. Own the stack.

<div class="tagline">A five-part series</div>

---

## The Arc

Back then the lock was physical. A phone locked to one carrier, sealed by firmware, and the only way out was to crack the firmware itself — geohot soldering and coding for five hundred hours to unlock the original iPhone in 2007. Today the lock isn't the phone. It's the operating system on the laptop you use every day — the vendor's assumptions baked into the software, deciding what runs, what phones home, what you can change. Jailbreaking your laptop is the same idea: crack the lock the vendor shipped, on whatever machine you have. Mac, PC, or a Linux box you already run.

The payoff is transparency and editability. On a locked OS you can still inspect processes — the difference is what happens next. On Omarchy you get a curated, minimal set of services you chose, no vendor telemetry baked in by default, and the ability to override everything through AI. Something not working? Describe it and the local model rewrites the config. Don't like how it looks? Ask for a custom theme. A game that won't launch, a driver that misbehaves — those become easily tweakable through conversation, with every change visible and reversible. The lock you cracked becomes a machine you can talk to.

This is the roadmap to sovereignty. Every layer already works.

---

## Part 1 — PWN the OS

- Install Omarchy — the native Linux distro you bake yourself
- Strip the vendor's assumptions: update servers, identity checks, telemetry
- Replace the sealed system with something you control
- See every process, every service, every connection — no guessing
- Talk to the machine through AI: audit, reconfigure, customize — themes, drivers, game fixes, all tweakable through conversation
- Same defiance as geohot, different layer

**Payoff:** The machine is yours. The lock you cracked becomes a machine you can talk to.

---

## Part 2 — Run Your Local AI

- Get llama.cpp set up — it ships with its own UI
- Pull a model: Bonsai (8B Q1_0 GGUF)
- Set up Open WebUI and point it at Bonsai on localhost:8080
- If you want the Knowledge Graph, use the custom fork: github.com/paulvisciano/open-webui — Graph under the Graph menu
- Expose everything over Wi-Fi — access your local AI from any device on the network

**Payoff:** Your assistant lives on your machine. Any device on the network can reach it.

---

## Part 3 — Create Your Own Apps

- Fork what ships with the stack, or start from a template
- Point everything at localhost instead of a hosted API
- Then stop forking — scaffold an original app that talks to your local model
- Run it on the machine you jailbroke in Part 1

**Payoff:** Apps stop being products someone sells you and become infrastructure you run.

---

## Part 4 — Create Your Own Site

**The public layer**

- Claim a domain
- GitHub as source of truth, Vercel deploys on every push
- Wire the domain in
- This is the public face. The brain stays local.

**Payoff:** A public face on the internet that no platform can take away.

---

## Part 5 — Publish If You Want. Reclaim Your Data.

- Publishing is optional — share an app to your domain only if you choose to
- Export your data from the platforms that already have it
- Import it onto the machine you own: photos, chats, notes, history
- The knowledge graph becomes the place that data lives now

**Payoff:** You own the OS, the AI, the apps, the site, and the archive.

---

## Why This Series Works

- You're demoing a finished product, not selling a course. Every layer already works.
- Each part is a reason to trust you as the guide.
- The marketing angle writes itself: every other app is a subscription you rent, yours is software you own.
- Natural endpoint: part five ends with someone bringing their own data home.

---

<!-- _class: lead -->

# Own the stack.

Paul Visciano — Sci-Fi Labs

paulvisciano.com
