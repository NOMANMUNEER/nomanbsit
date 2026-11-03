"use client";

import { MessageSquare, ArrowUpRight, ArrowUp, Mail, ShieldCheck } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function ContactSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative z-10 bg-[#08090B] border-t border-white/5 pt-20 pb-12 px-6 lg:px-16 overflow-hidden">
      {/* Background ambient glow */}
      <div className="ambient-glow-bottom-left" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Main Direct Call to Action */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00FFC2]/10 border border-[#00FFC2]/30 text-[#00FFC2] font-mono text-xs mb-4">
                <span>GET IN TOUCH</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
                Let&apos;s discuss your <br />
                <span className="text-[#00FFC2]">next big project.</span>
              </h2>
              <p className="text-slate-400 max-w-lg mb-8 text-base">
                Ready to build an exceptional web application or discuss a consultation? Drop me a line or send a direct message on WhatsApp.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={PORTFOLIO_DATA.personal.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#00FFC2] text-black font-extrabold text-sm hover:bg-[#00E5A3] transition-all transform hover:-translate-y-0.5 shadow-[0_0_30px_rgba(0,255,194,0.35)]"
              >
                <MessageSquare className="w-5 h-5 fill-black" />
                <span>Chat on Whatsapp</span>
              </a>

              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="flex items-center gap-2 px-6 py-4 rounded-full bg-[#121519] border border-white/10 text-slate-200 font-mono text-xs hover:border-[#00FFC2] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#00FFC2]" />
                <span>{PORTFOLIO_DATA.personal.email}</span>
              </a>
            </div>
          </div>

          {/* Social Links Box */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-[#121519] p-8 rounded-3xl border border-white/10">
              <div className="text-xs font-mono text-[#00FFC2] uppercase tracking-widest mb-6">
                SOCIAL & NETWORK
              </div>
              <div className="grid grid-cols-2 gap-4">
                {PORTFOLIO_DATA.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#08090B] border border-white/5 text-slate-300 hover:text-[#00FFC2] hover:border-[#00FFC2]/30 transition-all font-mono text-xs"
                  >
                    <span>{social.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 flex items-center justify-between p-4 rounded-2xl bg-[#121519] border border-white/10 text-slate-400 hover:text-white hover:border-[#00FFC2] transition-all text-xs font-mono"
            >
              <span>Back to top</span>
              <ArrowUp className="w-4 h-4 text-[#00FFC2]" />
            </button>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
          <div>
            © {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}. Custom minimalist design.
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00FFC2]" />
            <span>Built with Next.js 15 & Vanilla CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
