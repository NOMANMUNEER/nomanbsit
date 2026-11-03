"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowUpRight,
  FolderGit2,
  Sparkles,
  Filter,
  Check,
  Eye,
  Compass,
  ChevronRight,
  Unlock,
  Lock,
  Layers
} from "lucide-react";
import { PORTFOLIO_DATA, Project, Category } from "@/data/portfolioData";
import ProjectPreviewMedia from "@/components/ProjectPreviewMedia";
import ProjectDetailModal from "@/components/ProjectDetailModal";

function ProjectsShowcaseContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");

  const [selectedCategoryState, setSelectedCategoryState] = useState<string | null>(null);
  const selectedCategory = selectedCategoryState ?? urlCategory ?? null;
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [hoveredCardSlug, setHoveredCardSlug] = useState<string | null>(null);
  const [filterModeOnly, setFilterModeOnly] = useState<boolean>(false);
  const [isRevealed, setIsRevealed] = useState<boolean>(Boolean(urlCategory));

  const categories = PORTFOLIO_DATA.categories;
  const allProjects = PORTFOLIO_DATA.projects;

  const handleSelectCategory = (categoryId: string | null) => {
    setSelectedCategoryState(categoryId);

    // Update URL query parameter stably for sharing
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (categoryId) {
        url.searchParams.set("category", categoryId);
      } else {
        url.searchParams.delete("category");
      }
      window.history.pushState({}, "", url.toString());
    }
  };

  // Put relevant projects first if a category is selected
  const displayedProjects = useMemo(() => {
    if (!selectedCategory) {
      return allProjects;
    }

    const matched = allProjects.filter((p) =>
      p.categoryIds.includes(selectedCategory)
    );
    const others = allProjects.filter(
      (p) => !p.categoryIds.includes(selectedCategory)
    );

    if (filterModeOnly) {
      return matched;
    }

    return [...matched, ...others];
  }, [allProjects, selectedCategory, filterModeOnly]);

  const activeCategoryObj = categories.find((c) => c.id === selectedCategory);
  const matchCount = selectedCategory
    ? allProjects.filter((p) => p.categoryIds.includes(selectedCategory)).length
    : allProjects.length;

  return (
    <section id="work" className="relative z-10 py-24 px-6 lg:px-16 border-t border-white/5 bg-[#08090B]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00FFC2] tracking-widest uppercase mb-2">
              <FolderGit2 className="w-3.5 h-3.5 text-[#00FFC2]" />
              <span>SELECTED PROJECTS & CASE STUDIES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              Featured Work
            </h2>
          </div>

          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            A curated showcase of verified production systems, interactive web applications, and digital platforms.
          </p>
        </div>

        {/* Dynamic Category Filter Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-[#00FFC2]" />
              <span>Filter by Category:</span>
            </div>

            {isRevealed && (
              <button
                onClick={() => setIsRevealed(false)}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#00FFC2]/50 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all"
              >
                <Lock className="w-3 h-3 text-[#00FFC2]" />
                <span>Personalize View</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* All Projects Pill */}
            <button
              onClick={() => {
                handleSelectCategory(null);
                setIsRevealed(true);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                selectedCategory === null && isRevealed
                  ? "bg-[#00FFC2] text-black font-bold shadow-[0_0_15px_rgba(0,255,194,0.3)]"
                  : "bg-[#121519] text-slate-300 border border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              All Projects ({allProjects.length})
            </button>

            {/* Dynamic Categories generated from categories.json */}
            {categories
              .filter((category: Category) => category.id !== "wix-velo")
              .map((category: Category) => {
                const count = allProjects.filter((p) =>
                  p.categoryIds.includes(category.id)
                ).length;
                const isSelected = selectedCategory === category.id && isRevealed;

                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      handleSelectCategory(isSelected ? null : category.id);
                      setIsRevealed(true);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#00FFC2] text-black font-bold shadow-[0_0_15px_rgba(0,255,194,0.3)]"
                        : "bg-[#121519] text-slate-300 border border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    <span>{category.label}</span>
                    <span className={`text-[10px] opacity-70 ${isSelected ? "text-black" : "text-slate-400"}`}>
                      ({count})
                    </span>
                  </button>
                );
              })}
          </div>

          {/* Active Filter Status Banner */}
          {selectedCategory && (
            <div className="mt-4 p-3 rounded-2xl bg-[#121519] border border-[#00FFC2]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <Sparkles className="w-4 h-4 text-[#00FFC2]" />
                <span>
                  Showing <strong className="text-white">{matchCount}</strong> project{matchCount !== 1 ? "s" : ""} matching{" "}
                  <span className="text-[#00FFC2]">&quot;{activeCategoryObj?.label}&quot;</span>
                  {!filterModeOnly && " placed first."}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFilterModeOnly(!filterModeOnly)}
                  className="text-xs text-slate-400 hover:text-white underline underline-offset-4"
                >
                  {filterModeOnly ? "Show other projects too" : "Only show this category"}
                </button>
                <button
                  onClick={() => handleSelectCategory(null)}
                  className="px-3 py-1 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Blur & Reveal Container */}
        <div className="relative min-h-[500px]">
          {/* Glassmorphic Overlay Personalizer Box when !isRevealed */}
          {!isRevealed && (
            <div className="absolute inset-0 z-30 flex items-start justify-center pt-6 sm:pt-12 px-2 sm:px-4 pointer-events-auto">
              <div className="w-full max-w-2xl bg-[#0F1318]/95 border border-[#00FFC2]/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl text-center animate-in fade-in zoom-in-95 duration-500">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00FFC2]/10 border border-[#00FFC2]/30 text-xs font-mono text-[#00FFC2] tracking-wider uppercase mb-4">
                  <Compass className="w-3.5 h-3.5" />
                  <span>INTERACTIVE CLIENT NAVIGATOR</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                  What type of project are you building?
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mb-6 sm:mb-8 font-light leading-relaxed">
                  Select your project domain to instantly reveal curated case studies and verified production code, or view everything at once:
                </p>

                {/* Category Selection Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-left">
                  {categories
                    .filter((cat) => cat.id !== "wix-velo")
                    .map((cat) => {
                      const count = allProjects.filter((p) => p.categoryIds.includes(cat.id)).length;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            handleSelectCategory(cat.id);
                            setIsRevealed(true);
                          }}
                          className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#141920] border border-white/10 hover:border-[#00FFC2] hover:bg-[#1A222C] text-left transition-all duration-200 group active:scale-95 shadow-md"
                        >
                          <div>
                            <div className="text-xs sm:text-sm font-bold text-white group-hover:text-[#00FFC2] transition-colors">
                              {cat.label}
                            </div>
                            <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                              {count} verified project{count !== 1 ? "s" : ""}
                            </div>
                          </div>
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 group-hover:bg-[#00FFC2] flex items-center justify-center transition-all shrink-0 ml-2">
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </button>
                      );
                    })}
                </div>

                {/* Direct Reveal All Fallback Button */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      handleSelectCategory(null);
                      setIsRevealed(true);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#00FFC2] text-black font-mono font-bold text-xs hover:bg-[#00E5A3] shadow-[0_0_25px_rgba(0,255,194,0.4)] transition-all hover:scale-105 active:scale-95"
                  >
                    <Unlock className="w-4 h-4 fill-black" />
                    <span>Reveal All {allProjects.length} Projects (No Filter)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2-Column High-Impact Project Grid with Smooth Blur Transition */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 ease-out ${
              !isRevealed
                ? "filter blur-lg opacity-25 pointer-events-none select-none scale-[0.98]"
                : "filter-none opacity-100 scale-100"
            }`}
          >
            {displayedProjects.map((project: Project) => {
              const isMatch = selectedCategory
                ? project.categoryIds.includes(selectedCategory)
                : false;
              const isHovered = hoveredCardSlug === project.slug;

              return (
                <article
                  key={project.slug}
                  onMouseEnter={() => setHoveredCardSlug(project.slug)}
                  onMouseLeave={() => setHoveredCardSlug(null)}
                  className={`group relative p-6 rounded-3xl bg-[#121519] border card-hover flex flex-col justify-between transition-all ${
                    isMatch
                      ? "border-[#00FFC2]/40 shadow-[0_0_25px_rgba(0,255,194,0.1)] ring-1 ring-[#00FFC2]/30"
                      : "border-white/10"
                  }`}
                >
                  <div>
                    {/* Category Match Badge */}
                    {selectedCategory && isMatch && (
                      <div className="absolute top-3 left-8 z-20 px-3 py-1 rounded-full bg-[#00FFC2] text-black font-mono font-bold text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 fill-black" />
                        <span>SELECTED CATEGORY</span>
                      </div>
                    )}

                    {/* Dynamic Preview Element (scroll-image, video, or image) */}
                    <div className="mb-6">
                      <ProjectPreviewMedia
                        preview={project.preview}
                        title={project.title}
                        isCardHovered={isHovered}
                      />
                    </div>

                    {/* Metadata Header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex flex-wrap gap-1.5">
                        {project.categoryIds.map((catId) => {
                          const catObj = categories.find((c) => c.id === catId);
                          return (
                            <button
                              key={catId}
                              onClick={() => handleSelectCategory(catId)}
                              className="text-[11px] font-mono text-[#00FFC2] bg-[#00FFC2]/10 hover:bg-[#00FFC2]/20 px-2.5 py-0.5 rounded-full transition-colors uppercase tracking-wider"
                            >
                              {catObj?.label || catId}
                            </button>
                          );
                        })}
                      </div>

                      {project.featured && (
                        <span className="text-[10px] font-mono text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-md">
                          FEATURED
                        </span>
                      )}
                    </div>

                    {/* Project Title */}
                    <h3
                      onClick={() => setActiveModalProject(project)}
                      className="text-2xl font-extrabold text-white mb-2 group-hover:text-[#00FFC2] transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>

                    {/* Concise Value Statement */}
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">
                      {project.summary}
                    </p>

                    {/* Role and Contribution */}
                    <div className="text-xs font-mono text-slate-300 mb-6 flex items-center gap-2">
                      <span className="text-slate-500">ROLE:</span>
                      <span className="text-slate-200">{project.role}</span>
                    </div>
                  </div>

                  <div>
                    {/* Technology Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 mb-6">
                      {project.technologies.map((t, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Working View-Project Actions */}
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <button
                        onClick={() => setActiveModalProject(project)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs hover:bg-[#00FFC2] hover:text-black hover:border-transparent transition-all"
                        aria-label={`View full details for ${project.title}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 text-white hover:bg-white hover:text-black font-mono text-xs transition-all"
                          aria-label={`Open live site for ${project.title}`}
                        >
                          <span>Live Site</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Project Detail Modal */}
        <ProjectDetailModal
          project={activeModalProject}
          categories={categories}
          onClose={() => setActiveModalProject(null)}
          onSelectCategory={handleSelectCategory}
        />

      </div>
    </section>
  );
}

export default function ProjectsShowcase() {
  return (
    <Suspense
      fallback={
        <div className="py-24 px-6 text-center text-slate-500 font-mono text-sm bg-[#08090B]">
          Loading portfolio projects...
        </div>
      }
    >
      <ProjectsShowcaseContent />
    </Suspense>
  );
}
