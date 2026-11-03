"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Code2,
  ExternalLink,
  ShieldCheck,
  Database,
  Users,
  ShoppingBag,
  Cpu,
  Search,
  Sparkles,
  Layers,
  Terminal,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Play
} from "lucide-react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import ProjectDetailModal from "@/components/ProjectDetailModal";

type VeloSubcategory = "all" | "auth" | "cloud" | "crm" | "stores" | "tools";

interface SubcatDef {
  id: VeloSubcategory;
  label: string;
  icon: typeof Code2;
  matchSlugs?: string[];
}

const SUBCATS: SubcatDef[] = [
  {
    id: "all",
    label: "All Packages (18)",
    icon: Layers,
  },
  {
    id: "auth",
    label: "Auth & Security",
    icon: ShieldCheck,
    matchSlugs: [
      "wix-members-2fa-twilio",
      "wix-members-twilio-otp",
      "wix-http-functions-hmac",
    ],
  },
  {
    id: "cloud",
    label: "Cloud & Data",
    icon: Database,
    matchSlugs: [
      "gcp-cloud-trace-integration",
      "google-drive-integration",
      "google-sheets-integration",
      "wix-sql-package",
      "wix-bulk-validation",
    ],
  },
  {
    id: "crm",
    label: "CRM & Marketing",
    icon: Users,
    matchSlugs: [
      "salesforce-crm-integration",
      "pipedrive-crm-integration",
      "wix-zoho-crm-integration",
      "wix-zapier-integration",
      "sendgrid-custom-notifications",
    ],
  },
  {
    id: "stores",
    label: "E-Commerce & Stores",
    icon: ShoppingBag,
    matchSlugs: [
      "wix-stores-bringg-logistics",
      "wix-stores-data-requests",
      "wix-stores-lionwheel-dispatch",
    ],
  },
  {
    id: "tools",
    label: "SDK & Dev Tools",
    icon: Cpu,
    matchSlugs: [
      "wix-twitter-x-integration",
      "wix-zoom-integration",
    ],
  },
];

