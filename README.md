# THE FORGE 🛠️

**THE FORGE** is a high-density, real-time collaborative workspace designed for AI-assisted engineering and creative brainstorming. It leverages CRDTs for sub-millisecond synchronization and integrates deep AI context to turn "Blueprints" into synchronized "Forge Outcomes."

## 🚀 Key Features

- **Real-Time Synergy**: Powered by **Liveblocks**, allowing multiple "Architects" to collaborate on the same mission simultaneously with zero-conflict sync.
- **Living Spec (The Blueprint)**: A dynamic, 100% customizable sidebar where users can define, rename, and add binary or list-based parameters to steer AI output.
- **AI Forge Engine**: Integrated with **Google Gemini (3.0 Flash)** to generate high-fidelity technical plans, prompts, and architectural specs.
- **Context-Aware Communication**: The built-in "Comm Thread" passes real-time chat history to the Forge AI, ensuring it understands the ongoing conversation.
- **Mission Templates**: Pre-configured modes for "Antigravity Prompts," "Image Gen," and "Dev Plans."
- **Auto-Expiry**: Rooms automatically reset after 30 minutes of inactivity to ensure a clean slate for new projects.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Runtime**: Turbopack
- **Real-Time/CRDT**: Liveblocks
- **AI Engine**: Google Generative AI (Gemini API)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## ⚙️ Setup Guide

### 1. Prerequisites
Ensure you have Node.js and npm installed.

### 2. Environment Configuration
Create a `.env.local` file in the root directory. This file is required for the application to function.

```env
# Liveblocks Configuration (Get from liveblocks.io)
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_liveblocks_pk_here

# Google AI Configuration (Get from Google AI Studio)
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
```

> [!NOTE]
> The `NEXT_PUBLIC_` prefix is essential for Liveblocks as it needs to be accessible in the client-side browser environment.

### 3. Installation & Run
```bash
npm install
npm run dev
```

## 🗺️ Roadmap (To-Dos)

### [ ] Design & Experience
- **V2 High-Resistance UI**: Implement "Skeuomorphic IHS" aesthetics with heavy Tailwind backdrop-filters and 3D transforms.
- **Mobile Optimization**: Refactor the sidebars for a responsive "Sheet" layout on smaller screens.

### [ ] Core Infrastructure
- **Landing Page**: Build a premium terminal-style landing page to board new Architects.
- **OAuth Integration**: Support Google and GitHub authentication for persisted architect profiles.
- **History Retention**: Optional persistent database storage for archived Forge Outcomes.

### [ ] Workspace Polish
- **Advanced Parameter Types**: Add support for boolean toggles and color pickers in the Blueprint sidebar.
- **Export Engine**: Export Forge Outcomes directly to PDF or Markdown files.

---

*Built by the Forge AI & its Architects.*
