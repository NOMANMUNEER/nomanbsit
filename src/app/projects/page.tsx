import type { Metadata } from "next";
import Header from "@/components/Header";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Projects & Portfolio Showcase | Abbas",
  description:
    "Explore featured web applications, SaaS platforms, and enterprise solutions. Filter by category and discover tailored digital experiences.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#08090B] text-white selection:bg-[#00FFC2] selection:text-black">
      <Header />
      <div className="pt-8">
        <ProjectsShowcase />
      </div>
      <ContactSection />
    </main>
  );
}