export default function WixVeloSection() {
  const [selectedSubcat, setSelectedSubcat] = useState<VeloSubcategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Extract all Wix Velo projects from data/projects.json
  const veloProjects = useMemo(() => {
    return PORTFOLIO_DATA.projects.filter((p) => p.categoryIds.includes("wix-velo"));
  }, []);

  // Filter by subcategory and search query
  const filteredProjects = useMemo(() => {
    return veloProjects.filter((proj) => {
      // Subcategory match
      if (selectedSubcat !== "all") {
        const subcatDef = SUBCATS.find((s) => s.id === selectedSubcat);
        if (subcatDef?.matchSlugs && !subcatDef.matchSlugs.includes(proj.slug)) {
          return false;
        }
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = proj.title.toLowerCase().includes(q);
        const inSummary = proj.summary.toLowerCase().includes(q);
        const inTech = proj.technologies.some((t) => t.toLowerCase().includes(q));
        const inRole = proj.role.toLowerCase().includes(q);
        return inTitle || inSummary || inTech || inRole;
      }

      return true;
    });
  }, [veloProjects, selectedSubcat, searchQuery]);

  return (
    <section id="velo" className="relative z-10 py-24 px-6 lg:px-16 border-t border-white/5 bg-[#08090B]">
      {/* Decorative gradient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00FFC2]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121519] border border-[#00FFC2]/30 text-xs font-mono text-[#00FFC2] tracking-wider uppercase mb-4">
              <Terminal className="w-3.5 h-3.5" />
              <span>WIX VELO &amp; CLOUD INTEGRATIONS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              Enterprise Velo Solutions
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              Production-ready Wix Velo packages, serverless API orchestrations, custom data layer adapters,
              and enterprise CRM/ERP bridges configured to official Wix specifications.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#101317] p-4 rounded-2xl border border-white/10 shrink-0">
            <div className="px-3 py-1">
              <div className="text-2xl font-mono font-bold text-[#00FFC2]">18</div>
              <div className="text-[11px] text-slate-400 font-medium">Velo Modules</div>
            </div>
            <div className="px-3 py-1">
              <div className="text-2xl font-mono font-bold text-white">OAuth2</div>
              <div className="text-[11px] text-slate-400 font-medium">Secured APIs</div>
            </div>
            <div className="px-3 py-1">
              <div className="text-2xl font-mono font-bold text-[#00FFC2]">HMAC</div>
              <div className="text-[11px] text-slate-400 font-medium">Tamper Proof</div>
            </div>
            <div className="px-3 py-1">
              <div className="text-2xl font-mono font-bold text-white">100%</div>
              <div className="text-[11px] text-slate-400 font-medium">Serverless</div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/5">
          {/* Subcategory Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {SUBCATS.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedSubcat === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedSubcat(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                    isActive
                      ? "bg-[#00FFC2] text-black font-bold shadow-[0_0_15px_rgba(0,255,194,0.35)]"
                      : "bg-[#121519] text-slate-300 border border-white/10 hover:border-[#00FFC2]/40 hover:text-white"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-black" : "text-[#00FFC2]"}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] md:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search packages, tools, APIs..."
              className="w-full pl-10 pr-4 py-2 bg-[#121519] border border-white/10 rounded-full text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00FFC2] focus:ring-1 focus:ring-[#00FFC2] transition-all"
            />
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-8 text-xs font-mono text-slate-400">
          <span>
            Showing <strong className="text-[#00FFC2]">{filteredProjects.length}</strong> of {veloProjects.length} packages
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-[#00FFC2] hover:underline"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            return (
              <div
                key={project.slug}
                className="group relative flex flex-col justify-between bg-[#101317] border border-white/10 rounded-2xl overflow-hidden hover:border-[#00FFC2]/50 hover:shadow-[0_0_30px_rgba(0,255,194,0.12)] transition-all duration-300"
              >
                {/* Visual Preview Header */}
                <div className="relative h-44 w-full bg-[#181C22] overflow-hidden border-b border-white/5">
                  {project.preview.type === "video" ? (
                    <video
                      src={project.preview.src}
                      poster={project.preview.poster}
                      playsInline
                      muted
                      loop
                      autoPlay
                      preload="metadata"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <Image
                      src={project.preview.src}
                      alt={project.preview.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101317] via-transparent to-transparent opacity-90 pointer-events-none" />

                  {/* Top Badge Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-md bg-[#08090B]/80 backdrop-blur-md border border-[#00FFC2]/30 text-[10px] font-mono font-medium text-[#00FFC2]">
                      #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1} VELO
                    </span>
                    <div className="flex items-center gap-1.5">
                      {project.preview.type === "video" && (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#00FFC2] text-black text-[10px] font-mono font-bold shadow-[0_0_10px_rgba(0,255,194,0.4)]">
                          <Play className="w-2.5 h-2.5 fill-black" />
                          <span>VIDEO</span>
                        </span>
                      )}
                      {project.featured && (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#00FFC2]/20 backdrop-blur-md border border-[#00FFC2]/40 text-[10px] font-mono text-[#00FFC2]">
                          <Sparkles className="w-3 h-3" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Role / Discipline */}
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                      {project.role}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white group-hover:text-[#00FFC2] transition-colors duration-200 line-clamp-1 mb-3">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                      {project.summary}
                    </p>
                  </div>

                  <div>
                    {/* Technology Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-400">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setActiveModalProject(project)}
                        className="text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#00FFC2]" />
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00FFC2]/10 hover:bg-[#00FFC2] text-[#00FFC2] hover:text-black font-mono text-xs font-medium border border-[#00FFC2]/30 hover:border-[#00FFC2] transition-all"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>Docs</span>
                          <ExternalLink className="w-3 h-3 ml-0.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 px-4 bg-[#101317] border border-white/10 rounded-2xl">
            <Code2 className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h4 className="text-base font-bold text-white mb-1">No matching Velo packages found</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              Try adjusting your search query or select another category filter above.
            </p>
            <button
              onClick={() => {
                setSelectedSubcat("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-full bg-[#00FFC2] text-black font-mono font-semibold text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <ProjectDetailModal
          project={activeModalProject}
          categories={PORTFOLIO_DATA.categories}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
}
