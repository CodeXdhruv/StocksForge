# 📈 StocksForge (Frontend UI)

**GitHub Repository:** [https://github.com/CodeXdhruv/StocksForge](https://github.com/CodeXdhruv/StocksForge)

Welcome to the official frontend repository for **StocksForge**—an institutional-grade, AI-powered investment research terminal. 

This repository houses the decoupled Next.js 14 (App Router) user interface. It is designed for absolute performance, featuring a premium minimalist aesthetic, advanced polling via TanStack Query, and seamless Clerk authentication.

## 🚀 Technology Stack

*   **Framework:** Next.js (App Router) & React 18+
*   **Styling:** Tailwind CSS & Shadcn UI 
*   **Typography:** Inter, Space Grotesk, and JetBrains Mono (Custom Light Theme)
*   **State Management & Caching:** TanStack Query (React Query)
*   **Authentication:** Clerk Auth
*   **Animations:** Framer Motion

## ⚙️ Quick Start Setup

Ensure you have your `.env.local` configured with the necessary Clerk Publishable Keys before running.

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
```

Navigate to `http://localhost:3000` to access the terminal.

## 🔗 Connection to Backend

This frontend is strictly an API consumer. It relies on the decoupled `investment_research_agent` backend server to fetch real-time market data (via Finnhub/FMP) and execute the Gemma 4 Multi-Agent LLM debates. **Ensure the backend is running simultaneously on `localhost:3001` for full functionality.**

---
*For a comprehensive breakdown of the entire architecture, APIs, and AI workflows, please refer to the `detailed_technical_report.md` in the root workspace.*
