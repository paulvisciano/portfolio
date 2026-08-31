# Jailbreak Your Laptop
### Recipe for Sovereignty — A How-To Guide

**Series:** Jailbreak Your Laptop  
**Tagline:** Own the OS. Own the apps. Own the stack.  
**By:** Paul Visciano — Sci-Fi Labs  
**Site:** paulvisciano.com

---

## The Premise

To see why this matters, go back to where jailbreaking began. Back then the lock was physical — a phone locked to one carrier, sealed by firmware, and the only way out was to crack the firmware itself. In the summer of 2007, a seventeen-year-old named George Hotz — geohot — spent five hundred hours soldering and coding to unlock the original iPhone. He posted the video from his parents' kitchen: "This is the world's first unlocked iPhone." It was breaking news. The New York Times, CBS, CNBC, Wired — the story spread across the world in a weekend. He traded one of the unlocked phones for a Nissan 350Z. He was still a teenager.

Today the lock isn't the phone. It's the operating system on the laptop you use every day — the vendor's assumptions baked into the software, deciding what runs, what phones home, what you can change. Jailbreaking your laptop is the same idea: crack the lock the vendor shipped, on whatever machine you have. Mac, PC, or a Linux box you already run.

The payoff is transparency. On a locked OS you're guessing what's running, what phones home, what you can't see. On Omarchy you can list every process, every service, every connection, and know exactly what's happening because you chose it. And the AI layer turns that knowledge into control — ask your local model to audit the machine, kill a process, reconfigure a service, customize the desktop, all through conversation, all on localhost. The lock you cracked becomes a machine you can talk to.

This is the roadmap to sovereignty. Every layer already works. Follow the steps and you end up with a computer that is truly yours.

---

## The Ingredients

