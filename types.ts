export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  repoUrl?: string;
  demoUrl?: string;
  stats?: { label: string; value: string }[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string; // Markdown-like content
  tags: string[];
}

export enum Section {
  HOME = 'HOME',
  PROJECTS = 'PROJECTS',
  BLOG = 'BLOG',
  CONTACT = 'CONTACT'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
