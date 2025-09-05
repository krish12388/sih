// src/pages/Contact.jsx
import React, { useState } from "react";
import { useForm, validationRules } from "../hooks/useForm";
import { AlertCircle, CheckCircle, Send } from "lucide-react";

export default function Contact() {
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useForm(
    {
      name: '',
      email: '',
      message: ''
    },
    {
      name: [
        validationRules.required('Name is required'),
        validationRules.minLength(2, 'Name must be at least 2 characters')
      ],
      email: [
        validationRules.required('Email is required'),
        validationRules.email('Please enter a valid email address')
      ],
      message: [
        validationRules.required('Message is required'),
        validationRules.minLength(10, 'Message must be at least 10 characters')
      ]
    }
  );

  const onSubmit = async (formValues) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock form submission
      console.log('Contact form submitted:', formValues);
      setSubmitMessage({ 
        type: 'success', 
        text: 'Thank you for your message! We\'ll get back to you within 24 hours.' 
      });
      
      // Reset form after successful submission
      setTimeout(() => {
        setSubmitMessage({ type: '', text: '' });
      }, 5000);
      
    } catch (error) {
      setSubmitMessage({ 
        type: 'error', 
        text: 'Failed to send message. Please try again later.' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#05060a] text-white flex flex-col items-center justify-center relative overflow-hidden px-6 py-16">
      {/* Subtle Background Glow */}
      <div className="absolute w-[800px] h-[800px] bg-[#110033] rounded-full blur-3xl -top-40 -left-40"></div>
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
        <div className="p-10 rounded-2xl max-h-[100%] bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
          <h2 className="text-2xl font-semibold mb-8">Get in Touch</h2>
          <ul className="space-y-8 text-gray-300">
            <li>
              <span className="block text-sm text-gray-500">📧 Email</span>
              <a href="mailto:support@trafficai.com" className="hover:text-[#00f0ff] transition">
                help@trafficai.com
              </a>
            </li>
            <li>
              <span className="block text-sm text-gray-500">📞 Phone</span>
              <a href="tel:+919646488995" className="hover:text-[#00f0ff] transition">
                +91 9646488995
              </a>
            </li>
            <li>
              <span className="block text-sm text-gray-500">📍 Address</span>
              <p>123 Maharaja Surajmal Institute</p>
            </li>
          </ul>
          
          {/* Additional Info */}
          <div className="mt-8 p-4 mt-22 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Business Hours</h3>
            <p className="text-sm text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-sm text-gray-300">Saturday: 10:00 AM - 4:00 PM</p>
            <p className="text-sm text-gray-300">Sunday: Closed</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-10 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
          <h2 className="text-2xl font-semibold mb-8">Send a Message</h2>
          
          {/* Submit Message */}
          {submitMessage.text && (
            <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
              submitMessage.type === 'success' 
                ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                : 'bg-red-500/20 border border-red-500/30 text-red-300'
            }`}>
              {submitMessage.type === 'success' ? (
                <CheckCircle size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              <span className="text-sm">{submitMessage.text}</span>
            </div>
          )}

          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit);
          }} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your Name"
                className={`w-full px-4 py-3 rounded-lg bg-[#0a0f1a] text-white placeholder-gray-500 border transition focus:outline-none ${
                  errors.name && touched.name
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/20 focus:border-[#00f0ff]'
                }`}
              />
              {errors.name && touched.name && (
                <p className="text-red-400 text-xs mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.name}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-lg bg-[#0a0f1a] text-white placeholder-gray-500 border transition focus:outline-none ${
                  errors.email && touched.email
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/20 focus:border-[#7b4dff]'
                }`}
              />
              {errors.email && touched.email && (
                <p className="text-red-400 text-xs mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.email}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Message</label>
              <textarea
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows="5"
                placeholder="Write your message..."
                className={`w-full px-4 py-3 rounded-lg bg-[#0a0f1a] text-white placeholder-gray-500 border transition focus:outline-none resize-none ${
                  errors.message && touched.message
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/20 focus:border-[#00f0ff]'
                }`}
              />
              {errors.message && touched.message && (
                <p className="text-red-400 text-xs mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.message}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {values.message.length}/500 characters
              </p>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#00f0ff] to-[#7b4dff] text-white font-semibold shadow-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
