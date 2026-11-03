"use client";

import { useEffect } from "react";
import { Project, Category, PORTFOLIO_DATA } from "@/data/portfolioData";
import { X, ExternalLink, MessageSquare, CheckCircle2, Layers, Briefcase } from "lucide-react";

interface ProjectDetailModalProps {
  project: Project | null;
  categories: Category[];
  onClose: () => void;
  onSelectCategory?: (categoryId: string) => void;
}

export default function ProjectDetailModal({
  project,
  categories,
  onClose,
  onSelectCategory,
}: ProjectDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const projectCategories = categories.filter((c) =>
    project.categoryIds.includes(c.id)
  );

  const whatsappMessage = encodeURIComponent(
    `Hi ${PORTFOLIO_DATA.personal.name}, I'm interested in discussing a project similar to "${project.title}".`
  );
  const whatsappUrl = `${PORTFOLIO_DATA.personal.whatsappUrl}&text=${whatsappMessage}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#121519] border border-white/15 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-[#00FFC2] hover:text-black text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00FFC2]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Categories Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onClose();
                if (onSelectCategory) onSelectCategory(cat.id);
              }}
              className="px-3 py-1 rounded-full bg-[#00FFC2]/10 border border-[#00FFC2]/30 text-xs font-mono text-[#00FFC2] hover:bg-[#00FFC2]/20 transition-colors"
            >
              #{cat.label}
            </button>
          ))}
          {project.featured && (
            <span className="px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-[11px] font-mono text-amber-300">
              FEATURED
            </span>
          )}
        </div>

        {/* Title */}
        <h2 id="modal-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          {project.title}
        </h2>

        {/* Value Statement / Summary */}
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 font-light">
          {project.summary}
        </p>

        {/* Preview Frame */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#08090B] mb-8 max-h-[460px] overflow-y-auto">
          {project.preview.type === "video" ? (
            <video
              src={project.preview.src}
              poster={project.preview.poster}
              controls
              playsInline
              className="w-full h-auto block rounded-2xl"
            />
          ) : (
            <img
              src={project.preview.src}
              alt={project.preview.alt || project.title}
              className="w-full h-auto block rounded-2xl"
            />
          )}
        </div>

        {/* Key Project Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-[#08090B]/60 border border-white/5 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00FFC2] uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Role & Contribution</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              {project.role}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00FFC2] uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Core Technologies</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Controls & Primary Contact CTA */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-[#00FFC2] transition-colors shadow-md"
              >
                <span>Visit Live Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00FFC2]" />
                <span>Client Architecture Case Study</span>
              </div>
            )}

            {project.caseStudyUrl && (
              <a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:border-[#00FFC2] transition-colors"
              >
                <span>Case Study</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#00FFC2] text-black font-bold text-xs hover:bg-[#00E5A3] transition-all shadow-[0_0_20px_rgba(0,255,194,0.3)]"
          >
            <MessageSquare className="w-4 h-4 fill-black" />
            <span>Discuss a Similar Project</span>
          </a>
        </div>
      </div>
    </div>
  );
}
