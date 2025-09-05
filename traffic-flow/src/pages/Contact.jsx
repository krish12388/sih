// src/pages/Contact.jsx
import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#05060a] text-white flex flex-col items-center justify-center relative overflow-hidden px-6 py-16">
      {/* Subtle Background Glow */}
      <div className="absolute w-[800px] h-[800px] bg-[#00f0ff22] rounded-full blur-3xl -top-40 -left-40"></div>
      <div className="absolute w-[600px] h-[600px] bg-[#7b4dff22] rounded-full blur-3xl -bottom-40 -right-40"></div>

      {/* Heading */}
      <div className="text-center relative z-10 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00f0ff] to-[#7b4dff] bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Have questions about our AI-powered traffic management system?  
          Reach out and our team will get back to you shortly.
        </p>
      </div>

      {/* Contact Section */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
        {/* Contact Info */}
        <div className="p-10 rounded-2xl max-h-[60%] bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
          <h2 className="text-2xl font-semibold mb-8">Get in Touch</h2>
          <ul className="space-y-8 text-gray-300">
            <li>
              <span className="block text-sm text-gray-500">📧 Email</span>
              <a href="mailto:support@trafficai.com" className="hover:text-[#00f0ff]">
                help@trafficai.com
              </a>
            </li>
            <li>
              <span className="block text-sm text-gray-500">📞 Phone</span>
              <a href="tel:+123456789" className="hover:text-[#00f0ff]">
                +91 9646488995
              </a>
            </li>
            <li>
              <span className="block text-sm text-gray-500">📍 Address</span>
              <p>123 Maharaja Surajmal Institute</p>
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="p-10 rounded-2xl  bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
          <h2 className="text-2xl font-semibold mb-8">Send a Message</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-[#0a0f1a] text-white placeholder-gray-500 border border-white/20 focus:outline-none focus:border-[#00f0ff] transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-[#0a0f1a] text-white placeholder-gray-500 border border-white/20 focus:outline-none focus:border-[#7b4dff] transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Message</label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full px-4 py-3 rounded-lg bg-[#0a0f1a] text-white placeholder-gray-500 border border-white/20 focus:outline-none focus:border-[#00f0ff] transition"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#00f0ff] to-[#7b4dff] text-white font-semibold shadow-md hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
