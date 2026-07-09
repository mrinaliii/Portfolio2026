/**
 * Project data — single source of truth for all project information.
 * Consumed by: Work section, ProjectCard, TechPanel, CaseStudyPage, Knowledge Core.
 *
 * Rule 4 (BUILD_RULES.md): Never duplicate data. All project content lives here.
 * When the real backend (Milestone 9) is active, the API will index this same data.
 */

export interface Technology {
  name: string;
  tooltip?: string;
}

export interface CaseStudySection {
  label: string;
  heading: string;
  body: string | string[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  lqip: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  year: number;
  category: string;
  status: 'Active' | 'Completed' | 'Ongoing';
  shortDescription: string;
  description: string;
  duration: string;
  role: string;
  technologies: Technology[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudySections: CaseStudySection[];
  gallery?: GalleryImage[];
  codeExample?: string;
  coverSrc?: string;
  coverLqip?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'sentinel-ai',
    title: 'Sentinel AI',
    subtitle: 'AI-Powered SOC Analyst',
    year: 2024,
    category: 'AI/ML',
    status: 'Completed',
    shortDescription:
      'An intelligent Security Operations platform combining large language models with SIEM technologies to assist analysts in threat investigation, alert analysis, and MITRE ATT\&CK mapping.',
    description:
      'An intelligent Security Operations platform that combines large language models with modern SIEM technologies to assist analysts in threat investigation, alert analysis, and MITRE ATT&CK mapping.',
    duration: '3 months',
    role: 'Solo Engineer',
    technologies: [
      { name: 'LangChain', tooltip: 'LLM orchestration framework for building AI pipelines' },
      { name: 'OpenAI API', tooltip: 'GPT-4o-mini for threat analysis and reasoning' },
      { name: 'Splunk', tooltip: 'Security information and event management (SIEM)' },
      { name: 'Elasticsearch', tooltip: 'Full-text search and log analytics' },
      { name: 'Wazuh', tooltip: 'Open-source SIEM and XDR platform' },
      { name: 'MITRE ATT&CK', tooltip: 'Adversarial tactics and techniques knowledge base' },
      { name: 'React', tooltip: 'Frontend dashboard' },
      { name: 'FastAPI', tooltip: 'High-performance Python API backend' },
    ],
    caseStudySections: [
      {
        label: 'PROJECT OVERVIEW',
        heading: 'The Problem With Alert Fatigue',
        body: 'Modern Security Operations Centers process thousands of alerts per day. Most are noise. Analysts spend the majority of their time triaging rather than investigating — and the real threats can slip through while they are buried in false positives. Sentinel AI addresses this by using language models to pre-analyze incoming alerts, correlate them with known threat patterns, and produce natural-language summaries that give analysts the context they need to act immediately.',
      },
      {
        label: 'TECHNICAL APPROACH',
        heading: 'Layering LLMs Over Existing SIEM Infrastructure',
        body: 'Rather than replacing existing SIEM tooling, Sentinel AI sits as an intelligence layer above it. Alerts from Splunk and Elasticsearch are normalized into a common schema, then passed through a LangChain pipeline that performs contextual enrichment — cross-referencing MITRE ATT&CK tactics, pulling relevant threat intelligence, and generating a structured analyst brief. Wazuh provides the underlying host-based detection rules that feed into the alert stream.',
      },
      {
        label: 'ARCHITECTURE',
        heading: 'Four-Layer Pipeline',
        body: [
          'Ingestion Layer — Splunk and Elasticsearch connectors normalize heterogeneous alert formats',
          'Enrichment Layer — MITRE ATT&CK mapping via vector similarity search over the tactics database',
          'Reasoning Layer — LangChain pipeline with GPT-4o-mini generates analyst briefs and confidence scores',
          'Presentation Layer — React dashboard surfaces prioritized alerts with one-click drill-down into LLM analysis',
        ],
      },
      {
        label: 'KEY CHALLENGES',
        heading: 'Grounding the LLM Without Hallucination',
        body: 'The biggest engineering challenge was ensuring the LLM\'s analysis stayed grounded in real alert data rather than generating plausible-sounding but fabricated threat narratives. The solution was a retrieval step before every generation call: the system fetches the three most semantically similar historical incidents from the vector store and includes them as context. This anchors the model\'s reasoning in real patterns rather than pure generation.',
      },
      {
        label: 'MITRE INTEGRATION',
        heading: 'Mapping Alerts to Adversary Behavior',
        body: 'Each alert is embedded using the same model as the MITRE ATT&CK technique descriptions, and cosine similarity is used to identify the most relevant tactics and sub-techniques. This gives the analyst immediate framing: not just "unusual outbound connection" but "potential C2 beaconing, consistent with T1071.001 — Application Layer Protocol: Web Protocols." The mapping is surfaced in the alert brief with a confidence percentage.',
      },
      {
        label: 'OUTCOMES',
        heading: 'What The System Achieved',
        body: 'In internal testing against a synthetic alert dataset, the system correctly identified the relevant MITRE technique in 84% of cases. Analyst review time per alert was reduced from an estimated 12 minutes (manual lookup and contextual research) to under 3 minutes with the AI brief. The LLM analysis was rated "useful or highly useful" in 91% of evaluated cases.',
      },
      {
        label: 'WHAT I LEARNED',
        heading: 'Security AI Is a Human-AI Collaboration Problem',
        body: 'The most important design decision was not technical — it was epistemic. The system presents confidence scores and reasoning chains, never conclusions. An analyst who cannot explain why they escalated an alert is a liability. Sentinel AI is designed to augment analyst judgment, not replace it. This shaped every prompt, every UI decision, and every data display choice in the dashboard.',
      },
    ],
  },
  {
    slug: 'solar-energy-rag',
    title: 'Solar Energy RAG',
    subtitle: 'Retrieval-Augmented Generation Platform',
    year: 2024,
    category: 'AI/ML',
    status: 'Completed',
    shortDescription:
      'A semantic document retrieval system enabling natural language interaction with structured solar energy reports using LangChain, vector embeddings, and modern language models.',
    description:
      'Built a semantic document retrieval system that enables natural language interaction with structured solar energy reports using LangChain, vector embeddings, and modern language models.',
    duration: '2 months',
    role: 'Solo Engineer',
    technologies: [
      { name: 'LangChain', tooltip: 'Orchestration for the RAG pipeline' },
      { name: 'Vector Search', tooltip: 'Semantic similarity search over embeddings' },
      { name: 'Streamlit', tooltip: 'Interactive Python web app framework' },
      { name: 'OpenAI API', tooltip: 'Embeddings and completion model' },
      { name: 'FAISS', tooltip: 'Facebook AI Similarity Search — vector index' },
      { name: 'Python', tooltip: 'Primary language' },
    ],
    caseStudySections: [
      {
        label: 'PROJECT OVERVIEW',
        heading: 'Making Structured Reports Queryable',
        body: 'Solar energy technical reports are dense, structured, and filled with domain-specific terminology. Conventional search cannot answer questions like "What was the capacity factor deviation in Q3?" without understanding the document structure and the meaning of the query. This project built a RAG system that converts those reports into a semantic knowledge base, allowing domain users to interact with the data in natural language.',
      },
      {
        label: 'TECHNICAL APPROACH',
        heading: 'Chunking, Embedding, and Retrieval',
        body: 'Documents are preprocessed using a structure-aware chunking strategy that respects section boundaries rather than splitting naively at token limits. Each chunk is embedded using OpenAI\'s text-embedding-3-small model and stored in a FAISS index. At query time, the user question is embedded and the top-k most similar chunks are retrieved as context for the generation step.',
      },
      {
        label: 'ARCHITECTURE',
        heading: 'RAG Pipeline Design',
        body: [
          'Document ingestion — PDF parsing with structure-aware section detection',
          'Chunking — paragraph-boundary splitting with 50-token overlap to preserve context at boundaries',
          'Embedding — OpenAI text-embedding-3-small, stored in FAISS index',
          'Retrieval — cosine similarity, top-5 chunks returned with metadata',
          'Generation — GPT-4o-mini with retrieved context and domain-specific system prompt',
          'Interface — Streamlit app with query history and source citation display',
        ],
      },
      {
        label: 'KEY INSIGHT',
        heading: 'Chunk Quality Determines Answer Quality',
        body: 'The most impactful improvement to answer quality was not the choice of LLM or the retrieval algorithm — it was the chunk strategy. Naive fixed-size chunking produced answers that were technically correct but lacked context. Structure-aware chunking that preserved section headings and table associations improved answer coherence significantly. The lesson: RAG systems live or die on document preprocessing, not model selection.',
      },
      {
        label: 'OUTCOMES',
        heading: 'Results',
        body: 'The system correctly answered domain-specific queries against the test document corpus. Citation accuracy (correctly identifying the source section) was 89%. The Streamlit interface allowed domain users with no technical background to query the system effectively, validating the UX design.',
      },
      {
        label: 'WHAT I LEARNED',
        heading: 'Internship Application and Beyond',
        body: 'This system was developed during my AI/ML internship at Reliance New Energy, where it was used to enable domain-expert users to query energy datasets without requiring SQL or data engineering knowledge. The experience confirmed that the highest-value AI applications are often the ones that make existing data more accessible, not the ones that generate new content.',
      },
    ],
  },
  {
    slug: 'skillforge',
    title: 'SkillForge',
    subtitle: 'Cloud-Native Skill Analytics',
    year: 2024,
    category: 'CLOUD',
    status: 'Completed',
    shortDescription:
      'A scalable AWS-based serverless architecture that processes distributed data through secure ingestion pipelines while maintaining reliable validation across asynchronous workflows.',
    description:
      'Designed a scalable AWS-based serverless architecture that processes distributed data through secure ingestion pipelines while maintaining reliable validation across asynchronous workflows.',
    duration: '2 months',
    role: 'Solo Engineer',
    technologies: [
      { name: 'AWS Lambda', tooltip: 'Serverless compute — event-driven processing' },
      { name: 'Amazon ECS', tooltip: 'Container orchestration for longer-running workloads' },
      { name: 'DynamoDB', tooltip: 'NoSQL database for high-throughput writes' },
      { name: 'API Gateway', tooltip: 'Managed API endpoint with auth' },
      { name: 'SQS', tooltip: 'Async message queue for decoupled processing' },
      { name: 'Python', tooltip: 'Lambda function runtime' },
    ],
    caseStudySections: [
      {
        label: 'PROJECT OVERVIEW',
        heading: 'Serverless at the Architecture Level',
        body: 'SkillForge explores how to design a fully serverless data processing pipeline on AWS — from ingestion through validation to storage — that scales elastically without any managed server infrastructure. The focus was architectural rather than feature-driven: every design decision had to justify itself against cost, latency, and operational complexity.',
      },
      {
        label: 'ARCHITECTURE',
        heading: 'The Event-Driven Pipeline',
        body: [
          'API Gateway — authenticated entry point, rate-limited, request validation at the edge',
          'Lambda (Ingestion) — lightweight event consumers that normalize incoming payloads',
          'SQS — decouples ingestion from processing, provides retry and DLQ semantics',
          'Lambda (Validation) — business logic validation with explicit error routing',
          'ECS (Long-running jobs) — batch processing workloads that exceed Lambda\'s 15-minute limit',
          'DynamoDB — high-throughput writes with conditional expressions to prevent race conditions',
        ],
      },
      {
        label: 'KEY CHALLENGES',
        heading: 'Managing Asynchronous Reliability',
        body: 'Distributed async systems fail in non-obvious ways. The hardest problem was ensuring that a validation failure in the processing Lambda correctly prevented the write to DynamoDB and triggered an appropriate dead-letter queue event — without losing the original message. The solution required explicit idempotency keys on every DynamoDB write and careful SQS visibility timeout tuning.',
      },
      {
        label: 'WHAT I LEARNED',
        heading: 'Architecture Is Constraint Design',
        body: 'The most important lesson from this project was that a good serverless architecture is primarily about constraint design — choosing what the system is NOT allowed to do. Long-running synchronous operations get ECS, not Lambda. State lives in DynamoDB, never in Lambda memory. Failure modes are handled at the queue level, not in code. These constraints, applied consistently, produce a system that is boring to operate — which is the goal.',
      },
    ],
  },
  {
    slug: 'securesense',
    title: 'SecureSense',
    subtitle: 'AI-Powered Sensitive Data Protection',
    year: 2023,
    category: 'SECURITY',
    status: 'Completed',
    shortDescription:
      'A machine learning system detecting sensitive information using transformer embeddings and pattern recognition while monitoring suspicious access patterns through secure APIs and audit logging.',
    description:
      'A machine learning system that detects sensitive information using transformer embeddings and pattern recognition while monitoring suspicious access patterns through secure APIs and audit logging.',
    duration: '2 months',
    role: 'Solo Engineer',
    technologies: [
      { name: 'Transformers', tooltip: 'HuggingFace transformers for NLP classification' },
      { name: 'NLP', tooltip: 'Natural language processing for text classification' },
      { name: 'FastAPI', tooltip: 'High-performance async Python API server' },
      { name: 'Python', tooltip: 'Primary language' },
      { name: 'SQLite', tooltip: 'Audit log storage' },
    ],
    caseStudySections: [
      {
        label: 'PROJECT OVERVIEW',
        heading: 'Detecting What Should Not Be There',
        body: 'Data exfiltration often begins with sensitive data appearing where it should not — in logs, in unsanitized API responses, in files stored in the wrong location. SecureSense is a classification and monitoring system that uses transformer embeddings to detect sensitive content (PII, credentials, confidential business data) in text streams, combined with access pattern monitoring to flag suspicious retrieval behavior.',
      },
      {
        label: 'TECHNICAL APPROACH',
        heading: 'Two-Layer Detection',
        body: 'The system uses two complementary detection approaches. The first is a fine-tuned transformer model (BERT-based) trained on labeled examples of sensitive vs. non-sensitive text — this handles semantic detection where pattern matching would fail (e.g., "my card ending in four two eight one" rather than a 16-digit number). The second is a rule-based pattern layer using regex and structural heuristics for high-confidence detection of structured sensitive data formats.',
      },
      {
        label: 'ACCESS MONITORING',
        heading: 'Behavioral Anomaly Detection',
        body: 'Beyond content classification, the system monitors API access patterns: request frequency, unusual retrieval patterns, off-hours access, and bulk download behavior. These signals are aggregated into a risk score using a simple weighted model. The audit log provides a complete, tamper-evident record of all access events for forensic review.',
      },
      {
        label: 'WHAT I LEARNED',
        heading: 'Security Is Defense in Depth',
        body: 'The most important lesson was that no single detection mechanism is reliable in isolation. The transformer model catches semantic patterns that regex misses. The regex layer catches structured data that the model occasionally misclassifies. The behavioral monitoring catches exfiltration attempts that slip through content detection entirely. This project concretized what "defense in depth" means at the code level.',
      },
    ],
  },
];

/** Map of slug → Project for O(1) lookup in CaseStudyPage */
export const PROJECT_MAP: Record<string, Project> = Object.fromEntries(
  PROJECTS.map((p) => [p.slug, p]),
);
