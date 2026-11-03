"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="relative z-30 w-full px-6 lg:px-16 py-6 flex items-center justify-between border-b border-white/5 bg-[#08090B]">
        <Link href="/#home" className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-1">
          <span className="text-[#00FFC2] font-mono">&lt;</span>
          <span>{PORTFOLIO_DATA.personal.brandName}</span>
          <span className="text-[#00FFC2] font-mono">/&gt;</span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#121519] border border-white/10 text-xs text-slate-300">
            <span className="pulse-dot" />
            <span>Available for projects</span>
          </div>

          <a
            href={PORTFOLIO_DATA.personal.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FFC2] text-black font-semibold text-xs hover:bg-[#00E5A3] transition-all shadow-[0_0_15px_rgba(0,255,194,0.3)]"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-black" />
            <span>Get in Touch</span>
          </a>
        </div>
      </header>

      {/* Floating Translucent Sticky Nav */}
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <div className="glass-nav px-6 py-2.5 rounded-full flex items-center gap-5 sm:gap-6 text-xs font-mono font-medium">
          <Link href="/#video-meeting" className="text-slate-300 hover:text-[#00FFC2] transition-colors">
            MEETING
          </Link>
          <Link href="/#tech-stack" className="hidden sm:inline text-slate-300 hover:text-[#00FFC2] transition-colors">
            STACK
          </Link>
          <Link href="/#testimonials" className="text-slate-300 hover:text-[#00FFC2] transition-colors">
            REVIEWS
          </Link>
          <Link href="/#work" className="text-slate-300 hover:text-[#00FFC2] transition-colors">
            PROJECTS
          </Link>
          <Link href="/#contact" className="text-[#00FFC2] hover:underline flex items-center gap-1">
            <span>CONTACT</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </nav>
    </>
  );
}
