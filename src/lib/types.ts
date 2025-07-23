export interface Developer {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  headline: string;
  bio: string;
  location?: string;
  timezone?: string;

  // Experience and expertise
  yearsExperience: number;
  specialties: string[];
  technologies: string[];
  frameworks: string[];

  // Pricing
  hourlyRate?: number;
  projectMinimum?: number;
  preferredProjectSize: "small" | "medium" | "large" | "any";

  // Work samples
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;

  // Success metrics
  projectsCompleted: number;
  avgRating?: number;
  totalReviews?: number;

  // Availability
  isAvailable: boolean;
  responseTime: "< 1 hour" | "< 4 hours" | "< 24 hours" | "2-3 days";

  // Meta
  createdAt: Date;
  updatedAt: Date;
  featured?: boolean;
  verified?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  beforeLines: number;
  afterLines: number;
  duration: string;
  technologies: string[];
  testimonial?: string;
  clientName?: string;
  clientCompany?: string;
}

export interface Review {
  id: string;
  developerId: string;
  clientName: string;
  rating: number;
  comment: string;
  projectType: string;
  createdAt: Date;
}

export interface DeveloperFilter {
  technologies?: string[];
  frameworks?: string[];
  minRate?: number;
  maxRate?: number;
  availability?: boolean;
  verified?: boolean;
  location?: string;
  projectSize?: "small" | "medium" | "large" | "any";
}
