import React from 'react';

export default function GlowingLaptop() {
  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center">
      {/* Background radial amber ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#FFB020]/25 via-[#FF8A24]/10 to-transparent rounded-3xl blur-3xl" />

      <svg
        viewBox="0 0 500 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-[0_20px_50px_rgba(255,176,32,0.25)]"
      >
        <defs>
          <linearGradient id="amberMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2B3033" />
            <stop offset="100%" stopColor="#171A1C" />
          </linearGradient>
          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#111416" />
            <stop offset="100%" stopColor="#0B0D0E" />
          </linearGradient>
          <linearGradient id="laptopGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD43B" />
            <stop offset="50%" stopColor="#FFB020" />
            <stop offset="100%" stopColor="#FF8A24" />
          </linearGradient>
          <linearGradient id="cardGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#202326" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#171A1C" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Floating Background Glow Disc */}
        <ellipse cx="250" cy="310" rx="180" ry="45" fill="url(#laptopGlow)" opacity="0.15" />

        {/* Isometric Laptop Base / Keyboard Deck */}
        <polygon points="120,290 380,290 430,340 70,340" fill="url(#amberMetal)" stroke="#3F464B" strokeWidth="2" />
        <polygon points="70,340 430,340 430,352 70,352" fill="#111416" stroke="#2B3033" strokeWidth="1.5" />
        
        {/* Trackpad */}
        <polygon points="215,310 285,310 295,335 205,335" fill="#171A1C" stroke="#2B3033" strokeWidth="1" />

        {/* Keyboard keys preview texture */}
        <polygon points="135,296 365,296 375,306 125,306" fill="#111416" opacity="0.6" />

        {/* Laptop Screen (Open at angle) */}
        <polygon points="120,290 380,290 350,110 150,110" fill="url(#amberMetal)" stroke="#3F464B" strokeWidth="2" />
        <polygon points="130,282 370,282 342,120 158,120" fill="url(#screenGrad)" stroke="#FFB020" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* Amber Code Brackets </> inside Screen */}
        <g transform="translate(250, 200) scale(1.2)">
          {/* Left bracket < */}
          <path d="M-28 -18 L-44 0 L-28 18" stroke="url(#laptopGlow)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Slash / */}
          <path d="M-8 22 L8 -22" stroke="url(#laptopGlow)" strokeWidth="4.5" strokeLinecap="round" />
          {/* Right bracket > */}
          <path d="M28 -18 L44 0 L28 18" stroke="url(#laptopGlow)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Floating Code Card 1 (Top Right) */}
        <g transform="translate(320, 80) rotate(-6)">
          <rect width="130" height="85" rx="12" fill="url(#cardGlow)" stroke="#FFB020" strokeWidth="1.5" strokeOpacity="0.5" />
          <line x1="16" y1="20" x2="60" y2="20" stroke="#FFD43B" strokeWidth="3" strokeLinecap="round" />
          <line x1="16" y1="36" x2="105" y2="36" stroke="#737B82" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="48" x2="90" y2="48" stroke="#737B82" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="60" x2="114" y2="60" stroke="#FFB020" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
        </g>

        {/* Floating Tech Pill 2 (Left Side) */}
        <g transform="translate(60, 160) rotate(8)">
          <rect width="90" height="54" rx="10" fill="url(#cardGlow)" stroke="#2B3033" strokeWidth="1.5" />
          <circle cx="25" cy="27" r="8" fill="#FFB020" fillOpacity="0.2" stroke="#FFD43B" strokeWidth="1.5" />
          <line x1="42" y1="23" x2="75" y2="23" stroke="#F7F7F2" strokeWidth="2" strokeLinecap="round" />
          <line x1="42" y1="32" x2="68" y2="32" stroke="#A7ADB2" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
