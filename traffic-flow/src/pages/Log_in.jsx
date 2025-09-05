// src/pages/Login.jsx
import React from "react";

export default function Login() {
  return (
    <div className="min-h-screen flex p-22 items-center justify-center bg-gradient-to-br from-[#020205] via-[#0e1620] to-[#1a1a2f] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[800px] h-[800px] bg-[#22156138] rounded-full blur-3xl -top-40 -left-40"></div>
      <div className="absolute w-[600px] h-[600px] bg-[#36109f33] rounded-full blur-3xl -bottom-40 -right-40"></div>

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <svg width="60" height="60" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="url(#grad)" strokeWidth="6" fill="none"/>
            <circle cx="50" cy="50" r="6" fill="#00f0ff" />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00f0ff"/>
                <stop offset="100%" stopColor="#7b4dff"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Sign in to manage traffic flow
        </p>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-[#00f0ff] transition"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-[#7b4dff] transition"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#00f0ff] to-[#7b4dff] text-white font-semibold shadow-lg hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don’t have an account?{" "}
          <a href="#" className="text-[#00f0ff] hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
