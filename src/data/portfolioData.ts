import rawCategories from "../../data/categories.json";
import rawProjects from "../../data/projects.json";

export interface Category {
  id: string;
  label: string;
  parentId?: string;
}

export type PreviewType = "scroll-image" | "video" | "image";

export interface ProjectPreview {
  type: PreviewType;
  src: string;
  alt: string;
  poster?: string;
}

export interface Project {
  slug: string;
  title: string;
  categoryIds: string[];
  summary: string;
  role: string;
  technologies: string[];
  preview: ProjectPreview;
  liveUrl: string | null;
  caseStudyUrl: string | null;
  featured?: boolean;

  // Backward-compatibility properties
  id: string;
  category: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
}

export const CATEGORIES: Category[] = rawCategories as Category[];

// Normalize raw projects while maintaining full backward-compatibility
export const PROJECTS: Project[] = (rawProjects as Array<{
  slug: string;
  title: string;
  categoryIds: string[];
  summary: string;
  role: string;
  technologies: string[];
  preview: ProjectPreview;
  liveUrl: string | null;
  caseStudyUrl: string | null;
  featured?: boolean;
}>).map((p) => {
  const primaryCategory =
    CATEGORIES.find((c) => p.categoryIds.includes(c.id))?.label ||
    p.categoryIds[0] ||
    "Project";

  return {
    ...p,
    id: p.slug,
    category: primaryCategory,
    description: p.summary,
    image: p.preview.src,
    url: p.liveUrl || p.caseStudyUrl || `#${p.slug}`,
    tags: p.technologies,
  };
});

export const PORTFOLIO_DATA = {
  personal: {
    name: "Abbas Portfolio",
    brandName: "abbas",
    role: "Full-Stack Engineer & Consultant",
    headline: "Building high-performance web products & digital experiences.",
    subHeadline:
      "Specialized in Next.js, React, modern UI design, and end-to-end client consultation.",
    whatsappUrl: "https://api.whatsapp.com/send?phone=923000000000",
    email: "contact@example.com",
    availableForWork: true,
  },
  videoMeeting: {
    title: "Client Strategy & Consultation Session",
    subtitle: "Real-world client discussion & technical roadmap planning",
    videoUrl: "/client-meeting.mp4",
    posterImage:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1600&auto=format&fit=crop",
    duration: "1:45",
    tag: "LIVE MEETING DEMO",
  },
  categories: CATEGORIES,
  projects: PROJECTS,
  socials: [
    { name: "LINKEDIN", url: "https://linkedin.com" },
    { name: "GITHUB", url: "https://github.com" },
    { name: "TWITTER / X", url: "https://twitter.com" },
    { name: "EMAIL", url: "mailto:contact@example.com" },
  ],
};

export function getCategories(): Category[] {
  return CATEGORIES;
}

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getProjects(): Project[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
