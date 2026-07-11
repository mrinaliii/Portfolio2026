/**
 * vite-plugin-projects.ts
 * Vite virtual module plugin — reads content/projects/*.md, parses frontmatter
 * with gray-matter, and exports a typed Project[] array as `virtual:projects`.
 *
 * Rule 4 (BUILD_RULES.md): content/projects/ is the single source of truth.
 * TIP Section 9: "The virtual module approach keeps the content in a human-readable
 * format, gives the embedding pipeline direct access to the same files without any
 * transformation, and emits typed TypeScript objects to the frontend without any
 * runtime parsing overhead."
 */

import type { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const VIRTUAL_MODULE_ID = 'virtual:projects';
const RESOLVED_ID = '\0' + VIRTUAL_MODULE_ID;

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
  githubNote?: string;
  caseStudySections: CaseStudySection[];
  gallery?: GalleryImage[];
  codeExample?: string;
  coverSrc?: string;
  coverLqip?: string;
}

/**
 * Parse the markdown body into CaseStudySection[].
 *
 * Body convention:
 *   ## LABEL — Heading text
 *   (blank line)
 *   Body paragraph   OR   - bullet\n- bullet
 *
 * List sections use `- item` or `* item` syntax; prose sections are plain paragraphs.
 */
function parseSections(markdownBody: string): CaseStudySection[] {
  const sections: CaseStudySection[] = [];

  // Split on `## ` headings
  const blocks = markdownBody.split(/^## /m).filter((b) => b.trim().length > 0);

  for (const block of blocks) {
    const lines = block.split('\n');
    const titleLine = lines[0].trim();

    // Title format: "LABEL — Heading text"
    const dashIdx = titleLine.indexOf(' — ');
    if (dashIdx === -1) continue;

    const label = titleLine.slice(0, dashIdx).trim();
    const heading = titleLine.slice(dashIdx + 3).trim();

    const bodyLines = lines.slice(1).join('\n').trim();

    // Detect bullet list (lines starting with - or *)
    const isList = /^[\-\*] /m.test(bodyLines);

    let body: string | string[];
    if (isList) {
      body = bodyLines
        .split('\n')
        .filter((l) => /^[\-\*] /.test(l.trim()))
        .map((l) => l.replace(/^[\-\*] /, '').trim());
    } else {
      body = bodyLines;
    }

    sections.push({ label, heading, body });
  }

  return sections;
}

function loadProjects(contentDir: string): Project[] {
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith('.md'))
    .sort(); // stable order

  return files.map((file) => {
    const filePath = path.join(contentDir, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);

    const caseStudySections = parseSections(content);

    const project: Project = {
      slug: data.slug as string,
      title: data.title as string,
      subtitle: (data.subtitle as string) ?? '',
      year: data.year as number,
      category: data.category as string,
      status: data.status as Project['status'],
      shortDescription: data.shortDescription as string,
      description: (data.description as string) ?? data.shortDescription as string,
      duration: data.duration as string,
      role: data.role as string,
      technologies: (data.technologies as Technology[]) ?? [],
      caseStudySections,
    };

    if (data.liveUrl) project.liveUrl = data.liveUrl as string;
    if (data.githubUrl) project.githubUrl = data.githubUrl as string;
    if (data.githubNote) project.githubNote = data.githubNote as string;
    if (data.gallery) project.gallery = data.gallery as GalleryImage[];
    if (data.codeExample) project.codeExample = data.codeExample as string;
    if (data.coverSrc) project.coverSrc = data.coverSrc as string;
    if (data.coverLqip) project.coverLqip = data.coverLqip as string;

    return project;
  });
}

export function projectsPlugin(): Plugin {
  let contentDir: string;

  return {
    name: 'vite-plugin-projects',

    configResolved(config) {
      contentDir = path.resolve(config.root, 'content/projects');
    },

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_ID;
      }
    },

    load(id) {
      if (id !== RESOLVED_ID) return;

      // Watch the content directory for HMR
      if (fs.existsSync(contentDir)) {
        fs.readdirSync(contentDir)
          .filter((f) => f.endsWith('.md'))
          .forEach((f) => {
            this.addWatchFile(path.join(contentDir, f));
          });
      }

      const projects = loadProjects(contentDir);
      const projectMap = Object.fromEntries(projects.map((p) => [p.slug, p]));

      return `
export const PROJECTS = ${JSON.stringify(projects, null, 2)};
export const PROJECT_MAP = ${JSON.stringify(projectMap, null, 2)};
`;
    },
  };
}
