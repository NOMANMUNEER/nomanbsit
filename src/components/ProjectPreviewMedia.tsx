"use client";

import { useState, useRef, useEffect, useCallback, useSyncExternalStore } from "react";
import { ProjectPreview } from "@/data/portfolioData";
import { Volume2, VolumeX, Eye, ArrowDown, ArrowUp } from "lucide-react";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

interface ProjectPreviewMediaProps {
  preview: ProjectPreview;
  title: string;
  isCardHovered?: boolean;
}

export default function ProjectPreviewMedia({
  preview,
  title,
  isCardHovered = false,
}: ProjectPreviewMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [travelDistance, setTravelDistance] = useState<number>(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isTouchActive, setIsTouchActive] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const [isMuted, setIsMuted] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Measure actual travel distance for scroll-image from rendered container vs image natural aspect ratio
  const calculateTravel = useCallback(() => {
    if (!containerRef.current || !imgRef.current) return;
    const container = containerRef.current;
    const img = imgRef.current;

    const containerHeight = container.clientHeight;
    const containerWidth = container.clientWidth;

    if (containerWidth === 0 || img.naturalWidth === 0) return;

    // The image is rendered width-filled (width: 100%, height: auto)
    const renderedHeight = (img.naturalHeight / img.naturalWidth) * containerWidth;
    const maxTravel = Math.max(0, renderedHeight - containerHeight);
    setTravelDistance(Math.round(maxTravel));
  }, []);

  // Recalculate on window resize
  useEffect(() => {
    if (preview.type !== "scroll-image") return;
    calculateTravel();

    const handleResize = () => calculateTravel();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [preview.type, calculateTravel]);

  // Video IntersectionObserver to pause when offscreen
  useEffect(() => {
    if (preview.type !== "video" || !videoRef.current) return;

    const videoEl = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoEl.play().catch(() => {
              // Autoplay policies might require user interaction; handled gracefully
            });
          } else {
            videoEl.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(videoEl);
    return () => observer.disconnect();
  }, [preview.type]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleTouchScroll = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsTouchActive((prev) => !prev);
  };

  // Determine if scrolling should be active
  const shouldScroll = (isCardHovered || isFocused || isTouchActive) && travelDistance > 0;
  // Natural animation duration proportional to scroll distance (average ~250px per second)
  const durationSeconds = prefersReducedMotion
    ? 0
    : Math.min(8, Math.max(2.2, travelDistance / 260));

  return (
    <div
      ref={containerRef}
      tabIndex={preview.type === "scroll-image" ? 0 : -1}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/10 group-hover:border-[#00FFC2]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00FFC2]"
      aria-label={`Preview of ${title}`}
    >
      {preview.type === "scroll-image" ? (
        <div className="relative w-full h-full overflow-hidden bg-[#0A0D11]">
          {/* Shimmer Placeholder before load */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
              <span className="text-xs font-mono text-slate-500">Loading preview...</span>
            </div>
          )}

          {/* Full Page Tall Image */}
          <img
            ref={imgRef}
            src={preview.src}
            alt={preview.alt || title}
            loading="lazy"
            onLoad={() => {
              setImageLoaded(true);
              calculateTravel();
            }}
            style={{
              transform: shouldScroll && !prefersReducedMotion ? `translateY(-${travelDistance}px)` : "translateY(0px)",
              transition: prefersReducedMotion
                ? "none"
                : shouldScroll
                ? `transform ${durationSeconds}s cubic-bezier(0.25, 1, 0.5, 1)`
                : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "transform",
            }}
            className="w-full h-auto block select-none pointer-events-none"
          />

          {/* Vignette Gradients for depth */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#121519] to-transparent opacity-60 pointer-events-none" />

          {/* Scrollable Indicator Pill on Desktop */}
          {travelDistance > 0 && !prefersReducedMotion && (
            <div className="hidden md:flex absolute bottom-3 right-3 items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300 pointer-events-none transition-opacity duration-300 opacity-90 group-hover:opacity-100">
              <Eye className="w-3 h-3 text-[#00FFC2]" />
              <span>{shouldScroll ? "Scrolling..." : "Hover to scroll"}</span>
            </div>
          )}

          {/* Mobile Touch Preview Toggle Button */}
          {travelDistance > 0 && (
            <button
              onClick={toggleTouchScroll}
              type="button"
              className="md:hidden absolute bottom-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#00FFC2]/50 text-[11px] font-mono text-[#00FFC2] shadow-lg active:scale-95"
              aria-label={isTouchActive ? "Reset preview" : "Scroll full preview"}
            >
              {isTouchActive ? (
                <>
                  <ArrowUp className="w-3 h-3" />
                  <span>Reset</span>
                </>
              ) : (
                <>
                  <ArrowDown className="w-3 h-3" />
                  <span>Scroll</span>
                </>
              )}
            </button>
          )}
        </div>
      ) : preview.type === "video" ? (
        <div className="relative w-full h-full overflow-hidden bg-black">
          <video
            ref={videoRef}
            src={preview.src}
            poster={preview.poster}
            playsInline
            muted={isMuted}
            loop
            preload="metadata"
            className="w-full h-full object-cover"
          />

          {/* Audio Mute/Unmute Toggle */}
          <button
            onClick={toggleMute}
            type="button"
            className="absolute bottom-3 right-3 z-20 p-2 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white hover:text-[#00FFC2] transition-colors"
            aria-label={isMuted ? "Unmute video preview" : "Mute video preview"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      ) : (
        /* Standard Static Image Preview */
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={preview.src}
            alt={preview.alt || title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121519] via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>
      )}
    </div>
  );
}
