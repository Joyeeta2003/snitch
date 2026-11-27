import React, { useState } from 'react';
import { Link } from 'react-router';

const PRODUCTS = [
  {
    id: 1,
    title: 'Relic Acid-Wash Heavyweight Tee',
    category: 'Oversized Tees',
    price: 1499,
    originalPrice: 2199,
    tag: 'BESTSELLER',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 2,
    title: 'Obsidian Tactical Multi-Pocket Cargo',
    category: 'Cargoes & Pants',
    price: 2499,
    originalPrice: 3499,
    tag: 'LIMITED DROP',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 3,
    title: 'Verve Textured Cuban Collar Shirt',
    category: 'Luxury Shirts',
    price: 1899,
    originalPrice: 2599,
    tag: 'TRENDING',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 4,
    title: 'Cipher Matte Carbon Puffer Jacket',
    category: 'Outerwear',
    price: 3999,
    originalPrice: 5499,
    tag: 'WINTER DROP',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 5,
    title: 'Kuro Raw Hem Knit Sweater',
    category: 'Knitwear',
    price: 2199,
    originalPrice: 2999,
    tag: 'NEW',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 6,
    title: 'Nocturne Relaxed Double Pleat Trousers',
    category: 'Tailored Bottoms',
    price: 2299,
    originalPrice: 3199,
    tag: 'EXCLUSIVE',
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=700&q=80',
  },
];

const CATEGORIES = ['All Drops', 'Oversized Tees', 'Cargoes & Pants', 'Luxury Shirts', 'Outerwear', 'Knitwear'];

