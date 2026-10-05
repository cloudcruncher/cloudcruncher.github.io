export interface Project {
  id: string;
  title: string;
  repo: string;
  category: 'Agentic AI' | 'Lakehouse & Data' | 'Harnesses & Tools';
  description: string;
  architecture: string;
  tags: string[];
  githubUrl: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'fiduciary-agent',
    title: 'Fiduciary Agent - Autonomous Personal Finance & Intelligence',
    repo: 'cloudcruncher/fiduciary-agent',
    category: 'Agentic AI',
    description: 'Autonomous personal finance agent & transaction intelligence engine with AI inspection modal, tax badges, UK pension model, and web dashboard.',
    architecture: 'Enriched transaction intelligence, deterministic tax band models, domain link extraction, and interactive LLM inspection drawer.',
    tags: ['Python', 'Agentic AI', 'FastAPI', 'Pydantic', 'Finance', 'LLM'],
    githubUrl: 'https://github.com/cloudcruncher/fiduciary-agent',
    featured: true,
  },
  {
    id: 'open-lakehouse',
    title: 'Open Lakehouse - Enterprise Streaming & Multi-Tenant Platform',
    repo: 'cloudcruncher/open-lakehouse',
    category: 'Lakehouse & Data',
    description: 'Multi-tenant open lakehouse architecture supporting real-time streaming, tenant Kafka ACLs, schema registries, and high-throughput analytical query engines.',
    architecture: 'Kafka event streaming with tenant-isolated ACLs, Apache Iceberg / Delta Lake storage format, and automated data quality gates.',
    tags: ['Kafka', 'PySpark', 'Lakehouse', 'Iceberg', 'Docker', 'Data Contracts'],
    githubUrl: 'https://github.com/cloudcruncher/open-lakehouse',
    featured: true,
  },
  {
    id: 'lakehouse-markets-data',
    title: 'Lakehouse Markets Data - Financial Ingestion & Sensors',
    repo: 'cloudcruncher/lakehouse-markets-data',
    category: 'Lakehouse & Data',
    description: 'Orchestrated financial market data pipelines, time-series ingestion, first-run partition sensors, and automated validation.',
    architecture: 'Airflow partition sensors, PySpark market data transforms, Snowflake micro-partition clustering, and automated backfills.',
    tags: ['Snowflake', 'Airflow', 'PySpark', 'Market Data', 'Financial Engineering'],
    githubUrl: 'https://github.com/cloudcruncher/lakehouse-markets-data',
    featured: true,
  },
  {
    id: 'job-harness',
    title: 'Job Harness - Multi-Agent Career Sourcing & UK Tax Engine',
    repo: 'cloudcruncher/job-harness',
    category: 'Harnesses & Tools',
    description: 'Multi-agent autonomous career search harness: multi-source scraping, role fit scoring, UK PAYE/Inside-IR35 tax model, pipeline tracking, and resume generation.',
    architecture: 'Autonomous scraper agents, deterministic UK tax calculations (pension relief & National Insurance), and Pydantic-validated application state machines.',
    tags: ['Agentic AI', 'Python', 'Tax Modeling', 'Antigravity', 'Automation'],
    githubUrl: 'https://github.com/cloudcruncher/job-harness',
    featured: true,
  },
  {
    id: 'Real_Estate',
    title: 'Real Estate Intelligence & Listing Quality Gate',
    repo: 'cloudcruncher/Real_Estate',
    category: 'Harnesses & Tools',
    description: 'Automated property listing search, listing quality gate scoring, automated enquiry generation, and contact portal integrations.',
    architecture: 'Listing quality validation gates, headless automated contact flows, and structured lead evaluation.',
    tags: ['Python', 'Automation', 'Quality Gates', 'Scraping'],
    githubUrl: 'https://github.com/cloudcruncher/Real_Estate',
    featured: false,
  },
  {
    id: 'hackathon-2026',
    title: 'AI Defense & Safety Evaluation Harness',
    repo: 'cloudcruncher/hackathon-2026',
    category: 'Agentic AI',
    description: 'AI defense-eval test harness: reproducible safety benchmark scripts, CSV metrics aggregation, plotting, and adversarial robustness testing.',
    architecture: 'LLM-as-a-judge evaluation pipelines, defense scoring curves, and automated regression reporting.',
    tags: ['AI Safety', 'Evaluation', 'Python', 'LLM-as-a-judge', 'Benchmarking'],
    githubUrl: 'https://github.com/cloudcruncher/hackathon-2026',
    featured: false,
  },
];
