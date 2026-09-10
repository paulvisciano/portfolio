# Comments this week — blog-backed only

Lab note posted then removed (need 5 r/LocalLLaMA comment karma):
https://www.reddit.com/r/LocalLLaMA/comments/1w6n8wl/16gb_m2_pro_27b_at_q1_0_1473_gb_used_with_the/

When karma clears, repost with Activity Monitor receipts (idle + conversation PNGs already in the blog). Do not generate fake monitors.

Posted 3 Sep 2026. No blog links.

## 1. r/LocalLLaMA — sanoTTS
https://www.reddit.com/r/LocalLLaMA/comments/1w6lmmg/i_released_sanotts_smallest_complete_tts_stack_in/
Source: blog/local-tts-on-16gb.html

On a 16GB M2 Pro I already had the 27B loaded, Brave, and VS Code. XTTS-v2 wanted ~5 GB RAM on load plus another 2 GB VRAM — it does not fit next to the model. Piper was fast and the Lessac voices were intelligible, but still synthetic within a few sentences. What actually shipped was Kokoro JS (82M, in the browser, no extra backend RAM). Open WebUI already had it; I just hadn't wired it. Curious how sanoTTS sounds next to that on a machine that's already at 12.6 GB spoken for / 2.7 GB left.

## 2. r/LocalLLaMA — Rate a potential setup for Qwen 3.x 27b
https://www.reddit.com/r/LocalLLaMA/comments/1w6g47u/rate_a_potential_setup_for_qwen_3x_27b/
Source: blog/running-local-ai-on-16gb-mac.html + original 16GB reddit measurements

I run a Qwen3.6 27B Q1_0 on 16GB unified (M2 Pro, no eGPU). Chat is 15.1 tok/s gen, 14.73 GB used in conversation mode with Whisper+Kokoro, browser still open. Agentic coding is not that — I still point opencode at glm/grok. For a 27B coding agent your 24GB 7900xtx is the right class. 16GB unified is the camper van in your metaphor.

## 3. r/LocalLLaMA — local AI can't be disabled
https://www.reddit.com/r/LocalLLaMA/comments/1w6aec4/local_ai_cant_be_disabled/
Source: same 16GB stack, llama.cpp

Same here. llama.cpp on a 16GB M2 Pro, 27B Q1_0, 15.1 tok/s. Cloud can go down. The laptop does not. Coding still waits on glm/grok though — the local box is the conversation machine, not the agent.

## 4. r/omarchy — Omarchy Web
https://www.reddit.com/r/omarchy/comments/1w6jr36/omarchy_web_try_it_without_a_vm/
Source: blog/omarchy.html (Super+K, Super+Space, bindings.lua)
Posted.

## 5. r/LocalLLaMA — local coding agent on Strix Halo
https://www.reddit.com/r/LocalLLaMA/comments/1w6c3ad/running_a_local_coding_agent_on_strix_halo_with/
Source: 16GB stack — chat works, agent loop still glm/grok
Posted.

Skipped: r/degoogle upgrades (Android keyboard stack, no matching receipts). r/selfhosted new queue was Nextcloud/music.
