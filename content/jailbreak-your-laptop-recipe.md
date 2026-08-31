# Jailbreak Your Laptop
### Recipe for Sovereignty — A How-To Guide

**Series:** Jailbreak Your Laptop  
**Tagline:** Own the OS. Own the apps. Own the stack.  
**By:** Paul Visciano — Sci-Fi Labs  
**Site:** paulvisciano.com

---

## The Premise

Ownership used to mean cracking someone else's lock.  
Now it means building the lock yourself.

From geohot cracking the first iPhone in 2007 to running a fully local stack on an 18-gig MacBook — the defiance is the same, the layer just moved.

This is not a roadmap. Every layer already works.  
This is a recipe. Follow the steps and you end up with a computer that is truly yours.

---

## Ingredients

- A laptop (MacBook with 18 gigs works — no GPU required)
- Omarchy — the native Linux distro you bake yourself
- Bonsai — the personal AI brain (1-bit, ~1.15 GB for 8B)
- Stronger coding models for setup: Grok 4.6 via OpenCode, or GLM 5.2 / 5.1
- llama.cpp as the runtime (it ships with its own UI)
- Open WebUI on top of llama.cpp
- Knowledge Graph UI wired into Open WebUI under Graph
- Where is Paul? — the owned social arm. A life on a globe: comics, blogs, pins, photos, video
- Existing apps you can fork, plus a stack you like for originals
- A domain name you claim
- Vercel for the public layer
- A GitHub repository as source of truth
- Your own data, exported from the platforms that already have it
- Patience, and a willingness to stop asking permission

---

## Part 1 — Jailbreak Your Laptop

**Crack the lock.**

1. Install Omarchy on your machine.
2. Strip the vendor's assumptions: update servers, identity checks, telemetry.
3. Replace the sealed system with something you control.
4. Same defiance as geohot, different layer — you are cracking the assumption that the vendor's OS is the only one allowed on their hardware.

**Result:** The machine is yours. No cloud middleman. No telemetry you can't refuse.

---

## Part 2 — Run Your Local AI

**Give the stack a brain. Three surfaces, one machine.**

llama.cpp is the engine. It already comes with a UI that is pretty good. Open WebUI makes the same local model feel like a workspace — chats, notes, search. The latest layer: the Knowledge Graph UI lives *inside* Open WebUI, under Graph. Memory is not a separate app. It is a menu item on the assistant you already run.

1. Get a Bonsai GGUF (start with Bonsai-8B-Q1_0.gguf).
2. Serve it with llama.cpp on localhost:8080 — OpenAI-compatible, no API key. Use the built-in llama.cpp UI first if you want the thinnest path.
3. Point Open WebUI at that same local endpoint. This is the daily workspace.
4. Open Graph in Open WebUI. That is the Knowledge Graph — chats as cards on a canvas, time as space, no cloud relay.
5. Bind it to your LAN IP so the phone on the same Wi-Fi can talk to it.
6. Use a stronger model (Grok 4.6 via OpenCode, GLM 5.2 / 5.1) if you want help standing this up. Hand daily use back to Bonsai.

**Result:** Your assistant and your memory live on your machine. Phone and laptop share them. No one can shadowban you. No one can sell your data.

---

## Part 3 — Create Your Own Apps

**Make the software yours. Where is Paul? is the social arm.**

Social media rented you a feed. This stack gives you a globe.

Where is Paul? saves the journey in a form you own — pins on Earth, comic episodes, blogs, photos, video. Family asked where you were. The answer became a place you can spin, not a timeline someone else ranks.

1. Fork an open-source app you like, or start from a template — or clone Where is Paul? and swap `moments/moments.js`.
2. Point local tools at localhost:8080 instead of a hosted API.
3. Then stop forking. Scaffold an original app that talks to your local model.
4. Run it on the machine you jailbroke in Part 1. No account, no subscription, no telemetry you can't refuse.

**Result:** Apps stop being products someone sells you. The journey stops living on Instagram. Both become infrastructure you run.

---

## Part 4 — Create Your Own Site (The Public Layer)

**Claim your public face.**

The globe can stay private. When you want a public arm, it ships as a website — same URL on a phone, a desk, and Safari on Vision Pro.

1. Claim your domain name.
2. Create a GitHub repository — this becomes the source of truth.
3. Set up Vercel. Vercel is in charge of deployments.
4. Wire your domain into Vercel (update the registrar's DNS records).
5. Push to the repo. Vercel deploys on every push.

This is the public layer. The brain stays local. The site — portfolio, globe, comics — is what the internet gets to see.

**Result:** A public face on the internet that no platform can take away.

---

## Part 5 — Publish If You Want. Reclaim Your Data.

**Sharing is optional. The archive is not.**

1. If you want to share an app or a chapter of the globe, publish it to your domain from Part 4. If you don't, don't.
2. Export your data from the platforms that already have it — photos, chats, notes, history, the graph of your life.
3. Import that archive onto the machine you own.
4. Drop memory into Open WebUI → Graph. Drop the journey into Where is Paul? — pins, comics, blogs, photos, video. That data lives here now.

**Result:** The loop closes. You own the OS, the AI, the apps, the site, the social arm, and the archive. Nothing stays rented unless you decide it should.

---

## The Finished Dish

You have reclaimed your computer.  
You own the OS.  
You run your own AI.  
You run your own apps.  
Your journey lives on a globe you own, not a feed you rent.  
You have a public layer that is yours.  
Your data is home.

This is the road to sovereignty.

---

## Why This Recipe Works

- Every layer is already built and working.
- Each step is a reason to trust the guide.
- The marketing angle writes itself: every other app is a subscription you rent; yours is software you own.
- Natural endpoint: someone brings their own data home and the tutorial ends.

---

*Recipe by Paul Visciano — Sci-Fi Labs*  
*paulvisciano.com*
