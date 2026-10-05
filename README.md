# Robin Saini — Personal Portfolio, Blog & Systems Showcase

> Lead / Senior Data Engineer & Agentic Systems Architect (London, UK)  
> Specializing in 1TB+/month Snowflake Lakehouses, Autonomous Agent Harnesses (Antigravity & Claude Code), and Precision Pour-Over Extractions.

---

## ☕ Overview

This is the personal portfolio and engineering platform for **Robin Saini** (`@cloudcruncher`), designed with a clean, high-performance engineer aesthetic.

### Key Highlights
- **Modern Landing Page**: High-impact metrics (15+ yrs tech, 1TB+/mo Snowflake lakehouse, 40% batch speedup, >90% manual case reduction with Agentic AI).
- **Featured GitHub Projects**: Showcase of verified public open-source repositories (`fiduciary-agent`, `open-lakehouse`, `lakehouse-markets-data`) and enterprise architecture case studies.
- **Data Engineering Skills Matrix**: Snowflake, PySpark, Airflow, dbt, Kafka, AWS, Pydantic contracts, and banking governance.
- **The Agentic Lab**: Production architectures with Google Antigravity, Claude Code, and reusable Model Context Protocol (MCP) servers.
- **The Coffee Lab & Dial-In Tool**: Interactive pour-over calculator (V60 4:6 method, Kalita Wave, Aeropress) and deep dives into grind particle size distribution, water mineral chemistry, and burr geometries.
- **London City & Food Guide**: Robin's favorite specialty coffee roasteries (WatchHouse, Workshop, Rosslyn, Origin) and authentic dining spots across London.
- **Interactive & Printable CV**: Complete resume with timeline, impact, certifications, and one-click downloads for Word (`.docx`), Plain Text (`.txt`), and clean PDF printing.
- **Markdown Blog Engine**: Built with Astro 5 Content Collections for blazing-fast, static, zero-JS reading.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 22+ (tested on Node 24)
- npm

### Development
```bash
# Install dependencies
npm install

# Start local development server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## ✍️ Writing a New Blog Post

Adding a new article is as simple as creating a new Markdown file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "A short 1-2 sentence summary of the article."
pubDate: 2026-10-15
category: "Agentic AI" # Options: "Agentic AI", "Data Engineering", "Coffee & Brewing", "London & Lifestyle"
tags: ["Antigravity", "Python", "Lakehouse"]
readTime: "6 min read"
featured: false
---

Your markdown content here...
```

Astro automatically parses frontmatter, creates static routes (`/blog/your-file-name`), formats code blocks, and calculates reading lists.

---

## 🛠️ Adding or Updating GitHub Projects

Project cards displayed across the site are defined in `src/data/projects.ts`. Simply add or edit an object in the `projects` array:

```typescript
{
  id: 'my-new-project',
  title: 'Project Title',
  repo: 'cloudcruncher/my-new-project',
  category: 'Agentic AI', // 'Agentic AI' | 'Lakehouse & Data' | 'Harnesses & Tools'
  description: 'What the project accomplishes.',
  architecture: 'Key architectural highlight.',
  tags: ['Python', 'Docker', 'MCP'],
  githubUrl: 'https://github.com/cloudcruncher/my-new-project',
  featured: true,
}
```

---

## 📄 Updating CV

- Interactive Web & Print CV: `src/components/CVSection.astro`
- Downloadable Word CV: `public/Robin_Saini_CV.docx`
- Downloadable Plain Text CV: `public/Robin_Saini_CV.txt`

---

## 🚢 Deployment

The output is pure static HTML/CSS/JS in `dist/`. You can deploy instantly to:
- **Cloudflare Pages**: `npm run build`, output directory `dist`
- **Vercel**: Framework preset `Astro`
- **Netlify**: Build command `npm run build`, publish directory `dist`
- **GitHub Pages**: Standard static workflow
