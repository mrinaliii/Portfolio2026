/// <reference types="vite/client" />

// CSS Modules type declarations
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

declare module '*.module.scss' {
  const classes: Record<string, string>;
  export default classes;
}

// Virtual projects module — single source of truth (Rule 4, TIP §9)
declare module 'virtual:projects' {
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

  export const PROJECTS: Project[];
  export const PROJECT_MAP: Record<string, Project>;
}
