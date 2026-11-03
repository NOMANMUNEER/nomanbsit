"use client";

import { useState, useRef } from "react";
import { Play, Video, Users, Sparkles, Volume2, VolumeX, Maximize } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section id="video-meeting" className="relative z-10 py-16 px-6 lg:px-16 overflow-hidden">
      {/* Background radial glow */}
      <div className="ambient-glow-top-right" />

      <div className="max-w-6xl mx-auto">
        
        {/* Intro Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00FFC2]/10 border border-[#00FFC2]/30 text-[#00FFC2] font-mono text-xs mb-4">
            <Video className="w-3.5 h-3.5" />
            <span>CLIENT CONSULTATION & MEETING DEMO</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
            See how I collaborate <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#00FFC2]">
              directly with clients.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Watch a quick recorded excerpt of a client strategy session, feature breakdown, and engineering discussion.
          </p>
        </div>

        {/* Video Player Card */}
        <div className="relative group rounded-3xl overflow-hidden border border-white/10 bg-[#121519] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          {/* Cyan Glow Border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFC2]/30 via-emerald-500/20 to-transparent rounded-3xl opacity-50 group-hover:opacity-100 transition duration-700 pointer-events-none" />

          <div className="relative aspect-video w-full overflow-hidden bg-black">
            <video
              ref={videoRef}
              src={PORTFOLIO_DATA.videoMeeting.videoUrl}
              playsInline
              controls={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
              onClick={togglePlay}
            />

            {/* Overlay Gradient when paused */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-black/40 to-transparent flex flex-col justify-between p-6 sm:p-10 pointer-events-none z-10">
                
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300">
                    <span className="pulse-dot" />
                    <span>CLIENT MEETING RECORDING</span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-[#00FFC2]">
                    <Users className="w-3.5 h-3.5" />
                    <span>1-on-1 Consultation</span>
                  </div>
                </div>

                {/* Bottom Video Details */}
                <div className="max-w-xl">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                    {PORTFOLIO_DATA.videoMeeting.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light">
                    {PORTFOLIO_DATA.videoMeeting.subtitle}
                  </p>
                </div>

              </div>
            )}

            {/* Centered Big Play Button when paused */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                aria-label="Play client video recording"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#00FFC2] text-black flex items-center justify-center shadow-[0_0_35px_rgba(0,255,194,0.6)] hover:scale-110 transition-transform duration-300 z-20"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-black ml-1" />
              </button>
            )}

            {/* Quick Action Badges */}
            {!isPlaying && (
              <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:text-[#00FFC2] transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:text-[#00FFC2] transition-colors"
                >
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Video Metadata Bar */}
          <div className="p-6 bg-[#121519] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-[#00FFC2]" />
              <span>Recorded Session • Client Strategy & Code Discussion</span>
            </div>

            <div className="flex items-center gap-4">
              <span>STATUS: AVAILABLE FOR NEW CLIENTS</span>
              <a
                href={PORTFOLIO_DATA.personal.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00FFC2] hover:underline"
              >
                Schedule Your Call ↗
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
