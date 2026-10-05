## Development

Commands:
- `npm run dev` : Start local development server
- `npm run build` : Static production build to `dist/`
- `npm run preview` : Preview production build

## Architecture & Codebase Conventions
- **Framework**: Astro 5 (Static Output)
- **Styling**: Modern CSS variables & tokens (`src/styles/global.css`) supporting Dark and Light mode
- **Blog Engine**: Astro Content Collections (`src/content.config.ts`, `src/content/blog/*.md`)
- **Projects Registry**: `src/data/projects.ts`
- **CV / Resume**: `src/components/CVSection.astro` + files in `public/` (`Robin_Saini_CV.docx`, `Robin_Saini_CV.txt`)

## Key Sections & Features
- `/` (`src/pages/index.astro`): Comprehensive landing page with hero, GitHub projects, data engineering skills, agentic AI lab, coffee corner with pour-over calculator, and London restaurant guide.
- `/projects` (`src/pages/projects.astro`): Filterable projects portfolio.
- `/blog` (`src/pages/blog/index.astro`): Content collection blog index.
- `/blog/[...slug]` (`src/pages/blog/[...slug].astro`): Markdown reader with code highlighting.
- `/cv` (`src/pages/cv.astro`): Executive CV with print-to-PDF stylesheet and Word document downloads.
- `/about` (`src/pages/about.astro`): Career evolution timeline and personal passions.
