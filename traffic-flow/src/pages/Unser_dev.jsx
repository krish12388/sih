// src/pages/UnderDevelopment.jsx
import React from "react";

export default function UnderDevelopment() {
  return (
    <div className="min-h-screen bg-[#05060a] flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute w-[700px] h-[700px] bg-[#00f0ff22] rounded-full blur-3xl -top-40 -left-40"></div>
      <div className="absolute w-[600px] h-[600px] bg-[#7b4dff22] rounded-full blur-3xl -bottom-40 -right-40"></div>

      {/* Content */}
      <div className="relative z-10 px-6">
        {/* Futuristic Icon (⚙️ or AI-like SVG) */}
        <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b4dff] text-black font-bold text-3xl shadow-lg">
          ⚙️
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00f0ff] to-[#7b4dff] bg-clip-text text-transparent">
          Page Under Development
        </h1>

        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          We’re working hard to bring this page to life.  
          Stay tuned for updates — the future of traffic management is on the way.
        </p>

        {/* Call-to-Action */}
        <div className="mt-8">
          <a
            href="/"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#00f0ff] to-[#7b4dff] text-white font-medium shadow-md hover:opacity-90 transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
