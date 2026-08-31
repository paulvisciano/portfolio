# Jailbreak Your Laptop
## Multi-Part Vlog Series Plan

**Series title:** Jailbreak Your Laptop  
**Tagline:** Own the OS. Own the apps. Own the stack.

---

## The Arc

Back then the lock was physical. A phone locked to one carrier, sealed by firmware, and the only way out was to crack the firmware itself — geohot soldering and coding for five hundred hours to unlock the original iPhone in 2007. Today the lock isn't the phone. It's the operating system on the laptop you use every day — the vendor's assumptions baked into the software, deciding what runs, what phones home, what you can change. Jailbreaking your laptop is the same idea: crack the lock the vendor shipped, on whatever machine you have. Mac, PC, or a Linux box you already run.

The payoff is transparency and editability. On a locked OS you can still inspect processes — the difference is what happens next. On Omarchy you get a curated, minimal set of services you chose, no vendor telemetry baked in by default, and the ability to override everything through AI. Something not working? Describe it and the local model rewrites the config. Don't like how it looks? Ask for a custom theme. A game that won't launch, a driver that misbehaves — those become easily tweakable through conversation, with every change visible and reversible. The lock you cracked becomes a machine you can talk to.

This is the roadmap to sovereignty. Every layer already works.

---

## Part 1 — PWN the OS

**Hook:** Before the iPhone was a status symbol, it was a locked box. In 2007, a seventeen-year-old named George Hotz — geohot — spent five hundred hours soldering and coding until he cracked it open. The first unlocked iPhone. He didn't ask permission. He just took ownership.

**What we show:**
- Install Omarchy — the native Linux distro you bake yourself
- Strip the vendor's assumptions: update servers, identity checks, telemetry
- Replace the sealed system with something you control
- See every process, every service, every connection — no guessing
- Talk to the machine through AI: audit, reconfigure, customize — themes, drivers, game fixes, all tweakable through conversation

**Payoff:** The machine is yours. The lock you cracked becomes a machine you can talk to.

---

## Part 2 — Run Your Local AI

**What we show:**
- Get llama.cpp set up — it ships with its own UI
- Pull a model: Bonsai (8B Q1_0 GGUF)
- Set up Open WebUI and point it at Bonsai on localhost:8080
- If you want the Knowledge Graph, use the custom fork: github.com/paulvisciano/open-webui — Graph lives under the Graph menu
- Expose everything over Wi-Fi — access your local AI from any device on the network

**Demo shot:** Open WebUI → Graph — chats as cards on a canvas. Phone on the same Wi-Fi hitting the same assistant.

**Payoff:** Assistant and memory live on your machine. Any device on the network can reach them.

---

## Part 3 — Create Your Own Apps

**What we show:**
- Where is Paul? — journey as pins, comics, blogs, photos, video
- Musical Cubes — an original app, not a fork
- Point tools at localhost:8080

**Demo shot:** Bangkok pin on the globe. Musical Cubes rotating stems.

**Payoff:** Apps become infrastructure you run.

---

## Part 4 — Create Your Own Site (The Public Layer)

**What we show:**
- paulvisciano.com — work, blogs, apps under a domain you own
- This is also social media. Home / Work / Blogs / About
- Claim the domain, GitHub as source of truth, Vercel deploys, wire DNS
- Same URL on a phone, a desk, and Safari on Vision Pro
- The globe is the journey. The portfolio is the showroom. Together they replace LinkedIn + Medium + Instagram for anything you want to keep.

**Demo shot:** Hero ("Hallo, ich bin Paul Visciano"), Work carousel, Blogs grid.

**Payoff:** A public face no platform can take away.

---

## Part 5 — Publish If You Want. Reclaim Your Data.

**What we show:**
- Publish a blog, an app, or a chapter of the globe only if you choose to
- Export from the rented platforms
- Memory → Graph. Journey → Where is Paul?. Work → portfolio.

**Payoff:** The loop closes.

---

*Series by Paul Visciano — Sci-Fi Labs*  
*paulvisciano.com*
