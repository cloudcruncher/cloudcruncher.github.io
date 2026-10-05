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
    architecture: 'Kafka event streaming with tenant-isolated ACLs, Apache Iceberg / Delta Lake storage format, Trino query engine, and automated data quality gates.',
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
    architecture: 'Airflow partition sensors, PySpark market data transforms, Snowflake micro-partition clustering, and automated backfills.',
    tags: ['Snowflake', 'Airflow', 'PySpark', 'Market Data', 'Financial Engineering', 'Kafka'],
    githubUrl: 'https://github.com/cloudcruncher/lakehouse-markets-data',
    featured: true,
  },
];

export interface CaseStudy {
  id: string;
  title: string;
  company: string;
  period: string;
  category: 'Enterprise Agentic AI' | 'Lakehouse Modernisation' | 'Cloud Data Lake';
  impact: string;
  description: string;
  highlights: string[];
  techStack: string[];
}

export const enterpriseCaseStudies: CaseStudy[] = [
  {
    id: 'agentic-investigation-natwest',
    title: 'Enterprise Agentic Investigation & Decision-Support System',
    company: 'NatWest Group (Enterprise Innovation)',
    period: 'Aug 2025 – Present',
    category: 'Enterprise Agentic AI',
    impact: '>90% reduction in manual case-handling time across 300+ daily onboarding applications',
    description: 'Architected and delivered the data engineering foundation for enterprise multi-agent workflows. Transitioned proof-of-concept AI agents to production with decoupled Model Context Protocol (MCP) servers, Pydantic data contracts, and jittered database writers.',
    highlights: [
      'Packaged reusable MCP servers consumed by downstream agents with zero ad-hoc data access code',
      'Designed Pydantic schema validation gates and audit trails meeting UK banking and financial-crime standards',
      'Engineered Splunk observability pipelines tracking tool-call latency, token efficiency, and LLM-as-a-judge decision drift',
      'Reduced database lock contention to near zero via jittered exponential back-off microservice writers',
    ],
    techStack: ['Python', 'MCP Protocol', 'Google Antigravity', 'Claude Code', 'Snowflake', 'Airflow', 'PostgreSQL', 'Splunk', 'Pydantic'],
  },
  {
    id: 'snowflake-esg-lakehouse',
    title: '1TB+/Month Snowflake ESG & Climate Analytics Platform',
    company: 'NatWest Group (Climate Analytics)',
    period: 'Jul 2023 – Aug 2025',
    category: 'Lakehouse Modernisation',
    impact: '40% faster batch processing and 30% reduction in data quality incidents',
    description: 'Led the engineering team delivering NatWest’s enterprise ESG and climate risk data platform on Snowflake, processing 1TB+ of refreshed data monthly across 50+ internal and external vendor feeds.',
    highlights: [
      'Redesigned batch processing with PySpark and dbt incremental models, slashing daily execution by 40%',
      'Optimised Snowflake query partition pruning by 85% through clustering keys and materialised views',
      'Implemented automated CI testing for data loaders and perimeter quality gates to catch schema drift before warehouse landing',
      'Collaborated closely with Climate Risk Data Scientists and regulatory compliance teams',
    ],
    techStack: ['Snowflake', 'PySpark', 'dbt Core', 'Apache Airflow', 'GitLab CI/CD', 'Docker', 'SQL'],
  },
  {
    id: 'aws-ml-data-lake-lloyds',
    title: 'Enterprise ML-Ready Data Lake & Warehouse Modernisation',
    company: 'Lloyds Banking Group (TCS)',
    period: 'Jun 2019 – Sep 2021',
    category: 'Cloud Data Lake',
    impact: '50% lower ETL load times and 45% fewer data errors',
    description: 'Designed and deployed an ML-ready data lake on AWS powering Lloyds’ enterprise data science programmes. Led a 5-member team managing Teradata, IBM DB2 operational stores, and cloud migrations.',
    highlights: [
      'Architected S3, AWS Glue, EMR, and Athena pipelines serving analytical and data science workloads',
      'Tuned high-volume SQL and batch applications, dramatically reducing CPU consumption on core operational datastores',
      'Implemented GDPR-compliant data governance frameworks and automated reconciliation gates',
    ],
    techStack: ['AWS (S3, Glue, EMR, Athena)', 'Teradata', 'IBM DB2', 'Python', 'SQL', 'Shell Scripting'],
  },
];
