export interface User {
  id: string;
  email?: string;
  subscription: 'free' | 'pro' | 'premium';
  transactionId?: string;
  createdAt: Date;
}

export interface PaymentTier {
  name: 'free' | 'pro' | 'premium';
  price: number;
  features: string[];
  limits: {
    abstracts: number;
    flashcards: number;
    resumePoints: number;
    vivaQuestions: number;
    reports: number;
    pptSlides: number;
  };
}

export interface ProjectData {
  title: string;
  description: string;
  domain: string;
  technologies: string[];
  features: string[];
}

export interface GeneratedContent {
  id: string;
  type: 'abstract' | 'report' | 'ppt' | 'flashcard' | 'resume' | 'viva' | 'assignment';
  title: string;
  content: string;
  createdAt: Date;
  userId: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
  };
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
}
