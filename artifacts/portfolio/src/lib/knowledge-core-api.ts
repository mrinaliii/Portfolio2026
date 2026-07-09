/**
 * knowledge-core-api.ts — Knowledge Core API client.
 *
 * In Milestone 5, this returns a mock response.
 * In Milestone 9, replace `mockQuery` with a real `fetch` to the Express API.
 * The KnowledgeCoreResponse contract is frozen — the swap is one line.
 *
 * Public-facing name: "Ask My AI" — "Knowledge Core" is internal branding.
 */

export interface KnowledgeCoreResponse {
  answer: string;
  citations: Array<{ label: string; slug?: string }>;
  relatedProjects: Array<{ title: string; slug: string }>;
  followUps: string[];
  error?: string;
}

/** Simulated network delay — makes the mock feel realistic */
const MOCK_DELAY_MS = 1200;

const MOCK_RESPONSES: Record<string, KnowledgeCoreResponse> = {
  default: {
    answer:
      "I'm Mrinali's AI assistant. I can tell you about her projects, technical decisions, engineering experience, certifications, and current learning goals. Try asking about Sentinel AI, the Solar Energy RAG system, or her work at Reliance New Energy.",
    citations: [],
    relatedProjects: [
      { title: 'Sentinel AI', slug: 'sentinel-ai' },
      { title: 'Solar Energy RAG', slug: 'solar-energy-rag' },
    ],
    followUps: [
      'Tell me about Sentinel AI.',
      'Explain the Solar Energy RAG system.',
      'What technologies does she use?',
    ],
  },
  sentinel: {
    answer:
      "Sentinel AI is an intelligent Security Operations platform that combines LangChain, GPT-4o-mini, and SIEM technologies (Splunk, Elasticsearch, Wazuh) to assist security analysts in threat investigation and alert triage. The system layers an LLM reasoning pipeline over existing SIEM infrastructure rather than replacing it. Alerts are normalized, cross-referenced with the MITRE ATT&CK knowledge base via vector similarity search, and summarized into structured analyst briefs — reducing triage time and improving the signal-to-noise ratio for analysts. The key design principle: the AI augments analyst judgment, never replaces it.",
    citations: [
      { label: 'Sentinel AI', slug: 'sentinel-ai' },
      { label: 'Experience — Cybersecurity Intern' },
    ],
    relatedProjects: [
      { title: 'SecureSense', slug: 'securesense' },
      { title: 'Solar Energy RAG', slug: 'solar-energy-rag' },
    ],
    followUps: [
      'How does the MITRE ATT&CK mapping work?',
      'What was the hardest engineering challenge?',
      'Tell me about SecureSense.',
    ],
  },
  rag: {
    answer:
      "The Solar Energy RAG system is a semantic document retrieval platform built during her internship at Reliance New Energy. It enables domain users to query structured energy reports using natural language. The architecture uses LangChain to orchestrate a pipeline: documents are chunked at paragraph boundaries (preserving section structure), embedded with OpenAI's text-embedding-3-small, and stored in a FAISS vector index. At query time, the top-5 most semantically similar chunks are retrieved as context for GPT-4o-mini generation. The key insight: chunk quality determines answer quality more than model selection.",
    citations: [
      { label: 'Solar Energy RAG', slug: 'solar-energy-rag' },
      { label: 'Experience — AI/ML Intern at Reliance New Energy' },
    ],
    relatedProjects: [
      { title: 'Sentinel AI', slug: 'sentinel-ai' },
    ],
    followUps: [
      'How does the chunking strategy work?',
      'Tell me about Sentinel AI.',
      'What is she currently learning?',
    ],
  },
  skills: {
    answer:
      "Mrinali works across AI/ML (LangChain, PyTorch, TensorFlow, RAG, NLP, Prompt Engineering), Cybersecurity (Splunk, Elasticsearch, Wazuh, MITRE ATT&CK, Vulnerability Assessment, Web Application Security), Cloud (AWS Lambda, ECS, DynamoDB, Docker), and Software Engineering (Python, C++, SQL, FastAPI, React, Node.js, Git). Her strongest area is the intersection of AI and security — building intelligent systems that are both technically capable and defensively sound.",
    citations: [
      { label: 'Technical Stack' },
      { label: 'Resume' },
    ],
    relatedProjects: [
      { title: 'Sentinel AI', slug: 'sentinel-ai' },
      { title: 'Solar Energy RAG', slug: 'solar-energy-rag' },
    ],
    followUps: [
      'What is she currently deepening?',
      'Tell me about her AI projects.',
      'What certifications does she have?',
    ],
  },
  resume: {
    answer:
      "Mrinali is pursuing a B.Tech in Computer Science & Engineering (Information Security) at Vellore Institute of Technology, with a CGPA of 9.15/10. She has completed two internships: AI/ML Intern at Reliance New Energy (developed hybrid retrieval systems for energy datasets and AI-powered dashboards) and Cybersecurity Intern at Abhita Aerospace (vulnerability assessments, web application security testing, network analysis). She holds certifications in IBM Generative AI using Watsonx, Supervised Machine Learning (Stanford/DeepLearning.AI), and Advanced Learning Algorithms (Stanford/DeepLearning.AI).",
    citations: [
      { label: 'Resume' },
      { label: 'Education — VIT' },
    ],
    relatedProjects: [
      { title: 'Sentinel AI', slug: 'sentinel-ai' },
      { title: 'Solar Energy RAG', slug: 'solar-energy-rag' },
    ],
    followUps: [
      'Tell me about her internship experience.',
      'What certifications does she have?',
      'What projects has she built?',
    ],
  },
};

function selectMockResponse(query: string): KnowledgeCoreResponse {
  const q = query.toLowerCase();
  if (q.includes('sentinel') || q.includes('soc') || q.includes('security operations')) {
    return MOCK_RESPONSES.sentinel;
  }
  if (q.includes('rag') || q.includes('solar') || q.includes('retrieval')) {
    return MOCK_RESPONSES.rag;
  }
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('tool')) {
    return MOCK_RESPONSES.skills;
  }
  if (q.includes('resume') || q.includes('experience') || q.includes('intern') || q.includes('education')) {
    return MOCK_RESPONSES.resume;
  }
  return MOCK_RESPONSES.default;
}

/**
 * Send a query to the Knowledge Core.
 * Milestone 5: returns a mock response after a simulated delay.
 * Milestone 9: replace with real fetch to VITE_API_BASE_URL + '/api/knowledge-core/query'.
 */
export async function queryKnowledgeCore(query: string): Promise<KnowledgeCoreResponse> {
  // Validate input (same constraint as the real API)
  if (!query.trim()) throw new Error('Query cannot be empty.');
  if (query.length > 500) throw new Error('Query exceeds 500 characters.');

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

  return selectMockResponse(query);
}
