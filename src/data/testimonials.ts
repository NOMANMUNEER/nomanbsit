export interface TestimonialItem {
  id: string;
  jobTitle: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
  screenshot: string;
  content: string;
  rating: number;
  projectTag: string;
  contractPrice: string;
  contractType: string;
  date: string;
  endorsement?: string;
  skills: string[];
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "upwork-wix-development",
    jobTitle: "Wix Website Development and atomization",
    name: "Verified Upwork Client",
    position: "Client Review",
    company: "Upwork Contract",
    avatar: "/testimonials/upwork-wix-review.png",
    screenshot: "/testimonials/upwork-wix-review.png",
    content:
      "An excellent developer with outstanding technical skills and a patient, motivated approach. My website involved a complex design and automation, requiring strong knowledge of Wix Headless, coding and general IT. He brought great ideas to the project and used great problem-solving skills to work through challenges and find practical solutions. I particularly appreciated his patience with feedback and changes, attention to detail, and determination to get everything working properly. A skilled and dedicated professional who I would highly recommend! He brought an idea to life beyond expectations.",
    rating: 5,
    projectTag: "Wix Headless & Automation",
    contractPrice: "$1,225.00",
    contractType: "Fixed price",
    date: "Jul 30, 2026 - Present • Review: Oct 28, 2026",
    skills: ["Wix", "Wix SEO Wiz", "Tix", "Wix Headless", "IT Automation"],
  },
  {
    id: "upwork-website-consulting",
    jobTitle: "Consulting for Website",
    name: "Verified Upwork Client",
    position: "Client Review",
    company: "Upwork Contract",
    avatar: "/testimonials/upwork-consulting-review.png",
    screenshot: "/testimonials/upwork-consulting-review.png",
    content: "Great work!",
    rating: 5,
    projectTag: "Website Consulting",
    contractPrice: "$35.00",
    contractType: "$5.00 /hr • 7 hours",
    date: "Oct 1, 2026 - Oct 2, 2026",
    endorsement: "Accountable for Outcomes",
    skills: ["Consulting", "Website Strategy", "Outcomes"],
  },
];
