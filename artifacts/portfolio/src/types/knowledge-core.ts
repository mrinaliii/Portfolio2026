export interface KnowledgeCoreQuery {
  query: string;
}

export interface KnowledgeCoreCitation {
  label: string;
  slug?: string;
}

export interface KnowledgeCoreRelatedProject {
  title: string;
  slug: string;
}

export interface KnowledgeCoreResponse {
  answer: string;
  citations: KnowledgeCoreCitation[];
  relatedProjects: KnowledgeCoreRelatedProject[];
  followUps: string[];
  error?: string;
}

export type KnowledgeCoreStatus =
  | 'idle'
  | 'loading'
  | 'streaming'
  | 'done'
  | 'error';

export interface KnowledgeCoreState {
  status: KnowledgeCoreStatus;
  response: KnowledgeCoreResponse | null;
  displayedText: string;
  error: string | null;
}
