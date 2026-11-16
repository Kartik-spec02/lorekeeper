# LOREKEEPER

**A compiler for fiction.**

## The Problem

Writers of long-form fiction do not forget their worlds — they are forced to re-read them. A novelist working a 12-book series spends roughly 40% of her time flipping back through earlier chapters to answer questions like *"Where was the Duke last seen?"* or *"Does Mira still speak in clipped sentences?"*. Every answer costs a minute; every inconsistency costs a reader.

> *"I've written 3 books and 400 pages of notes. I still can't remember whether the duke was in Velnor in chapter 3."*

LOREKEEPER turns those notes into a machine-checkable canon. Give it a prompt, and it writes a scene that stays in character, in place, in time — and flags the contradictions before they ship.

## Architecture

```
                    ┌──────────────┐
      Prompt ──────▶│   Router     │  classifies intent + routes
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
       ┌──────────┐  ┌──────────┐  ┌──────────┐
       │  Vector  │  │ Context  │  │  Canon   │
       │    DB    │  │  Cache   │  │  Graph   │
       └────┬─────┘  └────┬─────┘  └────┬─────┘
            │             │             │
            └─────────────┼─────────────┘
                          ▼
                    ┌──────────┐
                    │Retriever │  pulls canon + voice samples
                    └────┬─────┘
                         ▼
                    ┌──────────┐
                    │Generator │  drafts scene
                    └────┬─────┘
                         ▼
                    ┌──────────┐
                    │  Critic  │  scores voice fidelity
                    └────┬─────┘
                         ▼
                    ┌──────────┐
                    │Validator │  enforces schema + canon
                    └────┬─────┘
                         ▼
                   Scene Output
```

## Tech Stack

| Layer         | Technology                          |
| ------------- | ----------------------------------- |
| Frontend      | Next.js 14 (App Router), TypeScript |
| Styling       | Tailwind CSS, shadcn/ui             |
| Visualization | React Flow, Recharts, framer-motion |
| Backend       | FastAPI *(planned for live sprint)* |
| LLMs          | *(planned for live sprint)*         |

## Build Split (50 / 50)

### Pre-built (done)
- Full project scaffold, shadcn/ui component library
- Story Bible: 3 characters, 2 scenes, canon warnings, emotional arc data
- Animated agent pipeline (Router → Retriever → Generator → Critic → Validator) with status indicators
- Dashboard layout: Story Bible sidebar, prompt input, scene output, canon warnings, arc chart
- `usePipelineSimulation` hook — deterministic 2-second demo cycle

### Live on Nov 21
- Wire pipeline to real FastAPI endpoints
- Plug in LLM calls behind each agent step
- Vector DB retrieval from a real canon store
- "Fix canon" self-correction loop
- Persistence (SQLite/Postgres)

## Eval Rubric — Best Prompt Architecture

| # | Test case                                   | Pass criteria                                                |
| - | ------------------------------------------- | ------------------------------------------------------------ |
| 1 | Single-character scene                      | Output matches Mira's clipped diction from voice samples     |
| 2 | Multi-character scene                       | Duke's Velnori lilt distinct from Mira's; no voice bleed    |
| 3 | Canon conflict injection                    | Timeline conflict flagged; warning surfaced in UI           |
| 4 | Emotional arc continuity                   | Scene beat lands within ±1 of expected curve                 |
| 5 | Latency under load                          | Full pipeline < 3s; per-step latency visible in trace       |

## Run Locally

```bash
npm install
npm run db:generate
npm run db:migrate -- --name init
npm run dev
# open http://localhost:3000/dashboard
```

Copy `.env.example` to `.env` and set a long random `AUTH_SECRET` before using the
authentication routes. The local SQLite database is created at `prisma/dev.db`
and is intentionally ignored by Git.

Authentication endpoints:

- `POST /api/auth/register` — create an account with `name`, `email`, and `password`
- `POST /api/auth/login` — start a session with `email` and `password`
- `GET /api/auth/me` — retrieve the current session user
- `POST /api/auth/logout` — clear the current session

## Team

<!-- Add names and roles before the sprint. -->