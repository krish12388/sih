import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#05060a] text-white flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-10 py-6 bg-transparent backdrop-blur-md border-b border-white/10">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          TrafficAI
        </Link>
        <nav className="space-x-8 text-gray-300">
          <a href="#features" className="hover:text-white transition">Features</a>
          <Link to="/login" className="hover:text-white transition">Log In</Link>
          <Link to="/contact" className="hover:text-white transition">Contact</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between flex-1 px-10 py-20">
        {/* Left Content */}
        <div className="md:w-1/2">
          <h2 className="text-5xl font-extrabold leading-tight mb-6">
            Smarter <span className="text-cyan-400">Traffic</span>, <br /> 
            Safer <span className="text-purple-400">Cities</span>.
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Harness the power of AI-driven analytics to monitor, predict, 
            and optimize urban traffic flow in real-time. 
          </p>
          <div className="flex space-x-6">
            <Link to="/login" className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold shadow-lg hover:opacity-90 transition">
              Get Started
            </Link>
            <Link to="/contact" className="px-6 py-3 rounded-xl border border-cyan-400 text-cyan-300 font-semibold hover:bg-cyan-400/10 transition">
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Content (Illustration / SVG) */}
        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" width="100%" height="100%">
  <defs>
    {/* Gradients */}
    <linearGradient id="trafficGradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#00f0ff"/>
      <stop offset="100%" stop-color="#7b4dff"/>
    </linearGradient>
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#0e1620" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#05060a" stop-opacity="0.4"/>
    </radialGradient>
    {/* Glow */}
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    {/* Road paths for motion */}
    <path id="roadPath1" d="M100 500 C 300 300, 600 600, 1100 400" />
    <path id="roadPath2" d="M150 200 C 500 100, 800 500, 1050 300" />
  </defs>

  {/* Background */}
  <rect width="1200" height="700" fill="url(#bgGlow)" rx="24"/>

  {/* Futuristic grid */}
  <g stroke="#ffffff10" stroke-width="1">
    <line x1="200" y1="0" x2="200" y2="700"/>
    <line x1="400" y1="0" x2="400" y2="700"/>
    <line x1="600" y1="0" x2="600" y2="700"/>
    <line x1="800" y1="0" x2="800" y2="700"/>
    <line x1="1000" y1="0" x2="1000" y2="700"/>
    <line x1="0" y1="150" x2="1200" y2="150"/>
    <line x1="0" y1="300" x2="1200" y2="300"/>
    <line x1="0" y1="450" x2="1200" y2="450"/>
    <line x1="0" y1="600" x2="1200" y2="600"/>
  </g>

  {/* Roads */}
  <use href="#roadPath1" stroke="url(#trafficGradient)" stroke-width="6" fill="none" stroke-linecap="round" filter="url(#glow)"/>
  <use href="#roadPath2" stroke="#3efb7a" stroke-width="4" fill="none" stroke-dasharray="12 8" opacity="0.7"/>

  {/* Dynamic Vehicles */}
  <g filter="url(#glow)">
    {/* Car 1 */}
    <rect width="40" height="20" rx="4" fill="#00f0ff">
      <animateMotion dur="12s" repeatCount="indefinite" rotate="auto">
        <mpath href="#roadPath1"/>
      </animateMotion>
    </rect>
    {/* Car 2 */}
    <rect width="50" height="22" rx="4" fill="#ff4d6d">
      <animateMotion dur="15s" repeatCount="indefinite" rotate="auto" begin="3s">
        <mpath href="#roadPath1"/>
      </animateMotion>
    </rect>
    {/* Car 3 */}
    <rect width="35" height="18" rx="3" fill="#3efb7a">
      <animateMotion dur="10s" repeatCount="indefinite" rotate="auto" begin="5s">
        <mpath href="#roadPath2"/>
      </animateMotion>
    </rect>
  </g>

  {/* Traffic Lights (Animated) */}
  <g transform="translate(280,300)" filter="url(#glow)">
    <rect width="20" height="60" rx="6" fill="#1c1c2b" stroke="#444" stroke-width="2"/>
    <circle cx="10" cy="12" r="6" fill="#ff4d4d">
      <animate attributeName="fill" values="#ff4d4d;#222;#222" dur="6s" repeatCount="indefinite"/>
    </circle>
    <circle cx="10" cy="30" r="6" fill="#222">
      <animate attributeName="fill" values="#222;#ffeb3b;#222" dur="6s" begin="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="10" cy="48" r="6" fill="#222">
      <animate attributeName="fill" values="#222;#222;#4caf50" dur="6s" begin="4s" repeatCount="indefinite"/>
    </circle>
  </g>

  {/* Avatars (AI Agents) */}
  <circle cx="600" cy="420" r="22" fill="url(#trafficGradient)" stroke="#00f0ff" stroke-width="3" filter="url(#glow)">
    <animate attributeName="r" values="22;25;22" dur="4s" repeatCount="indefinite"/>
  </circle>
  <circle cx="850" cy="320" r="18" fill="#3efb7a" stroke="#00ffcc" stroke-width="2" filter="url(#glow)">
    <animate attributeName="r" values="18;21;18" dur="5s" repeatCount="indefinite"/>
  </circle>

  {/* Futuristic Title */}
  <text x="600" y="650" text-anchor="middle" font-size="36" fill="url(#trafficGradient)" font-family="Inter, sans-serif" font-weight="700">
    AI-Powered Traffic Flow Management
  </text>
</svg>

        </div>
      </section>

       {/* Features Section */}
      <section className="features py-24 px-6 relative">
        <h2 className="text-4xl font-bold text-center mb-16">
          Why Choose Our System?
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Real-time Monitoring",
              desc: "Track traffic flow across the city with AI-powered live updates.",
              icon: "📡",
            },
            {
              title: "Smart Insights",
              desc: "Get predictive analytics to prevent congestion before it happens.",
              icon: "⚡",
            },
            {
              title: "Seamless Integration",
              desc: "Easily connect with existing city infrastructure and IoT devices.",
              icon: "🌐",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/10 hover:border-[#00f0ff66] transition"
            >
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 border-t border-white/10">
        © 2025 TrafficAI. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
