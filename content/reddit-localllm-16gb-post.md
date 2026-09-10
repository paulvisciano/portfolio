# Reddit draft — r/LocalLLM

## Title

Local AI on a 16 GB Mac

## Flair

Discussion

## Body

I have been on this mission for a while, get local AI working on my Mac and still be able to use it to browse and code.

I tried Qwen and Gemma 4 first — all tight fits on 16 GB unified, some OOM'd. A 27B wants ~54 GB at full precision, ordinary quants land mid-teens, nothing left for a browser and an editor.

Bonsai is what clicked: a Qwen3.6 27B at 1-bit (Q1_0), ~3.9 GB on disk. Paired with Open WebUI I have a fully functioning local agent I can have conversations with. Two tuning choices is what made it feel responsive: I disabled the default tools (tons of slowness) and kept the system prompt basic.

The workflow runs:

Speak > Whisper transcribes > Bonsai infers > Kokoro speaks.

All local, the audio never leaves the machine.

Brave, opencode, ollama still work during inference.

Speed: 15.1 tok/s generation, 10.3 prompt eval. Not cloud-fast, but fast enough for a conversation.

Still use opencode + glm/grok for coding, but my personal convos stay private thanks to Bonsai.

Anyone else running a similar setup? Tips on squeezing even more out of my laptop?

Full write-up with the screenshots: https://paulvisciano.com/blog/running-local-ai-on-16gb-mac