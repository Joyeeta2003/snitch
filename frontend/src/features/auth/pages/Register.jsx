import React, { useState } from 'react';
import { useAuth } from '../hook/useAuth';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';

const CURRENT_YEAR = 2026;

const LOOKBOOK_IMAGE =
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80';

const Register = () => {
  const { handleRegister } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+91',
    contactNumber: '',
    password: '',
    isSeller: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (apiError) setApiError('');
  };

  const getPasswordStrength = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const passwordScore = getPasswordStrength(formData.password);

  const getStrengthLabel = (score) => {
    switch (score) {
      case 1:
        return { text: 'Weak', color: 'text-red-400' };
      case 2:
        return { text: 'Fair', color: 'text-amber-400' };
      case 3:
        return { text: 'Good', color: 'text-yellow-400' };
      case 4:
        return { text: 'Strong', color: 'text-[#facc15]' };
      default:
        return { text: 'Min. 8 chars', color: 'text-zinc-500' };
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^[0-9\s\-()]{7,15}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Enter a valid phone number';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setApiError('');

    try {
      const cleanPhone = formData.contactNumber.replace(/[\s\-()]/g, '');
      const fullContact = formData.countryCode ? `${formData.countryCode}${cleanPhone}` : cleanPhone;

      await handleRegister({
        fullname: formData.fullName.trim(),
        email: formData.email.trim(),
        contact: fullContact,
        password: formData.password,
        isSeller: Boolean(formData.isSeller),
      });
      setIsSuccess(true);
      setApiError('');
    } catch (err) {
      setIsSuccess(false);
      const serverMessage =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        (err.code === 'ERR_NETWORK'
          ? 'Backend server is offline or unreachable on http://localhost:3000. Please ensure the backend server is running.'
          : 'Registration failed. Please try again.');
      setApiError(serverMessage);
    } finally {
      setIsSubmitting(false);
    }

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 flex flex-col font-sans selection:bg-[#facc15] selection:text-zinc-950 antialiased overflow-x-hidden">
      {/* Top Header Banner for Clothing Platform */}
      <div className="w-full bg-[#121216] border-b border-zinc-800/80 px-4 py-2 text-center text-xs tracking-wider text-zinc-400 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#facc15] animate-pulse shrink-0" />
        <span>
          WINTER APPAREL DROP LIVE &bull; USE CODE <span className="text-[#facc15] font-bold">SNITCH15</span> FOR 15% OFF YOUR FIRST ORDER
        </span>
      </div>

      {/* Main Responsive Split Layout */}
      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 min-h-[calc(100vh-37px)]">
        {/* LEFT COLUMN: Editorial Lookbook & Brand Story (Desktop Prominent / Tablet Banner) */}
        <div className="lg:col-span-5 xl:col-span-6 relative bg-gradient-to-b from-[#0f0f13] via-[#09090b] to-[#070709] border-b lg:border-b-0 lg:border-r border-zinc-800/70 p-6 sm:p-10 lg:p-14 flex flex-col justify-between overflow-hidden">
          {/* Ambient Golden Background Glow */}
          <div
            className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-[#facc15]/10 blur-[150px] rounded-full"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-12 right-12 w-80 h-80 bg-[#facc15]/5 blur-[160px] rounded-full"
            aria-hidden="true"
          />

          {/* Top Brand Logo */}
          <div className="relative z-10 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#facc15] to-[#ca8a04] flex items-center justify-center shadow-[0_0_24px_rgba(250,204,21,0.3)] transition-transform group-hover:scale-105">
                <svg
                  className="w-5 h-5 text-zinc-950"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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
              to="/"
              className="text-xs text-zinc-400 hover:text-[#facc15] transition-colors flex items-center gap-1.5 py-1 px-3 rounded-full border border-zinc-800 bg-zinc-900/60"
            >
              <span>Explore Shop</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Center: High-Fashion Lookbook Visual & Headline */}
          <div className="relative z-10 my-8 sm:my-12">
            {/* Visual Lookbook Image Frame */}
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group max-w-lg mx-auto lg:mx-0">
              <img
                src={LOOKBOOK_IMAGE}
                alt="SNITCH High-Fashion Apparel Lookbook"
                className="w-full h-64 sm:h-72 lg:h-80 object-cover object-top filter brightness-90 contrast-105 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-90" />
              
              {/* Image Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-zinc-950/80 backdrop-blur-md text-[#facc15] border border-[#facc15]/30">
                  Capsule 04
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-zinc-950/80 backdrop-blur-md text-zinc-300 border border-zinc-800">
                  Streetwear &bull; Luxe
                </span>
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs uppercase tracking-widest text-[#facc15] font-semibold">
                  New Season Architecture
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-50 leading-tight">
                  Designed for the bold. Crafted for effortless presence.
                </h3>
              </div>
            </div>

            {/* Platform Member Perks Cluster */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0">
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#facc15]/10 text-[#facc15] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-200">15% Welcome Credit</h4>
                    <p className="text-[11px] text-zinc-400">Instant code on signup</p>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#facc15]/10 text-[#facc15] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-200">48h Early Capsule Access</h4>
                    <p className="text-[11px] text-zinc-400">Pre-order limited drops</p>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#facc15]/10 text-[#facc15] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-200">Seller & Designer Hub</h4>
                    <p className="text-[11px] text-zinc-400">Sell custom clothing drops</p>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#facc15]/10 text-[#facc15] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-200">Express Delivery & Returns</h4>
                    <p className="text-[11px] text-zinc-400">Doorstep trial & swap</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Social Proof */}
          <div className="relative z-10 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <img className="w-7 h-7 rounded-full border-2 border-zinc-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                <img className="w-7 h-7 rounded-full border-2 border-zinc-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                <img className="w-7 h-7 rounded-full border-2 border-zinc-900 object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="Customer" />
              </div>
              <span className="text-zinc-300 font-medium">Joined by 450,000+ fashion insiders</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[#facc15]">
              <span>★ 4.9/5</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Minimalist Seamless Registration Form with Ample Breathing Space */}
        <div className="lg:col-span-7 xl:col-span-6 bg-[#0a0a0c] p-6 sm:p-10 lg:p-14 xl:p-18 flex flex-col justify-center relative">
          {/* Subtle Ambient Golden Accent Glow */}
          <div
            className="pointer-events-none absolute top-1/4 right-0 w-80 h-80 bg-[#facc15]/5 blur-[140px] rounded-full"
            aria-hidden="true"
          />

          <div className="w-full max-w-lg mx-auto relative z-10">
            {/* Header Titles */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-[#facc15] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#facc15]" />
                Join the SNITCH Collective
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-50">
                Create your account
              </h1>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                Unlock exclusive clothing drops, personalized sizing, fast checkout, and merchant privileges.
              </p>
            </div>

            {/* Success Alert */}
            {isSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-[#facc15]/10 border border-[#facc15]/30 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#facc15] text-zinc-950 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#facc15]">Welcome to SNITCH!</h4>
                  <p className="text-xs text-zinc-300 mt-0.5">
                    Account created successfully{formData.isSeller ? ' as a Seller/Merchant partner' : ''}. Use coupon code <span className="text-[#facc15] font-bold">SNITCH15</span> for 15% off your first clothing haul!
                  </p>
                  <Link
                    to="/"
                    className="inline-block mt-3 px-4 py-1.5 rounded-lg bg-[#facc15] text-zinc-950 text-xs font-semibold hover:bg-[#eab308] transition-colors"
                  >
                    Start Shopping Now &rarr;
                  </Link>
                </div>
              </div>
            )}

            {/* API Error Alert */}
            {apiError && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-xs">
                <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{apiError}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* 1. Full Name */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="fullName" className="text-xs font-medium uppercase tracking-wider text-zinc-300">
                    Full Name <span className="text-[#facc15]">*</span>
                  </label>
                  {errors.fullName && <span className="text-xs text-red-400">{errors.fullName}</span>}
                </div>
                <div className="relative flex items-center group">
                  <div className="absolute left-3.5 text-zinc-500 group-focus-within:text-[#facc15] transition-colors pointer-events-none">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Joyeeta Roy"
                    className={`w-full h-12 pl-11 pr-4 rounded-xl bg-zinc-900/90 text-zinc-100 placeholder:text-zinc-600 text-sm border transition-all duration-200 outline-none ${
                      errors.fullName
                        ? 'border-red-500/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-zinc-800 hover:border-zinc-700 focus:border-[#facc15] focus:ring-2 focus:ring-[#facc15]/20 focus:bg-zinc-900'
                    }`}
                  />
                </div>
              </div>

              {/* 2. Contact Number */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="contactNumber" className="text-xs font-medium uppercase tracking-wider text-zinc-300">
                    Contact Number <span className="text-[#facc15]">*</span>
                  </label>
                  {errors.contactNumber && <span className="text-xs text-red-400">{errors.contactNumber}</span>}
                </div>
                <div className="flex gap-2">
                  {/* Dial Code Selector */}
                  <div className="relative shrink-0">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      aria-label="Country dial code"
                      className="h-12 pl-3 pr-8 rounded-xl bg-zinc-900/90 text-zinc-200 text-sm border border-zinc-800 hover:border-zinc-700 focus:border-[#facc15] focus:ring-2 focus:ring-[#facc15]/20 outline-none cursor-pointer appearance-none transition-all duration-200"
                    >
                      <option value="+91" className="bg-zinc-900 text-zinc-100">🇮🇳 +91</option>
                      <option value="+1" className="bg-zinc-900 text-zinc-100">🇺🇸 +1</option>
                      <option value="+44" className="bg-zinc-900 text-zinc-100">🇬🇧 +44</option>
                      <option value="+61" className="bg-zinc-900 text-zinc-100">🇦🇺 +61</option>
                      <option value="+971" className="bg-zinc-900 text-zinc-100">🇦🇪 +971</option>
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div className="relative flex-1 flex items-center group">
                    <div className="absolute left-3.5 text-zinc-500 group-focus-within:text-[#facc15] transition-colors pointer-events-none">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <input
                      id="contactNumber"
                      name="contactNumber"
                      type="tel"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="98765 43210"
                      className={`w-full h-12 pl-11 pr-4 rounded-xl bg-zinc-900/90 text-zinc-100 placeholder:text-zinc-600 text-sm border transition-all duration-200 outline-none ${
                        errors.contactNumber
                          ? 'border-red-500/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                          : 'border-zinc-800 hover:border-zinc-700 focus:border-[#facc15] focus:ring-2 focus:ring-[#facc15]/20 focus:bg-zinc-900'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* 3. Email Address */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-zinc-300">
                    Email Address <span className="text-[#facc15]">*</span>
                  </label>
                  {errors.email && <span className="text-xs text-red-400">{errors.email}</span>}
                </div>
                <div className="relative flex items-center group">
                  <div className="absolute left-3.5 text-zinc-500 group-focus-within:text-[#facc15] transition-colors pointer-events-none">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="joyeeta@snitch.co.in"
                    className={`w-full h-12 pl-11 pr-4 rounded-xl bg-zinc-900/90 text-zinc-100 placeholder:text-zinc-600 text-sm border transition-all duration-200 outline-none ${
                      errors.email
                        ? 'border-red-500/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-zinc-800 hover:border-zinc-700 focus:border-[#facc15] focus:ring-2 focus:ring-[#facc15]/20 focus:bg-zinc-900'
                    }`}
                  />
                </div>
              </div>

              {/* 4. Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-zinc-300">
                    Password <span className="text-[#facc15]">*</span>
                  </label>
                  <span className={`text-xs font-medium ${getStrengthLabel(passwordScore).color}`}>
                    {getStrengthLabel(passwordScore).text}
                  </span>
                </div>
                <div className="relative flex items-center group">
                  <div className="absolute left-3.5 text-zinc-500 group-focus-within:text-[#facc15] transition-colors pointer-events-none">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    className={`w-full h-12 pl-11 pr-11 rounded-xl bg-zinc-900/90 text-zinc-100 placeholder:text-zinc-600 text-sm tracking-wider border transition-all duration-200 outline-none ${
                      errors.password
                        ? 'border-red-500/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-zinc-800 hover:border-zinc-700 focus:border-[#facc15] focus:ring-2 focus:ring-[#facc15]/20 focus:bg-zinc-900'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3.5 text-zinc-500 hover:text-zinc-200 focus:outline-none transition-colors p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
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

                {/* Password Strength Meter Bars */}
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      passwordScore >= 1 ? (passwordScore === 1 ? 'bg-red-500' : 'bg-[#facc15]') : 'bg-zinc-800'
                    }`}
                  />
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      passwordScore >= 2 ? 'bg-[#facc15]' : 'bg-zinc-800'
                    }`}
                  />
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      passwordScore >= 3 ? 'bg-[#facc15]' : 'bg-zinc-800'
                    }`}
                  />
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      passwordScore >= 4 ? 'bg-[#facc15]' : 'bg-zinc-800'
                    }`}
                  />
                </div>
              </div>

              {/* 5. 'isSeller' Checkbox Card for Clothing Marketplace */}
              <div className="pt-1">
                <label
                  htmlFor="isSeller"
                  className={`relative flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer select-none transition-all duration-200 group ${
                    formData.isSeller
                      ? 'bg-zinc-900/90 border-[#facc15]/60 shadow-[0_0_20px_rgba(250,204,21,0.12)]'
                      : 'bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-900/80 hover:border-zinc-700'
                  }`}
                >
                  <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                    <input
                      id="isSeller"
                      name="isSeller"
                      type="checkbox"
                      checked={formData.isSeller}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200 border ${
                        formData.isSeller
                          ? 'bg-[#facc15] border-[#facc15] shadow-[0_0_10px_rgba(250,204,21,0.4)]'
                          : 'bg-zinc-800/90 border-zinc-700 group-hover:border-zinc-500'
                      }`}
                    >
                      {formData.isSeller && (
                        <svg
                          className="w-3.5 h-3.5 text-zinc-950"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-zinc-100 group-hover:text-zinc-50">
                        Sell on SNITCH // Designer Partner
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-[#facc15]/15 text-[#facc15] border border-[#facc15]/20">
                        Merchant
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      Launch your apparel brand on SNITCH. Access creator showroom tools, catalog drops, and merchant payouts.
                    </p>
                  </div>
                </label>
              </div>

              {/* 6. High-Contrast Golden Yellow CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 sm:h-13 py-3.5 px-6 rounded-xl bg-gradient-to-r from-yellow-400 via-[#facc15] to-amber-500 text-zinc-950 font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(250,204,21,0.28)] hover:shadow-[0_0_36px_rgba(250,204,21,0.45)] hover:from-yellow-300 hover:to-amber-400 active:scale-[0.99] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5 text-zinc-950" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Creating Profile...</span>
                    </>
                  ) : (
                    <>
                      <span>Join SNITCH Collective</span>
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Quick Social Onboarding */}
              <div className="pt-2">
                <div className="relative flex items-center justify-center mb-4">
                  <div className="w-full border-t border-zinc-800" />
                  <span className="bg-[#0a0a0c] px-3 text-[11px] text-zinc-500 uppercase tracking-widest relative z-10">
                    or register with
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="h-11 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 font-medium flex items-center justify-center gap-2 hover:bg-zinc-800/80 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    <span>Apple ID</span>
                  </button>

                  <button
                    type="button"
                    className="h-11 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 font-medium flex items-center justify-center gap-2 hover:bg-zinc-800/80 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12 5c1.54 0 2.94.55 4.04 1.46l3.03-3.03C17.24 1.7 14.77 1 12 1 7.42 1 3.52 3.58 1.63 7.37l3.71 2.88C6.22 7.44 8.87 5 12 5z" />
                      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.71 2.88c2.16-1.99 3.42-4.93 3.42-8.7z" />
                      <path fill="#FBBC05" d="M5.34 14.75c-.23-.68-.36-1.41-.36-2.16s.13-1.48.36-2.16L1.63 7.37C.6 9.42 0 11.64 0 12c0 2.36.6 4.58 1.63 6.63l3.71-2.88z" />
                      <path fill="#34A853" d="M12 23c3.24 0 5.95-1.08 7.93-2.91l-3.71-2.88c-1.08.72-2.45 1.16-4.22 1.16-3.13 0-5.78-2.44-6.66-5.25L1.63 18.63C3.52 22.42 7.42 25 12 25z" />
                    </svg>
                    <span>Google</span>
                  </button>
                </div>
              </div>

              {/* Legal & Sign In Link */}
              <div className="pt-2 text-center space-y-3">
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  By joining, you agree to SNITCH&apos;s{' '}
                  <a href="#terms" className="text-zinc-400 hover:text-zinc-200 underline">Terms of Service</a> and{' '}
                  <a href="#privacy" className="text-zinc-400 hover:text-zinc-200 underline">Privacy Policy</a>.
                </p>

                <div className="w-full h-[1px] bg-zinc-800/80 my-2" />

                <p className="text-sm text-zinc-400">
                  Already have a SNITCH account?{' '}
                  <Link
                    to="/login"
                    className="text-[#facc15] hover:text-[#eab308] font-semibold transition-colors hover:underline ml-1"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Responsive Micro-Footer */}
      <footer className="w-full bg-[#0a0a0c] border-t border-zinc-800/60 py-4 px-6 text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>&copy; {CURRENT_YEAR} SNITCH APPAREL &bull; Unorthodox Fashion Platform.</p>
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-zinc-300 transition-colors">Storefront</Link>
          <a href="#lookbook" className="hover:text-zinc-300 transition-colors">Lookbook</a>
          <a href="#privacy" className="hover:text-zinc-300 transition-colors">Privacy</a>
          <a href="#support" className="hover:text-zinc-300 transition-colors">Help &amp; Orders</a>
        </div>
      </footer>
    </div>
  );
};

export default Register;
