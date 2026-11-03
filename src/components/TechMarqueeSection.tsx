"use client";

import { useState } from "react";
import { TECHNOLOGIES, TechnologyItem } from "@/data/technologies";
import { Code2, Sparkles, ArrowRightLeft } from "lucide-react";

export default function TechMarqueeSection() {
  const [isVertical, setIsVertical] = useState(false);

  // Split technologies into two balanced rows for the dual-track marquee
  const half = Math.ceil(TECHNOLOGIES.length / 2);
  const rowOne = TECHNOLOGIES.slice(0, half);
  const rowTwo = TECHNOLOGIES.slice(half);

  const toggleAxis = () => {
    setIsVertical((prev) => !prev);
  };

  const renderTechCard = (tech: TechnologyItem, keyPrefix: string) => (
    <div
      key={`${keyPrefix}-${tech.id}`}
      className="group/card relative flex items-center gap-4 px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl bg-[#121519]/90 border border-white/10 hover:border-[#00FFC2]/50 hover:bg-[#191D23] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(0,255,194,0.15)] flex-shrink-0 cursor-default select-none"
    >
      {/* Brand Icon Container */}
      <div
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center p-2 border border-white/5 transition-transform duration-300 group-hover/card:scale-110"
        style={{
          backgroundColor: tech.color ? `${tech.color}15` : "rgba(255,255,255,0.05)",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 transition-colors duration-300"
          style={{ fill: tech.color || "#FFFFFF" }}
          aria-hidden="true"
        >
          <path d={tech.svgPath} />
        </svg>
      </div>

      {/* Tech Info */}
      <div className="flex flex-col text-left">
        <span className="text-sm sm:text-base font-semibold text-white tracking-wide group-hover/card:text-[#00FFC2] transition-colors duration-200">
          {tech.name}
        </span>
        <span className="text-[11px] sm:text-xs text-slate-400 font-mono tracking-tight flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: tech.color || "#00FFC2" }}
          />
          {tech.category}
        </span>
      </div>
    </div>
  );

  return (
    <section
      id="tech-stack"
      className="relative z-10 py-16 px-4 sm:px-6 lg:px-16 overflow-hidden border-t border-b border-white/5 bg-[#08090B]"
    >
      {/* Ambient background glow */}
      <div className="ambient-glow-bottom-left" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00FFC2]/10 border border-[#00FFC2]/30 text-[#00FFC2] font-mono text-xs mb-3">
              <Code2 className="w-3.5 h-3.5" />
              <span>CORE TECH STACK &amp; CAPABILITIES</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Technologies &amp; Frameworks{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#00FFC2]">
                I Build With.
              </span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed font-light">
              From custom WordPress themes &amp; headless CMS to full MERN stacks, Next.js, and cloud-scale architectures.
            </p>
          </div>

          {/* Toggle Scroll Axis Button */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={toggleAxis}
              id="direction-toggle"
              aria-label="Toggle marquee scroll direction axis"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#121519] border border-white/10 hover:border-[#00FFC2]/40 text-slate-300 hover:text-white transition-all duration-300 text-xs font-mono group"
            >
              <ArrowRightLeft
                className={`w-4 h-4 text-[#00FFC2] transition-transform duration-300 ${
                  isVertical ? "rotate-90" : "rotate-0"
                }`}
              />
              <span>
                Axis:{" "}
                <strong className="text-white font-medium">
                  {isVertical ? "Vertical" : "Horizontal"}
                </strong>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 group-hover:text-[#00FFC2]">
                Toggle
              </span>
            </button>
          </div>
        </div>

        {/* Marquee Wrapper Container */}
        <div
          className={`tech-marquee-wrapper ${
            isVertical ? "tech-marquee-wrapper--vertical" : ""
          } flex flex-col gap-4 relative`}
        >
          {/* Row 1: Normal Direction */}
          <div
            className={`tech-marquee ${
              isVertical ? "tech-marquee--vertical" : ""
            }`}
          >
            <div className="tech-marquee__group">
              {rowOne.map((tech) => renderTechCard(tech, "r1-a"))}
            </div>
            <div aria-hidden="true" className="tech-marquee__group">
              {rowOne.map((tech) => renderTechCard(tech, "r1-b"))}
            </div>
          </div>

          {/* Row 2: Reverse Direction */}
          <div
            className={`tech-marquee tech-marquee--reverse ${
              isVertical ? "tech-marquee--vertical" : ""
            }`}
          >
            <div className="tech-marquee__group">
              {rowTwo.map((tech) => renderTechCard(tech, "r2-a"))}
            </div>
            <div aria-hidden="true" className="tech-marquee__group">
              {rowTwo.map((tech) => renderTechCard(tech, "r2-b"))}
            </div>
          </div>
        </div>

        {/* Bottom subtle note */}
        <div className="mt-8 flex items-center justify-between text-xs font-mono text-slate-500 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#00FFC2]" />
            <span>Hover any technology card to pause rotation</span>
          </div>
          <span className="hidden sm:inline text-slate-600">
            {TECHNOLOGIES.length} Primary Technologies &amp; Frameworks
          </span>
        </div>
      </div>
    </section>
  );
}
