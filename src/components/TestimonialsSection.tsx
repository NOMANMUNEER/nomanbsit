"use client";

import { useState } from "react";
import Image from "next/image";
import { TESTIMONIALS, TestimonialItem } from "@/data/testimonials";
import {
  Star,
  CheckCircle2,
  DollarSign,
  Calendar,
  ExternalLink,
  ZoomIn,
  X,
  Award,
  Sparkles,
  ShieldCheck
} from "lucide-react";

export default function TestimonialsSection() {
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);

  return (
    <section
      id="testimonials"
      className="relative z-10 py-24 px-4 sm:px-6 lg:px-16 overflow-hidden bg-[#08090B] border-t border-white/5"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#14A800]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#00FFC2]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14A800]/15 border border-[#14A800]/30 text-[#14A800] font-mono text-xs mb-3 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#14A800]" />
              <span>UPWORK VERIFIED REVIEWS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Real Client Feedback &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#14A800]">
                Proof.
              </span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed font-light">
              Authentic 5.0-star contract reviews directly from Upwork clients, with full feedback and project details.
            </p>
          </div>

          {/* Upwork Verified Stats Pill */}
          <div className="flex items-center gap-4 bg-[#101317] border border-white/10 px-5 py-3 rounded-2xl shrink-0">
            <div>
              <div className="flex items-center gap-1 text-[#00FFC2] font-mono font-bold text-lg">
                <Star className="w-4 h-4 fill-[#00FFC2]" />
                <span>5.0 / 5.0</span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium">100% Client Rating</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <div className="text-white font-mono font-bold text-lg">Upwork</div>
              <div className="text-[11px] text-[#14A800] font-semibold">Top Rated Quality</div>
            </div>
          </div>
        </div>

        {/* 2 Real Upwork Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {TESTIMONIALS.map((review: TestimonialItem) => (
            <div
              key={review.id}
              className="flex flex-col justify-between bg-[#121519] border border-white/10 rounded-3xl p-6 sm:p-8 hover:border-[#14A800]/50 hover:shadow-[0_0_35px_rgba(20,168,0,0.15)] transition-all duration-300 relative group"
            >
              <div>
                {/* Top Bar: Stars + Upwork Verification */}
                <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#00FFC2] text-[#00FFC2]"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-mono font-bold text-white">
                      {review.rating.toFixed(1)}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14A800]/20 border border-[#14A800]/40 text-[#14A800] text-xs font-mono font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>VERIFIED UPWORK CONTRACT</span>
                  </span>
                </div>

                {/* Contract Job Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00FFC2] transition-colors mb-2">
                  {review.jobTitle}
                </h3>

                {/* Date & Contract Details */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{review.date}</span>
                  </span>
                  <span>&bull;</span>
                  <span className="text-[#00FFC2] font-semibold">
                    {review.contractPrice} ({review.contractType})
                  </span>
                  {review.endorsement && (
                    <>
                      <span>&bull;</span>
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <Award className="w-3 h-3" />
                        <span>{review.endorsement}</span>
                      </span>
                    </>
                  )}
                </div>

                {/* Client Quote Text */}
                <div className="p-5 rounded-2xl bg-[#0B0E12] border border-white/5 mb-6">
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic font-light">
                    &ldquo;{review.content}&rdquo;
                  </p>
                </div>

                {/* Actual Screenshot Picture Container */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Sparkles className="w-3.5 h-3.5 text-[#14A800]" />
                      <span>Actual Upwork Contract Screenshot</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveImageModal(review.screenshot)}
                      className="text-[#00FFC2] hover:underline flex items-center gap-1"
                    >
                      <ZoomIn className="w-3 h-3" />
                      <span>Click to enlarge</span>
                    </button>
                  </div>

                  <div
                    onClick={() => setActiveImageModal(review.screenshot)}
                    className="cursor-zoom-in relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden border border-white/10 hover:border-[#14A800]/60 transition-all duration-300 bg-[#000000]"
                  >
                    <Image
                      src={review.screenshot}
                      alt={`${review.jobTitle} Upwork review screenshot`}
                      fill
                      className="object-contain p-2 hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-transparent hover:bg-black/10 transition-colors" />
                  </div>
                </div>
              </div>

              {/* Skills / Tags Footer */}
              <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {review.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="text-xs font-mono text-slate-400">
                  Client via <strong className="text-white">Upwork</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Fullscreen Image Modal */}
      {activeImageModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveImageModal(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full bg-[#121519] border border-white/20 rounded-2xl p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <span className="text-xs font-mono text-[#14A800] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>UPWORK VERIFIED REVIEW SCREENSHOT</span>
              </span>
              <button
                onClick={() => setActiveImageModal(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full h-[60vh] sm:h-[70vh]">
              <Image
                src={activeImageModal}
                alt="Upwork review full screenshot"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
