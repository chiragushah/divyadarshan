# DivyaDarshan 🛕

India's Temple Explorer & Yatra Planner — Next.js + MongoDB Atlas + AI

**Stack:** Next.js 14 · MongoDB Atlas · NextAuth · Groq · Gemini · Claude · Vercel

---

## Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/divyadarshan.git
cd divyadarshan
npm install
cp .env.example .env.local   # fill in your keys
npm run seed                  # load temples into MongoDB
npm run dev                   # http://localhost:3000
```

## Deploy (GitHub → Vercel)

```bash
git init && git add . && git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/divyadarshan.git
git push -u origin main
# Then: vercel.com → New Project → Import repo → Add env vars → Deploy
```

See `.env.example` for all required environment variables.
See full setup guide in the downloaded README for step-by-step instructions.
