# Sci-Fi Labs — Vision & Product Suite (v2)

> Spatial web apps. A life on a globe. Same URL on a phone, a desk, and Safari on Vision Pro.

**Thesis:** Every project maps the content of a life — images, audio, video, documents, conversations — arranged in time. The apps differ only in how they let you see it.

---

## 1. Title
**A life, mapped in time.**
Different visualizations of the same data — your moments, people, places, and conversations, laid out in space so you can walk back through them.

## 2. The thesis — One data model. Many lenses.
- **Neuro Graph** — The network: people, places, emotions linked by synapses. Find the patterns between your moments.
- **Where is Paul?** — The globe: the same moments placed on Earth. Travel is the surface; life is the data.
- **Knowledge Graph** — The journal: conversations, photos, voice — private, local, scrolled through time like a scientist's log.

## 3. The interface — Not a chat window. Not a feed.
Most software lives inside a rectangle — a thread you scroll, a list you search. These apps are places you move through. The sci-fi scientist at the terminal, journaling discoveries out loud with their own archive.

## 4. The catalog — Six rooms, one lab.
| App | Tier | What it is | Role |
|---|---|---|---|
| Where is Paul? | Public | Life on a globe — travel, stays, stories, voice. | Lead door |
| Neuro Graph | Public | Memory as a living network of people & moments. | Memory face |
| Musical Cubes | Public | Tracks as 3D cubes — stems you play & sync. | Plural proof |
| The Secret Family | Public | A hierarchy of power you can walk. | Portfolio graph |
| Knowledge Graph | Private | Local AI journal — conversations, photos, time. | Shipping UI |
| JARVIS | Private | Origin — git as memory, cinematic orb. | Foundation |

## 5. Where is Paul?
The lead door. Started so family could see where Paul was as a nomad. Now a spatial record of a life — globe, timeline, comics, people, voice. Stay duration is hex color, not height. Data lives in one file: `moments/moments.js`. Static site, no backend. Same URL on phone, desk, Vision Pro. 27 countries · 53+ moments.

## 6. Neuro Graph
The seed of the memory lineage. 149 neurons, 418 synapses, growing. Nodes: people, places, activities, emotions, temporal markers — each category its own color. Temporal nodes orbit by date. Public tier of a two-tier system; private archive stays air-gapped. Focused on human consciousness: the connections between areas of your life and the patterns hiding in them.

## 7. Musical Cubes
Tracks as rotating 3D cubes; each face an instrument stem. Sync keeps stems on one playhead. Ionic React + Capacitor (web, PWA, native iOS/Android with haptics). Tracks auto-discover from a folder of WAVs. Vision: a sample marketplace around coherent cubes, credit flowing to original performers.

## 8. The Secret Family
D3 force-directed graph of ~60 people from Prof. Jiang's Danny Jones interview. Four tiers of influence by ring color. Click for a dossier. Zero dependencies. Portfolio piece only, with the inclusion-is-not-endorsement disclaimer.

## 9. Knowledge Graph
The private engine, still in final local phases — but a legitimate portfolio project. Three.js infinite canvas with time layers. Local AI on Apple Silicon Metal: Bonsai-27B, Whisper, BGE embeddings, LightRAG entity extraction, MCP write-back. Photos enriched with EXIF, faces, geocoding, VLM descriptions. **Ship plan:** publish the UI layer as a fork of the upstream project, plus a how-to. Demo clearly labeled — a recording, not a live instance.

## 10. JARVIS
The origin. Git as the memory layer — every commit a learning event. Cinematic orb UI, dual neurograph, early Whisper. Foundation that became Neuro Graph, then Knowledge Graph. README + repo only.

## 11. The through-line
Same data, different rooms:
- Neuro Graph → how the people and moments connect.
- Where is Paul? → those moments on Earth.
- Knowledge Graph → the conversations and images, privately, on your machine.
Three visualizations of one archive. Keep everything private, run it on your hardware, sit in front of it like a scientist journaling the day.

## 12. Brand — One system, every room.
- **Type:** Fraunces (display) · Inter (body) · JetBrains Mono (meta).
- **Color:** near-black oklch base (`#0E0E11`), restrained accents. Orange = interactive signal; green = live/data/memory graphs.
- Same catalog feel across globe, cubes, and graphs without flattening them.

## 13. Three doors
1. The globe — paulvisciano.com/apps/where-is-paul
2. The catalog — paulvisciano.com
3. The repos — github.com/paulvisciano

## 14. Close
A life on a globe. Same URL on a phone, a desk, and Vision Pro. Spatial web apps. Sci-Fi is the feel. The data is yours.
