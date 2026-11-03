import Header from "@/components/Header";
import VideoSection from "@/components/VideoSection";
import TechMarqueeSection from "@/components/TechMarqueeSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main id="home" className="min-h-screen bg-[#08090B] text-white selection:bg-[#00FFC2] selection:text-black">
      <Header />
      <VideoSection />
      <TechMarqueeSection />
      <TestimonialsSection />
      <ProjectsShowcase />
      <ContactSection />
    </main>
  );
}
