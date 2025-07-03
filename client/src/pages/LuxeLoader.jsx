
import React, { useState, useEffect } from "react";

const LuxeLoader = () => {
  const [progress, setProgress] = useState(0);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0; // Reset for continuous animation
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-slate-950 overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black animate-pulse" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Pulsing Outer Ring */}
      <div className="absolute w-80 h-80 border border-white/10 rounded-full animate-ping" />
      <div className="absolute w-96 h-96 border border-white/5 rounded-full animate-pulse" />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Progress Ring */}
        <div className="relative mb-8">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#progress-gradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${progress * 2.83} 283`}
              className="transition-all duration-100 ease-out"
            />
          </svg>
          {/* Progress Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/80 font-mono text-sm">
              {progress}%
            </span>
          </div>
        </div>

        {/* LUXE SVG Loader Icons with enhanced effects */}
        <div className="flex gap-1 mt-10 flex-wrap justify-center relative">
          {/* Glowing background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-xl animate-pulse" />
          
          {/* L Shape */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 64 64"
            className="inline-block w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 animate-[dashArray_2s_ease-in-out_infinite,dashOffset_2s_linear_infinite,glow_2s_ease-in-out_infinite]"
          >
            <path
              stroke="url(#text-gradient)"
              strokeWidth={8}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 8 V56 H48"
              pathLength={360}
            />
          </svg>

          {/* U Shape */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 64 72"
            className="inline-block w-14 h-32 sm:w-16 sm:h-24 md:w-20 md:h-28 animate-[dashArray_2s_ease-in-out_infinite,dashOffset_2s_linear_infinite,glow_2s_ease-in-out_infinite] delay-300"
          >
            <path
              stroke="url(#text-gradient)"
              strokeWidth={8}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 8 Q32 56 48 8"
              pathLength={360}
            />
          </svg>

          {/* X Shape */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 64 64"
            className="inline-block w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 animate-[dashArray_2s_ease-in-out_infinite,dashOffset_2s_linear_infinite,glow_2s_ease-in-out_infinite] delay-500"
          >
            <path
              stroke="url(#text-gradient)"
              strokeWidth={8}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 8 L48 56 M48 8 L16 56"
              pathLength={360}
            />
          </svg>

          {/* E Shape */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 64 64"
            className="inline-block w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 animate-[dashArray_2s_ease-in-out_infinite,dashOffset_2s_linear_infinite,glow_2s_ease-in-out_infinite] delay-700"
          >
            <path
              stroke="url(#text-gradient)"
              strokeWidth={8}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 8 H48 M16 32 Q32 24 48 32 M16 56 H48"
              pathLength={360}
            />
          </svg>

          {/* Enhanced Animated Dots */}
          <div className="flex gap-2 relative top-10 sm:top-12 md:top-14">
            {[...Array(3)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 64 64"
                className="inline-block w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 animate-[bounce_1s_infinite,glow_2s_ease-in-out_infinite]"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <circle cx="32" cy="32" r="8" stroke="url(#text-gradient)" strokeWidth={4} fill="none" />
              </svg>
            ))}
          </div>
        </div>

        {/* Loading Text */}
        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm font-light tracking-widest animate-pulse">
            LOADING EXPERIENCE
          </p>
          <div className="mt-2 flex justify-center gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-white/40 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Gradient Definitions */}
      <svg height={0} width={0} viewBox="0 0 64 64" className="absolute">
        <defs>
          <linearGradient id="text-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#FFFFFF" offset="0%" />
            <stop stopColor="#888888" offset="50%" />
            <stop stopColor="#666666" offset="100%" />
          </linearGradient>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#FFFFFF" offset="0%" />
            <stop stopColor="#CCCCCC" offset="100%" />
          </linearGradient>
        </defs>
      </svg>

      {/* Enhanced CSS Animations */}
      <style>{`
        @keyframes wave-text {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-wave-text {
          background-size: 200% 200%;
          animation: wave-text 4s linear infinite;
        }
        @keyframes dashArray {
          0% { stroke-dasharray: 0 1 359 0; }
          50% { stroke-dasharray: 0 359 1 0; }
          100% { stroke-dasharray: 359 1 0 0; }
        }
        @keyframes dashOffset {
          0% { stroke-dashoffset: 365; }
          100% { stroke-dashoffset: 5; }
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(255,255,255,0.3)); }
          50% { filter: drop-shadow(0 0 20px rgba(255,255,255,0.8)) drop-shadow(0 0 30px rgba(255,255,255,0.4)); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LuxeLoader;
