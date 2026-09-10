# Reddit — r/LocalLLaMA lab note

**Sub:** r/LocalLLaMA  
**Flair:** Discussion  
**Link:** none unless asked  

## Title

16GB M2 Pro, 27B at Q1_0, 14.73 GB used with the browser still open

## Body

16 GB unified, M2 Pro, no eGPU. Goal was not "run a model." It was run a model and still use the laptop.

llama.cpp (`llama-server`) + Open WebUI in Brave. Whisper in, Kokoro out. No Docker, no RAG, no second model slot.

Model is a Qwen3.6 27B Q1_0 GGUF, ~3.9 GB on disk. Hugging Face's 3.9 GB is the file. It is not the RAM bill.

What I tried first: Qwen and Gemma 4 at ordinary quants. Tight. Some OOM'd. A 27B at full precision wants ~54 GB. Mid-teens quants left nothing for a browser.

Live Activity Monitor, same machine, four states:

- Idle, no models: 8.19 GB used, swap 0
- Model resident, not generating: 11.27 GB used, swap 2.68 GB, pressure still green
- Text chat, generating: 14.66 GB used, swap 3.11 GB
- Conversation mode (Whisper + generate + Kokoro): 14.73 GB used, pressure still green

macOS swaps with pressure green. Swap here means the OS is making room, not that the box is dying. Brave and a coding session were still in the process list on that last capture. So the ~1.3 GB "left" is not headroom for a browser — the browser is already inside the 14.73.

Speed: 15.1 tok/s generation, 10.3 prompt eval. Fine for talking. Not fine for coding.

What still fails:

- Open WebUI default tools. Left them on once and the machine felt dead. Off now. System prompt kept basic.
- Coding. Still pointing opencode at glm/grok. The 1-bit 27B is not that.
- RAG / embeddings on this same 16 GB while chatting. Stripped it. Different budget.

Anyone else keeping a 16 GB machine as a daily driver with a 20B+ model loaded — what did you cut to keep the browser usable?
