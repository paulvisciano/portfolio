# You Bought the Hardware. You Never Owned It.

You bought the phone. You think you own it. You don't.

Every picture you take gets sent to the cloud. Your location is tracked. Every message you send, every call you make, every search — reported, monetized, used to train someone else's model. You rely on the brand to push out updates, and the brand decides what those updates do. You paid for the silicon. You locked the software, the data, and the intelligence.

That's the deal we've all been living with. And it's about to change.

## The precedent

In August 2007, a seventeen-year-old named George Hotz — geohot — spent about five hundred hours soldering and coding until he unlocked the original iPhone. He stood in his parents' kitchen, hit record, and said: "This is the world's first unlocked iPhone." The New York Times covered it. CBS, CNBC, Wired. He traded the phone for a Nissan 350Z.

He wasn't trying to be rich. He wanted to use his iPhone on T-Mobile instead of AT&T. The lock was physical — a carrier-locked baseband chip, firmware signed by the manufacturer, a bootloader that decided what was allowed to run. He cracked it with a Phillips screwdriver, a guitar pick, and a soldering iron, then posted the instructions so anyone could do it.

That was the first crack. But the pattern didn't stop there.

In 2010 he cracked the PlayStation 3's hypervisor. Sony sued him under the DMCA. He settled, agreed never to touch Sony hardware again, and moved on.

In 2014 he released Towelroot — a one-tap Android rooting tool that worked on the Verizon and AT&T Galaxy S5, devices with roughly an eighteen-thousand-dollar bounty on them at the time. Same move: take something locked, crack it, hand the key to everyone.

Then he founded comma.ai and built openpilot — open-source self-driving software. You bought the car. The driver-assist brain, the lane-keeping, the adaptive cruise — none of it was yours. He cracked that lock too, and gave the key away under an MIT license. Today openpilot supports over three hundred car models and has logged over a hundred million miles. The community ports new cars themselves. His own framing: Tesla is iOS, we want to be Android.

Then tiny corp and tinygrad — a from-scratch deep learning framework built to commoditize the petaflop so compute doesn't end up controlled by a handful of warehouses. His stated mission: make sure power stays decentralized.

Same move, every time, across nearly two decades. Phone. Console. Car. Android. AI compute. Take something locked. Crack it. Hand the key to everyone.

His own words nail the philosophy. From his blog: "I don't mean 'owns' from a legalist perspective, I mean 'owns' as in the hacker meaning, like 'owning' the box. Who has root?" And: "I think who owns the robots is going to be a key aspect of what the future looks like."

He's the precedent. What follows is the application — to the machine most people actually live on.

## The lock moved to the machine you use every day

The lock didn't disappear. It moved.

Back then it was a chip you could solder. Today it's the operating system on the laptop you use every day — the vendor's assumptions baked into the software, deciding what runs, what phones home, what you can change. On a locked OS you can list processes on macOS and Windows too. The difference is control. On Omarchy, the services are the ones you chose. The desktop is the one you configured. There's no telemetry you can't refuse because there's no vendor deciding what gets to phone out.

And the real differentiator isn't just visibility. It's editability. Something's not working? You change it. You don't like how something looks? You change that too. A game won't run, a driver is misbehaving, a UI tweak is annoying you — all of it becomes tweakable through conversation with a local model. You describe the problem. It writes the fix. You approve it. Every change is visible and reversible.

That's not customization. Customization is picking from a menu. This is describing the machine you actually want and having it built.

## The AI is the new lock — and you should own it too

Following the same logic, you should own the AI.

The model that writes your code, answers your questions, organizes your life — that shouldn't live on someone else's server, under someone else's terms, with someone else's off-switch. Hotz put it bluntly: "The fundamental limitation of cloud is who owns the off-switch."

Running AI locally used to be hard. On sixteen gigs of RAM — what most people actually have on their laptop — frontier models don't fit. But the landscape shifted. Small, efficient models like Bonsai run on a machine like that through llama.cpp, and you get a personal assistant that lives on your hardware, not a server farm in Virginia. I've written about that in detail — the point here is the principle: the AI is part of the stack you own, or it isn't yours.

## Your data is more valuable than ever — and they're taking it

Here's the part that makes this urgent now, not just philosophically interesting.

In the old world, your data was harvested and sold for ads. In this new era of computing, your data is more valuable than ever before — because it gets used by AI to teach it and make it better. Every photo, every message, every document, every search, every financial record you hand to a cloud service becomes training material for someone else's model. They're basically stealing your intellectual property and your private data, turning it into capability, and selling that capability back to you.

A 2026 analysis found that nine out of ten AI-related fines in recent years concerned the unlawful use of personal data — biometric data, copyrighted content, facial images, children's voice recordings — collected without consent. Meta was fined one point four billion dollars for collecting biometric data without consent. Anthropic settled for one point five billion over training on pirated books. The pattern is the same: take the data, build the model, deny the theft.

And you rely on the brand to push out updates. Google has been struggling to make a better camera app for years. Now you can make your own — just the way you like it. Annoyed by something in the operating system? Change it. Annoyed by how an app works? Change it. Build your own. If you like an app but don't want to rely on somebody else, clone it.

The hardware was always yours. The software was locked. The data was extracted. The AI was someone else's. All four were someone else's lock.

## The flip

What changed is the last mile.

You can talk to your computer now. Or talk to a model, and the model writes the code — whether that's a UI tweak, which is most of the cases, or wiring in something that doesn't work quite right for your setup. You don't need to be a developer. You need to be able to describe what you want.

You can pull your bank statements and have your AI build a mobile app and a desktop app for your financials. You can download your medical records — the data you're most locked out of, the one place the cloud's convenience argument is weakest — and feed it to a local model. You get a health dashboard that works the way you think, not the way a vendor's product manager decided. Same move for taxes, credit card statements, everything. The archive was always yours. It just had nowhere to go.

You can flash a custom ROM on your phone and make sure it's only doing what you need it to do. You can build custom apps. You can take control of your desktop, your laptop. You can run AI locally. You can publish only what you choose. The rest stays on the machine. Private. Secure. Sovereign.

## The pattern, applied

geohot spent nearly two decades proving the same thesis across phones, consoles, cars, Android, and AI compute. He cracked the lock on a device, then gave the key away. I'm applying that same thesis to everyday computing — the laptop, the AI, the apps, the data — and handing people a recipe to do it themselves.

The difference isn't that I did more. He did more, across more layers, for longer. The difference is the target. He cracked one device at a time and open-sourced the result. I'm showing people how to crack their own machine — and keep the data, the AI, and the apps that run on it.

This is the new era of computing. You own the hardware. You can own the software. You can own the AI. You can own the data. Not because someone handed you a key — because you built the lock yourself, by talking to a model, on a machine that finally answers to you.

---

*This is the why. For the how, the five-part recipe is here: [Jailbreak Your Laptop](https://paulvisciano.com) — Omarchy, local AI, your own apps, your own domain, your data home.*

Paul Visciano · Sci-Fi Labs · paulvisciano.com