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
  isEnterpriseCaseStudy?: boolean;
}

export const projects: Project[] = [
  {
    id: 'fiduciary-agent',
    title: 'Fiduciary Agent - Autonomous Personal Finance & Intelligence',
    repo: 'cloudcruncher/fiduciary-agent',
    category: 'Agentic AI',
    description: 'Autonomous personal fiduciary intelligence harness. 100% on-device local AI (Apple Silicon Metal GPU), UK Open Banking (TrueLayer/Wise), deterministic math core & tax optimization.',
    architecture: 'Enriched transaction intelligence, deterministic tax band models, domain link extraction, and interactive LLM inspection drawer.',
    tags: ['Python', 'Agentic AI', 'Metal GPU', 'FastAPI', 'Pydantic', 'Finance'],
    githubUrl: 'https://github.com/cloudcruncher/fiduciary-agent',
    featured: true,
  },
  {
    id: 'open-lakehouse',
    title: 'Open Lakehouse - Enterprise Streaming & Multi-Tenant Platform',
    repo: 'cloudcruncher/open-lakehouse',
    category: 'Lakehouse & Data',
    description: 'Production-shaped open lakehouse: Apache Iceberg + Polaris Catalog + Trino + Open Policy Agent (OPA), CDC streaming, and a governed AI assistant. Self-healing, chaos-tested, SLO-driven.',
    architecture: 'Debezium CDC into Kafka with tenant-isolated ACLs, Apache Iceberg tables behind a Polaris REST catalog, Trino with OPA row filters and masks, and chaos-tested self-healing.',
    tags: ['Apache Iceberg', 'Trino', 'Kafka', 'PySpark', 'Polaris', 'Data Contracts'],
    githubUrl: 'https://github.com/cloudcruncher/open-lakehouse',
    featured: true,
  },
  {
    id: 'lakehouse-markets-data',
    title: 'Lakehouse Markets Data - Markets & Payments Intelligence',
    repo: 'cloudcruncher/lakehouse-markets-data',
    category: 'Lakehouse & Data',
    description: 'Markets & Payments Intelligence: Data engineering tenant of open-lakehouse handling Coinbase crypto streams, card authorisations, FX rates, sanctions screening; Kappa architecture and medallion data products.',
    architecture: 'Dagster assets run PySpark transforms through bronze, silver and gold medallion layers, with Kafka as the replayable source of truth.',
    tags: ['Dagster', 'PySpark', 'Kafka', 'Market Data', 'Financial Engineering', 'Medallion'],
    githubUrl: 'https://github.com/cloudcruncher/lakehouse-markets-data',
    featured: true,
  },
];

export interface CaseStudy {
  id: string;
  title: string;
  company: string;
  period: string;
  category: 'Enterprise Agentic AI' | 'Lakehouse Modernisation' | 'Retail Analytics';
  impact: string;
  description: string;
  highlights: string[];
  techStack: string[];
}

