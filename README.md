# Moonlit Tarot

A polished Next.js tarot reading website with a mystical three-card flow and a server-side OpenAI reading API.

Completed using AI Agent Codex

Deployed on https://tarrot-reading-three.vercel.app

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## OpenAI Setup

Create `.env.local`:

```bash
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4.1-mini
```

The app keeps the API key server-side in `app/api/reading/route.ts`. If no key is present, it returns a local fallback reading so the UI can still be tested.

## Flow

- Ask a question on the first screen.
- Choose exactly three animated cards.
- Reveal the `Situation`, `Hidden Influence`, and `Guidance` spread.
- Generate a mystical, grounded reading from the selected cards.


## Display

![alt text](/readme/image-1.png)

![alt text](/readme/image-2.png)

![alt text](/readme/image-3.png)

![alt text](/readme/image-4.png)