const ShopHome = () => {
  const [activeCategory, setActiveCategory] = useState('All Drops');
  const [cartCount, setCartCount] = useState(2);
  const [addedItem, setAddedItem] = useState(null);

  const filteredProducts =
    activeCategory === 'All Drops'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleAddToCart = (item) => {
    setCartCount((c) => c + 1);
    setAddedItem(item.title);
    setTimeout(() => setAddedItem(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans selection:bg-[#facc15] selection:text-zinc-950 antialiased">
      {/* Top Ticker */}
      <div className="w-full bg-[#121216] border-b border-zinc-800/80 px-4 py-2 text-center text-xs tracking-wider text-zinc-400 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#facc15] animate-pulse shrink-0" />
        <span>
          SNITCH APPAREL &bull; WINTER CAPSULE DROP IS LIVE &bull; CODE <span className="text-[#facc15] font-bold">SNITCH15</span> FOR 15% OFF
        </span>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#09090b]/85 backdrop-blur-xl border-b border-zinc-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#facc15] to-[#ca8a04] flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.25)] group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 text-zinc-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tighter text-zinc-50 block leading-none">
                SNITCH<span className="text-[#facc15]">.</span>
              </span>
              <span className="text-[10px] tracking-[0.25em] text-zinc-400 uppercase font-medium">
                Clothing Platform
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <button
              onClick={() => setActiveCategory('All Drops')}
              className="hover:text-[#facc15] transition-colors cursor-pointer"
            >
              New Drops
            </button>
            <button
              onClick={() => setActiveCategory('Oversized Tees')}
              className="hover:text-[#facc15] transition-colors cursor-pointer"
            >
              Tees
            </button>
            <button
              onClick={() => setActiveCategory('Cargoes & Pants')}
              className="hover:text-[#facc15] transition-colors cursor-pointer"
            >
              Cargoes
            </button>
            <button
              onClick={() => setActiveCategory('Luxury Shirts')}
              className="hover:text-[#facc15] transition-colors cursor-pointer"
            >
              Shirts
            </button>
            <button
              onClick={() => setActiveCategory('Outerwear')}
              className="hover:text-[#facc15] transition-colors cursor-pointer"
            >
              Jackets
            </button>
            <Link
              to="/register"
              className="text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-[#facc15]/30 bg-[#facc15]/10 text-[#facc15] font-semibold hover:bg-[#facc15] hover:text-zinc-950 transition-all"
            >
              Seller Portal
            </Link>
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden sm:inline-flex text-xs font-semibold text-zinc-300 hover:text-[#facc15] transition-colors px-3 py-2"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 via-[#facc15] to-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(250,204,21,0.25)] hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all"
            >
              Join / Sign Up (15% Off)
            </Link>

            {/* Cart Icon */}
            <div className="relative p-2 text-zinc-300 hover:text-zinc-50 cursor-pointer">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#facc15] text-zinc-950 font-bold text-[10px] flex items-center justify-center">
                {cartCount}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Toast Notification */}
      {addedItem && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-[#121215] border border-[#facc15]/40 text-xs text-zinc-100 flex items-center gap-3 shadow-2xl animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#facc15]" />
          <span>Added <strong className="text-[#facc15]">{addedItem}</strong> to bag</span>
        </div>
      )}

      {/* Hero Showcase Section with Editorial Fashion Banner */}
      <section className="relative overflow-hidden border-b border-zinc-800/80 bg-gradient-to-b from-[#121216] to-[#09090b] py-16 sm:py-24">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#facc15]/10 blur-[180px] rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-[#facc15]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#facc15] animate-ping" />
                LIMITED CAPSULE 04 &bull; AUTUMN / WINTER 2026
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-50 leading-[1.1]">
                CLOTHES CRAFTED FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-[#facc15] to-amber-500">THE UNORTHODOX</span>.
              </h1>

              <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Discover relaxed fits, precision tailored cargoes, and statement heavyweight luxury streetwear. Join the platform to unlock exclusive drops and member discounts.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-400 via-[#facc15] to-amber-500 text-zinc-950 font-bold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(250,204,21,0.35)] hover:shadow-[0_0_45px_rgba(250,204,21,0.5)] transition-all flex items-center justify-center gap-2"
                >
                  <span>Sign Up &amp; Get 15% Off</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>

                <a
                  href="#clothing-collection"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-200 font-semibold text-sm hover:border-zinc-700 hover:bg-zinc-800/80 transition-colors text-center"
                >
                  Explore Drops
                </a>
              </div>

              {/* Perks Row */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-zinc-800/60 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <span className="block text-lg font-bold text-[#facc15]">450K+</span>
                  <span className="text-xs text-zinc-500">Global Members</span>
                </div>
                <div>
                  <span className="block text-lg font-bold text-[#facc15]">48h</span>
                  <span className="text-xs text-zinc-500">Early Drop Access</span>
                </div>
                <div>
                  <span className="block text-lg font-bold text-[#facc15]">Zero</span>
                  <span className="text-xs text-zinc-500">Shipping Fees Over $50</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80"
                  alt="SNITCH Featured Outfit"
                  className="w-full h-96 sm:h-[460px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs uppercase tracking-widest text-[#facc15] font-semibold">
                    LOOKBOOK 04 &bull; UNISEX CAPSULE
                  </span>
                  <h3 className="text-xl font-bold text-zinc-100">
                    Acid Wash Heavyweight Oversized Hoodie
                  </h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-bold text-[#facc15]">&#8377;2,999</span>
                    <Link
                      to="/register"
                      className="text-xs text-zinc-300 hover:text-[#facc15] underline"
                    >
                      Member early access &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section id="clothing-collection" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#facc15] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#facc15]" />
              Trending Collection
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-50 tracking-tight">
              Curated Apparel Drops
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#facc15] text-zinc-950 shadow-[0_0_15px_rgba(250,204,21,0.3)]'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-[#121215] border border-zinc-800/80 overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Image Frame */}
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-zinc-950/80 backdrop-blur-md text-[#facc15] border border-[#facc15]/30">
                  {item.tag}
                </span>

                <button
                  type="button"
                  aria-label="Wishlist"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-zinc-950/70 backdrop-blur-md text-zinc-400 hover:text-[#facc15] flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </button>
              </div>

              {/* Product Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-zinc-100 group-hover:text-[#facc15] transition-colors mt-1">
                    {item.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800/70 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-extrabold text-zinc-50">&#8377;{item.price.toLocaleString()}</span>
                    <span className="text-xs text-zinc-500 line-through">&#8377;{item.originalPrice.toLocaleString()}</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 hover:bg-[#facc15] hover:text-zinc-950 hover:border-[#facc15] transition-all cursor-pointer"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seller & Creator Invitation Banner */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="rounded-3xl bg-gradient-to-r from-zinc-900 via-[#16161b] to-zinc-900 border border-[#facc15]/30 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="pointer-events-none absolute -right-20 -bottom-20 w-80 h-80 bg-[#facc15]/10 blur-[130px] rounded-full" />
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#facc15]/15 text-[#facc15] border border-[#facc15]/30">
              SNITCH CREATOR NETWORK
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-50">
              Are you a fashion designer or apparel merchant?
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Launch your clothing collection directly on the SNITCH shopping platform. Access 450,000+ urban fashion enthusiasts, instant payouts, and seller dashboard analytics.
            </p>
            <div className="pt-2">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#facc15] text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(250,204,21,0.25)] hover:bg-[#eab308] transition-all"
              >
                <span>Register as a Seller</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#0a0a0c] border-t border-zinc-800/80 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-xs">
          <div>
            <h4 className="font-bold text-zinc-200 uppercase tracking-wider mb-3">Shop Collections</h4>
            <ul className="space-y-2 text-zinc-500">
              <li><button onClick={() => setActiveCategory('Oversized Tees')} className="hover:text-zinc-300">Heavyweight Tees</button></li>
              <li><button onClick={() => setActiveCategory('Cargoes & Pants')} className="hover:text-zinc-300">Tactical Cargoes</button></li>
              <li><button onClick={() => setActiveCategory('Luxury Shirts')} className="hover:text-zinc-300">Cuban Shirts</button></li>
              <li><button onClick={() => setActiveCategory('Outerwear')} className="hover:text-zinc-300">Winter Outerwear</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-zinc-200 uppercase tracking-wider mb-3">Customer Protocol</h4>
            <ul className="space-y-2 text-zinc-500">
              <li><a href="#orders" className="hover:text-zinc-300">Track Clothing Order</a></li>
              <li><a href="#returns" className="hover:text-zinc-300">14-Day Doorstep Returns</a></li>
              <li><a href="#sizing" className="hover:text-zinc-300">Fit &amp; Sizing Assistant</a></li>
              <li><a href="#fabric" className="hover:text-zinc-300">Authentic Fabric Standards</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-zinc-200 uppercase tracking-wider mb-3">Members &amp; Sellers</h4>
            <ul className="space-y-2 text-zinc-500">
              <li><Link to="/register" className="text-[#facc15] hover:underline font-semibold">Join SNITCH (15% Off)</Link></li>
              <li><Link to="/register" className="hover:text-zinc-300">Seller / Merchant Onboarding</Link></li>
              <li><Link to="/login" className="hover:text-zinc-300">Member Sign In</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-zinc-200 uppercase tracking-wider mb-3">Unorthodox Newsletter</h4>
            <p className="text-zinc-500 mb-3">Get VIP drop notifications 48h before public release.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full h-9 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 outline-none focus:border-[#facc15]"
              />
              <button className="px-3 h-9 rounded-lg bg-[#facc15] text-zinc-950 font-bold text-xs uppercase hover:bg-[#eab308]">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>&copy; 2026 SNITCH APPAREL &bull; Unorthodox Clothing Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-zinc-300">Privacy Policy</a>
            <a href="#terms" className="hover:text-zinc-300">Terms of Service</a>
            <a href="#security" className="hover:text-zinc-300">Security Vault</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShopHome;