export const enterpriseCaseStudies: CaseStudy[] = [
  {
    id: 'agentic-investigation-natwest',
    title: 'Data Foundation for Enterprise Agentic Investigation & Decision Support',
    company: 'NatWest Group (Enterprise Innovation)',
    period: 'Aug 2025 – Present',
    category: 'Enterprise Agentic AI',
    impact: '>90% reduction in manual case-handling time across 300+ daily onboarding applications',
    description: 'The data engineering side of enterprise agentic workflows: connecting agents to data sources, giving them trustworthy datasets and context, and helping take proof-of-concept agents to production. Delivered through reusable Model Context Protocol (MCP) servers, Pydantic data contracts, quality gates and a resilient Snowflake writer.',
    highlights: [
      'Packaged a reusable, PII-guardrailed MCP server (bounded JSON slices, role-based field allow-lists, full audit trail) consumed by downstream agents with zero ad-hoc data access code, and reused end-to-end by DAVE',
      'Built the data engineering behind DAVE (Decision Assist for complaints) and the LLM-as-a-judge evaluation microservice, including a near-real-time Kafka evaluation pipeline with a batch REST path writing metrics to Snowflake',
      'Built PySpark model-monitoring pipelines on AWS EMR Serverless (PostgreSQL and on-prem sources to S3 Parquet and Snowflake) computing accuracy, precision, recall, F1, LLM token usage and latency, orchestrated by Airflow',
      'On the Colleague Assist / CAI contact-centre programme, modelled AWS Connect call transcripts and contact-trace records in Snowflake (turn-timing and silence analytics) for Data Science',
      'Complaints investigation delivered in June, helping reimagine the complaints process with AI (see NatWest’s “Transforming Complaints with GenAI”)',
      'Designed Pydantic schema validation gates and audit trails meeting UK banking and financial-crime standards',
      'Engineered Splunk observability pipelines covering agent execution, tool-call performance, and decision quality',
      'Built a resilient Snowflake writer for the agent evaluation service: jittered, batched writes so the warehouse is not woken for every insert, reducing deployment issues to near zero',
    ],
    techStack: ['Python', 'MCP Protocol', 'Kiro CLI', 'Snowflake', 'Airflow', 'PySpark', 'AWS EMR Serverless', 'Kafka', 'PostgreSQL', 'Splunk', 'Pydantic'],
  },
  {
    id: 'snowflake-esg-lakehouse',
    title: '1TB+/Month Snowflake ESG & Climate Analytics Platform',
    company: 'NatWest Group (Climate Analytics)',
    period: 'Jul 2023 – Aug 2025',
    category: 'Lakehouse Modernisation',
    impact: '40% faster batch processing and 30% reduction in data quality incidents',
    description: 'Led the engineering team delivering NatWest’s ESG and climate data platform on Snowflake, processing 1TB+ of data monthly from 50+ internal and external sources. Built with Snowflake, Airflow and dbt in a layered, medallion-style design, governed by a Data Guardian framework (contracts and data quality), enriched with many third-party datasets, and published as emissions data products on a data marketplace.',
    highlights: [
      'Layered, medallion-style Snowflake design (RAW → INT → PRS → presentation), orchestrated with Airflow on AWS MWAA and transformed with dbt',
      'Data Guardian framework: data contracts and data-quality checks so each source is trusted before it is used',
      'Ingested many third-party data sources to enrich the ESG lakehouse alongside internal data',
      'Published emissions data products to a data marketplace for downstream consumers',
      'Cut batch processing by 40% (PySpark and dbt optimisation) and data quality incidents by 30% (metadata-driven ingestion where new sources are onboarded by config not code, idempotent duplicate-load guards, dbt snapshots and automated dbt tests)',
      'Cut Snowflake compute cost with per-model warehouse routing and transient tables; automated dbt deployment to MWAA via a build-and-promote pipeline (Artifactory → S3) with CloudWatch and SNS failure alerting',
      'Worked with Data Architects and Data Scientists to deliver production climate risk models; set team engineering standards and mentored junior engineers',
    ],
    techStack: ['Snowflake', 'Airflow (AWS MWAA)', 'dbt', 'PySpark', 'Python', 'SQL', 'GitLab CI/CD', 'Docker'],
  },
  {
    id: 'retail-analytics-natwest',
    title: 'Retail Data Marts for Decision-Making',
    company: 'NatWest Group (Retail Data & Analytics Decisioning)',
    period: 'Sep 2021 – Jul 2023',
    category: 'Retail Analytics',
    impact: 'Trusted customer, mortgage and deposit data for retail leadership decisions',
    description: 'Built enterprise batch pipelines and Snowflake data models for the Retail Data & Analytics Decisioning team. Customer, mortgage and deposit data marts gave the business a dependable foundation for better decisions by retail leadership.',
    highlights: [
      'Built customer, mortgage and deposit data marts for retail analytics and decisioning',
      'Engineered enterprise batch pipelines in Python, SQL, Snowflake, PySpark and StreamSets, including PySpark pipelines for Customer Lifetime Value (CLV) analytics',
      'Designed Snowflake data models for high-volume analytical workloads, tuned with clustering, partitioning and materialised views',
    ],
    techStack: ['Snowflake', 'PySpark', 'Python', 'SQL', 'StreamSets'],
  },
];
