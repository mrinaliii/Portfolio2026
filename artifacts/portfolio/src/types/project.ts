export interface Technology {
  name: string;
  category: 'ai-ml' | 'security' | 'cloud' | 'engineering' | 'language' | 'tool';
  description?: string;
}

export interface GalleryImage {
  src: string;
  lqip: string;
  alt: string;
  caption?: string;
}

export interface CaseStudySection {
  label: string;          // Geist Mono stamp (e.g., 'PROJECT OVERVIEW')
  heading: string;        // Syne 28px heading
  body: string | string[]; // String for prose, string[] for bullet lists
}

export interface Project {
  slug: string;
  title: string;
  year: number;
  category: string;
  status: 'Active' | 'Completed' | 'Ongoing';
  shortDescription: string;
  descriptor: string;     // One-line descriptor for the project card
  duration: string;
  role: string;
  technologies: Technology[];
  liveUrl?: string;
  githubUrl?: string;
  coverImage?: string;
  coverImageLqip?: string;
  sections: CaseStudySection[];
  gallery?: GalleryImage[];
  codeExample?: string;  // For projects with no visual output
}
