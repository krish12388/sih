// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, validationRules } from "../hooks/useForm";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useForm(
    {
      email: '',
      password: ''
    },
    {
      email: [
        validationRules.required('Email is required'),
        validationRules.email('Please enter a valid email address')
      ],
      password: [
        validationRules.required('Password is required'),
        validationRules.minLength(6, 'Password must be at least 6 characters')
      ]
    }
  );

  const onSubmit = async (formValues) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic
      if (formValues.email === 'admin@trafficai.com' && formValues.password === 'password123') {
        setSubmitMessage({ type: 'success', text: 'Login successful! Redirecting...' });
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setSubmitMessage({ type: 'error', text: 'Invalid email or password' });
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Login failed. Please try again.' });
    }
  };

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

        {/* Submit Message */}
        {submitMessage.text && (
          <div className={`mb-6 p-3 rounded-lg flex items-center space-x-2 ${
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

        {/* Form */}
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit);
        }} className="space-y-5">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border transition ${
                errors.email && touched.email
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-white/20 focus:border-[#00f0ff]'
              } focus:outline-none`}
            />
            {errors.email && touched.email && (
              <p className="text-red-400 text-xs mt-1 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.email}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="••••••••"
                className={`w-full px-4 py-3 pr-12 rounded-lg bg-white/10 text-white placeholder-gray-400 border transition ${
                  errors.password && touched.password
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/20 focus:border-[#7b4dff]'
                } focus:outline-none`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="text-red-400 text-xs mt-1 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.password}
              </p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#00f0ff] to-[#7b4dff] text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <p className="text-blue-300 text-xs text-center">
            Demo: admin@trafficai.com / password123
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/contact" className="text-[#00f0ff] hover:underline">
            Contact Us
          </Link>
        </p>
      </div>
    </div>
  );
}
