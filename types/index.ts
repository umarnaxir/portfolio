export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  longDescription?: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  description: string;
  highlights: string[];
  skills: string[];
}

export interface Service {
  index: string;
  title: string;
  shortDesc: string;
  fullDesc?: string;
  deliverables?: string[];
}

export interface StatItem {
  target: number;
  suffix?: string;
  label: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  approach: string;
  email: string;
  phone: string;
  location: string;
  company: string;
  companyRole: string;
  leadCompany: string;
  leadRole: string;
  yearsExperience: string;
  projectsCount: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
    phone: string;
  };
}

