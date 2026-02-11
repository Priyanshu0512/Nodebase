## ⚙️ Nodebase - Workflow Automation Tool

## 🎯 Overview

**Nodebase** is a modern, full-stack workflow automation platform built with Next.js, designed to let you visually design, run, and monitor complex workflows composed of AI providers, HTTP requests, and third‑party triggers.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.9-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7.2.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Inngest](https://img.shields.io/badge/Inngest-3.49.0-4B0082?style=for-the-badge)](https://www.inngest.com/)

---

## 🌐 Live Demo

🚀 **Live app**: `https://nodebase-beta-mauve.vercel.app/`

---

## ✨ Key Features

- 🧩 **Visual Workflow Builder** – Drag-and-drop editor powered by React Flow to compose workflows from nodes and connections.
- 🤖 **AI Execution Nodes** – Built-in executors for OpenAI, Anthropic, and Gemini to chain LLM calls into workflows.
- 🌐 **HTTP Request & Webhook Triggers** – Trigger workflows via HTTP requests, Stripe webhooks, Google Forms, and manual triggers using Inngest.
- 📊 **Execution History & Status** – Dedicated executions list and detail views with real-time status, timing, and output.
- 🔐 **Credentials Management** – Securely store API keys and secrets per user/workflow and reuse them in nodes.
- 👤 **Authentication & Billing** – Email/password + OAuth (GitHub, Google) using Better Auth and Polar for subscriptions/billing portal.
- 🎨 **Modern, Responsive UI** – Tailwind CSS and shadcn/ui components for a polished dashboard experience across devices.

---

## 🚀 Tech Stack

### Frontend

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI**: Tailwind CSS, shadcn/ui, Lucide icons
- **State/Data**: TanStack React Query, tRPC client
- **Canvas**: @xyflow/react (React Flow)

### Backend

- **Runtime**: Next.js API routes (App Router)
- **Workflow Orchestration**: Inngest
- **Database**: PostgreSQL (e.g. Neon) via Prisma ORM
- **Auth & Billing**: Better Auth, @polar-sh/better-auth, Polar SDK
- **Background / Realtime**: @inngest/realtime for node status streaming

### Tooling

- Package Manager: npm
- Linting/Formatting: Biome
- Type Checking: TypeScript
- Deployment: Vercel

---

## 📁 Project Structure

```bash
nodebase/
├── public/                         # Static assets
├── src/
│   ├── app/                        # Next.js routes (auth, dashboard, API)
│   │   ├── (auth)/                 # Login, signup
│   │   ├── (dashboard)/            # Workflows, executions, credentials UI
│   │   ├── api/                    # API routes (tRPC, Inngest, webhooks)
│   │   └── layout.tsx              # Root layout
│   ├── components/                 # Reusable UI components (shadcn/ui, react-flow)
│   ├── features/                   # Feature-based modules
│   │   ├── workflows/              # Workflow CRUD, editor, execution button
│   │   ├── executions/             # Execution list, detail, live status
│   │   ├── credentials/            # Credentials management
│   │   ├── triggers/               # Stripe, Google Forms, manual triggers
│   │   └── auth/                   # Auth forms and flows
│   ├── inngest/                    # Inngest client, functions, channels, utils
│   ├── lib/                        # Auth, DB, encryption, Polar, shared utils
│   └── trpc/                       # tRPC router, server, client init
├── next.config.ts                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
└── biome.json                      # Biome configuration
```

---

## 🛠 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (e.g. Neon)
- Inngest account & keys
- GitHub and/or Google OAuth apps (for social login)
- Polar account (if you want billing)

### Installation

```bash
git clone https://github.com/your-org/nodebase.git
cd nodebase

# Install dependencies
npm install

# Run database migrations
npx prisma migrate deploy

# Start development server
npm run dev
```

Visit `http://localhost:3000` to access the app.

---

## ⚙️ Environment Variables

Create a `.env` file based on `.env` in the repo. Important variables include:

- `DATABASE_URL` – PostgreSQL connection string.
- `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` – Better Auth configuration.
- `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` – GitHub OAuth.
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` – Google OAuth.
- `INNGEST_EVENT_KEY`, `INNGEST_SIGNING_KEY` – Inngest credentials.
- `POLAR_ACCESS_TOKEN`, `POLAR_SUCCESS_URL` – Polar integration.
- `NEXT_PUBLIC_APP_URL` – Public base URL; used on the client.

Match these in your deployment provider (e.g. Vercel) for production.

---

## 📦 Deployment

### Vercel

```bash
npm run build
npm start
```

On Vercel:

1. Import the repository.
2. Configure the required environment variables.
3. Deploy to Preview/Production.

In Inngest, configure your environment’s app URL to:

```text
https://your-vercel-domain.vercel.app/api/inngest
```

and ensure `INNGEST_EVENT_KEY` and `INNGEST_SIGNING_KEY` match what you set on Vercel.

---

## 📚 API / Workflows Overview

Some core flows:

- `POST /api/trpc/workflows.execute` – Trigger a workflow execution via tRPC.
- `POST /api/webhooks/stripe` – Stripe webhook handler that can start workflows.
- `POST /api/webhooks/google-form` – Google Form webhook handler to start workflows.
- `GET|POST /api/inngest` – Inngest function handler for `execute-workflow`.

These integrate with `src/inngest/function.ts` and the visual editor to execute workflows end‑to‑end.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork this repository.
2. Create a new branch: `git checkout -b feature/new-feature`.
3. Commit your changes: `git commit -m "Add new feature"`.
4. Push the branch: `git push origin feature/new-feature`.
5. Open a Pull Request with details of your changes.

---

❤️ **Crafted with love** by [**Priyanshu**](https://github.com/Priyanshu0512)\
⭐ **Star this repo if it helps!**
