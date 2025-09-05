import React from "react";

export default function Pannel() {
  return (
    <div className="bg-[#0d1117] text-white flex gap-4 flex-col justify-center items-center p-2 rounded-lg border border-gray-800 shadow-md mb-6">
      <div className="w-full max-w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="g1" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#00f0ff" />
              <stop offset="1" stopColor="#7b4dff" />
            </linearGradient>
            <linearGradient id="g2" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#3efb7a" />
              <stop offset="1" stopColor="#00d4ff" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="bgGlow" cx="20%" cy="10%" r="60%">
              <stop offset="0" stopColor="#0e1620" stopOpacity="0.8" />
              <stop offset="1" stopColor="#05060a" stopOpacity="0.25" />
            </radialGradient>
            <pattern id="moveDash" patternUnits="userSpaceOnUse" width="40" height="40">
              <path d="M0 20 H40" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeLinecap="round" />
            </pattern>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0b1220" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#05060a" />
          <rect width="100%" height="100%" fill="url(#bgGlow)" opacity="0.6" />
          <rect width="100%" height="100%" fill="url(#grid)" opacity="0.35" />
          <g transform="translate(40,220)">
            <rect x="0" y="80" width="36" height="80" rx="6" fill="#071019" />
            <rect x="56" y="40" width="48" height="120" rx="6" fill="#071019" />
            <rect x="120" y="0" width="90" height="160" rx="6" fill="#071019" />
            <rect x="230" y="56" width="44" height="104" rx="6" fill="#071019" />
            <rect x="288" y="20" width="72" height="140" rx="6" fill="#071019" />
            <rect x="370" y="90" width="28" height="70" rx="6" fill="#071019" />
            <rect x="418" y="10" width="60" height="150" rx="6" fill="#071019" />
            <rect x="496" y="38" width="40" height="122" rx="6" fill="#071019" />
            <rect x="552" y="85" width="36" height="75" rx="6" fill="#071019" />
            <rect x="608" y="30" width="64" height="130" rx="6" fill="#071019" />
            <rect x="690" y="60" width="38" height="100" rx="6" fill="#071019" />
          </g>
          <g transform="translate(0,300)">
            <path d="M40 0 Q 160 -10 280 0 T 640 0 T 1100 0" fill="none" stroke="url(#g1)" strokeWidth="2" opacity="0.9" filter="url(#glow)" />
            <path d="M40 2 Q 160 -6 280 2 T 640 2 T 1100 2" fill="none" stroke="rgba(123,77,255,0.18)" strokeWidth="8" opacity="0.35" />
          </g>
          <g id="network" filter="url(#glow)" opacity="0.95">
            <path d="M200 220 C260 180 340 180 420 220" fill="none" stroke="url(#g2)" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.95" />
            <path d="M340 200 C420 160 520 160 620 200" fill="none" stroke="url(#g1)" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.95" />
            <path d="M60 260 C150 220 310 220 480 260" fill="none" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.25" strokeDasharray="6 12">
              <animate attributeName="stroke-dashoffset" from="0" to="-96" dur="6s" repeatCount="indefinite" />
            </path>
            {/* nodes */}
            <g>
              <circle cx="200" cy="220" r="6" fill="#00f0ff" />
              <circle cx="420" cy="220" r="4" fill="#7b4dff" />
              <circle cx="340" cy="200" r="5" fill="#3efb7a" />
              <circle cx="620" cy="200" r="6" fill="#00d4ff" />
              <circle cx="480" cy="260" r="4" fill="#7b4dff" />
              {/* node pulses */}
              <circle cx="200" cy="220" r="6" fill="#00f0ff" opacity="0.25">
                <animate attributeName="r" values="6;18" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.25;0" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="620" cy="200" r="6" fill="#00d4ff" opacity="0.25">
                <animate attributeName="r" values="6;20" dur="2.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.25;0" dur="2.8s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>
          <rect x="-200" y="120" width="600" height="120" fill="url(#moveDash)" opacity="0.06">
            <animate attributeName="x" from="-200" to="1200" dur="18s" repeatCount="indefinite" />
          </rect>
          <g transform="translate(80,60)" fill="#fff">
            <text x="0" y="0" fill="#cfefff" fontSize="28" fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" fontWeight="700">
              Traffic Control Dashboard
            </text>
            <text x="0" y="36" fill="#94a3b8" fontSize="14" fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial">
              Real-time monitoring & intelligent traffic insights
            </text>
            <rect x="0" y="52" width="180" height="36" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(0,240,255,0.12)" />
            <text x="16" y="78" fontSize="13" fill="#00f0ff" fontWeight="600" fontFamily="Inter, sans-serif">
              Live • Citywide
            </text>
          </g>
          <g transform="translate(1040,40)">
            <path d="M0 0 L26 0 L26 40 L0 40 Z" fill="none" stroke="url(#g1)" strokeWidth="1.4" opacity="0.7" />
            <circle cx="13" cy="20" r="9" fill="none" stroke="#00d4ff" strokeWidth="1.6" opacity="0.9" />
            <circle cx="13" cy="20" r="3" fill="#00d4ff">
              <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
          <rect x="0" y="400" width="1200" height="20" fill="rgba(0,0,0,0.3)" />
        </svg>
      </div>
      <button className="px-6 py-2 max-w-sm rounded-md font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 transition-all shadow-lg">
        Contact Us
      </button>
    </div>
  );
}