- A laptop (16 gigs works — no GPU required; Mac, PC, or Linux)
- **Omarchy** — the owned OS. [omarchy.org](https://omarchy.org) · ISO: [iso.omarchy.org](https://iso.omarchy.org) · [Getting Started](https://omarchy.org/manual/getting-started) · [github.com/omacom/omarchy](https://github.com/omacom/omarchy)
- **Bonsai** — the personal AI brain (1-bit, ~1.15 GB for 8B). Journaling, talking to a local model, the knowledge graph. [prismml.com](https://prismml.com) · [docs.prismml.com](https://docs.prismml.com) · [huggingface.co/prism-ml/bonsai](https://huggingface.co/collections/prism-ml/bonsai)
- **Stronger coding models** for setup — Grok 4.6 via OpenCode, or GLM 5.2 / 5.1. Reach for these when you need more power: installing software, coding, multi-step work. Hand daily use back to Bonsai.
- **llama.cpp** — the runtime for Bonsai. Ships with its own UI. [github.com/ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)
- **Open WebUI** — the daily workspace on top of llama.cpp, with the Knowledge Graph under Graph. [github.com/open-webui/open-webui](https://github.com/open-webui/open-webui)
- **Vercel** — the public layer. [vercel.com](https://vercel.com)
- **GitHub** — your source of truth. [github.com](https://github.com)
- A domain name you claim
- Your own data, exported from the platforms that already have it
- Patience, and a willingness to stop asking permission

### Two layers of AI

**Bonsai** is the personal AI layer — journaling, talking to a local model, remembering your life through the knowledge graph.

**Stronger models** (Grok 4.6, GLM 5.x) are for the moments you need more power — setting up software on the machine, coding, multi-step installs. Reach for those when building; hand daily use back to Bonsai.

### Proof it works, not ingredients

I already have the entire ecosystem running. Open WebUI with the Knowledge Graph, Bonsai served through llama.cpp, my portfolio published to my own domain, and a few spatial apps — Where is Paul? and Musical Cubes — all built and tested on this machine. The steps below are what I actually did.

---

## Part 1 — On the OS

**Crack the lock the vendor shipped.**

From the [official Getting Started](https://omarchy.org/manual/getting-started):

1. Omarchy is installed using an ISO. Choose a full-disk install or a free-space install (unallocated space — how you dual boot; turn off BitLocker in Windows first).
2. The installation defaults to full encryption. The full-disk option wipes the selected drive — back up first.
3. Download the ISO from [omarchy.org](https://omarchy.org), put it on a USB stick (balenaEtcher on Mac/Windows, caligula on Linux), and boot off the stick.
4. **Turn off Secure Boot and/or TPM in the BIOS.** They're Microsoft security schemes meant for Windows and Microsoft-affiliated Linux distributions.
5. Answer the configuration questions, confirm them, select a drive, and watch the install. Under a minute on fast machines, no more than five on older ones.
6. Reboot. List every process, every service, every connection. You chose all of it.

Use a wired or 2.4 GHz keyboard — full-disk encryption won't accept a Bluetooth keyboard at startup.

**Result:** The machine is yours. No cloud middleman. No telemetry you can't refuse. You can see every process, every service, every connection — and the AI layer lets you control it all through conversation.

**Prompt:** You are a systems engineer. Walk me through installing Omarchy 4.x on a laptop with 16 GB of memory. I want full-disk encryption, Hyprland, and the default developer tools. Give me the exact commands, the BIOS settings to change, and what to do if the installer complains about Secure Boot. Then verify the install with `omarchy --version`.

**Let AI Cook** (stronger model — OpenCode + Grok 4.6, Claude Code, Hermes, or OpenClaw): Install Omarchy 4.x on this laptop (16 GB memory). Turn off Secure Boot, flash the ISO, run the full-disk encrypted install with Hyprland, then verify with `omarchy --version`. Do it step by step and stop if anything fails.

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

**Make the software yours.**

Social media rented you a feed. This stack gives you apps you run.

Where is Paul? saves the journey — pins on Earth, comic episodes, blogs, photos, video. Musical Cubes is an original: tracks as rotating cubes you play, loop, and sync. The portfolio site is where those apps get shown.

1. Fork an open-source app you like, or start from a template — or clone Where is Paul? and swap `moments/moments.js`.
2. Point local tools at localhost:8080 instead of a hosted API.
3. Then stop forking. Scaffold an original app that talks to your local model.
4. Run it on the machine you jailbroke in Part 1. No account, no subscription, no telemetry you can't refuse.

**Result:** Apps stop being products someone sells you. They become infrastructure you run.

---

## Part 4 — Create Your Own Site (The Public Layer)

**Claim your public face. This is also social media.**

paulvisciano.com is not a landing page you rent from a builder. It is the public arm of the stack — work, blogs, and apps hosted under a domain you own. Home, Work, Blogs, About. Same URL on a phone, a desk, and Safari on Vision Pro.

Where is Paul? is the journey. The portfolio is the showroom. Together they replace LinkedIn + Medium + Instagram for anything you actually want to keep.

1. Claim your domain name.
2. Create a GitHub repository — this becomes the source of truth.
3. Set up Vercel. Vercel is in charge of deployments.
4. Wire your domain into Vercel (update the registrar's DNS records).
5. Push to the repo. Vercel deploys on every push.

This is the public layer. The brain stays local. The site is what the internet gets to see.

**Result:** A public face on the internet that no platform can take away.

---

## Part 5 — Publish If You Want. Reclaim Your Data.

**Publishing is optional. The archive is not.**

1. If you want to share an app, a blog, or a chapter of the globe, publish it to your domain from Part 4. If you don't, don't.
2. Export your data from the platforms that already have it — photos, chats, notes, history, the graph of your life.
3. Import that archive onto the machine you own.
4. Drop memory into Open WebUI → Graph. Drop the journey into Where is Paul?. Drop the work into the portfolio. That data lives here now.

**Result:** The loop closes. You own the OS, the AI, the apps, the site, the social arm, and the archive. Nothing stays rented unless you decide it should.

---

## The Finished Dish

You have reclaimed your computer.  
You own the OS.  
You run your own AI.  
You run your own apps.  
Your work and your journey live on a domain you own, not a feed you rent.  
Your data is home.

This is the road to sovereignty.

---

*Recipe by Paul Visciano — Sci-Fi Labs*  
*paulvisciano.com*
