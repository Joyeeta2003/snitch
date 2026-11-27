import React, { useState } from 'react';
import { Link } from 'react-router';

const CURRENT_YEAR = 2026;

const LOOKBOOK_IMAGE =
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80';

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.identifier || !formData.password) {
      setError('Please enter both your email/phone and password');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 flex flex-col font-sans selection:bg-[#facc15] selection:text-zinc-950 antialiased overflow-x-hidden">
      {/* Top Banner */}
      <div className="w-full bg-[#121216] border-b border-zinc-800/80 px-4 py-2 text-center text-xs tracking-wider text-zinc-400 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#facc15] animate-pulse shrink-0" />
        <span>
          MEMBER PRIVILEGES ACTIVE &bull; FREE EXPRESS SHIPPING ON ALL CLOTHING ORDERS OVER $50 / &#8377;999
        </span>
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 min-h-[calc(100vh-37px)]">
        {/* Left Column: Fashion Lookbook */}
        <div className="lg:col-span-5 xl:col-span-6 relative bg-gradient-to-b from-[#0f0f13] via-[#09090b] to-[#070709] border-b lg:border-b-0 lg:border-r border-zinc-800/70 p-6 sm:p-10 lg:p-14 flex flex-col justify-between overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-[#facc15]/10 blur-[150px] rounded-full" aria-hidden="true" />

          {/* Logo */}
          <div className="relative z-10 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#facc15] to-[#ca8a04] flex items-center justify-center shadow-[0_0_24px_rgba(250,204,21,0.3)] transition-transform group-hover:scale-105">
                <svg className="w-5 h-5 text-zinc-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tighter text-zinc-50 block leading-none">
                  SNITCH<span className="text-[#facc15]">.</span>
                </span>
                <span className="text-[10px] tracking-[0.25em] text-zinc-400 uppercase font-medium">
                  Unorthodox Apparel
                </span>
              </div>
            </Link>

            <Link
              to="/register"
              className="text-xs text-[#facc15] hover:text-[#eab308] transition-colors py-1 px-3 rounded-full border border-[#facc15]/30 bg-[#facc15]/10 font-semibold"
            >
              Get 15% Off Code
            </Link>
          </div>

          {/* Lookbook Feature */}
          <div className="relative z-10 my-8 sm:my-12">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group max-w-lg mx-auto lg:mx-0">
              <img
                src={LOOKBOOK_IMAGE}
                alt="SNITCH High-Fashion Apparel Lookbook"
                className="w-full h-64 sm:h-72 lg:h-80 object-cover object-top filter brightness-90 contrast-105 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-90" />
              
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-zinc-950/80 backdrop-blur-md text-[#facc15] border border-[#facc15]/30">
                  Member Portal
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs uppercase tracking-widest text-[#facc15] font-semibold">
                  Welcome Back
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-50 leading-tight">
                  Access your cart, order tracking, and secret drop reservations.
                </h3>
              </div>
            </div>
          </div>

          {/* Social Guarantee */}
          <div className="relative z-10 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
            <span>&copy; {CURRENT_YEAR} SNITCH APPAREL</span>
            <span className="text-[#facc15]">&bull; 256-Bit SSL Encrypted</span>
          </div>
        </div>

        {/* Right Column: Sign In Form */}
        <div className="lg:col-span-7 xl:col-span-6 bg-[#0a0a0c] p-6 sm:p-10 lg:p-14 xl:p-18 flex flex-col justify-center relative">
          <div className="w-full max-w-lg mx-auto relative z-10">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-[#facc15] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#facc15]" />
                Member Authentication
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-50">
                Sign in to SNITCH
              </h1>
              <p className="text-sm text-zinc-400 mt-2">
                Enter your registered email address or contact number to proceed.
              </p>
            </div>

            {isSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-[#facc15]/10 border border-[#facc15]/30 text-sm text-[#facc15]">
                Welcome back! Redirecting to your personalized clothing feed...
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-zinc-300">
                  Email Address or Contact Number
                </label>
                <div className="relative flex items-center group">
                  <div className="absolute left-3.5 text-zinc-500 group-focus-within:text-[#facc15] pointer-events-none">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <input
                    name="identifier"
                    type="text"
                    value={formData.identifier}
                    onChange={handleChange}
                    placeholder="name@snitch.co.in or +91 9876543210"
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-zinc-900/90 text-zinc-100 placeholder:text-zinc-600 text-sm border border-zinc-800 hover:border-zinc-700 focus:border-[#facc15] focus:ring-2 focus:ring-[#facc15]/20 outline-none transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium uppercase tracking-wider text-zinc-300">
                    Password
                  </label>
                  <a href="#forgot" className="text-xs text-[#facc15] hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative flex items-center group">
                  <div className="absolute left-3.5 text-zinc-500 group-focus-within:text-[#facc15] pointer-events-none">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    className="w-full h-12 pl-11 pr-11 rounded-xl bg-zinc-900/90 text-zinc-100 placeholder:text-zinc-600 text-sm tracking-wider border border-zinc-800 hover:border-zinc-700 focus:border-[#facc15] focus:ring-2 focus:ring-[#facc15]/20 outline-none transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3.5 text-zinc-500 hover:text-zinc-200 p-1"
                    aria-label="Toggle password"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="rounded bg-zinc-900 border-zinc-700 text-[#facc15] focus:ring-[#facc15]/20"
                  />
                  <span>Keep me signed in</span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 sm:h-13 py-3.5 px-6 rounded-xl bg-gradient-to-r from-yellow-400 via-[#facc15] to-amber-500 text-zinc-950 font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(250,204,21,0.28)] hover:shadow-[0_0_36px_rgba(250,204,21,0.45)] hover:from-yellow-300 hover:to-amber-400 active:scale-[0.99] transition-all duration-200 cursor-pointer"
                >
                  {isSubmitting ? <span>Authenticating...</span> : <span>Sign In to SNITCH</span>}
                </button>
              </div>

              <div className="pt-4 text-center">
                <p className="text-sm text-zinc-400">
                  New to SNITCH?{' '}
                  <Link
                    to="/register"
                    className="text-[#facc15] hover:text-[#eab308] font-semibold transition-colors hover:underline ml-1"
                  >
                    Create an account (Get 15% off)
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
