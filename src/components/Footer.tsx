import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1200);
  };

  return (
    <footer className="bg-[#1E1E1E] text-[#FFF8E7] w-full pt-20 pb-10 relative overflow-hidden">
      {/* Decorative Top Accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary-container to-primary"></div>
      
      {/* Honeycomb Pattern Overlay */}
      <div className="absolute inset-0 honeycomb-pattern opacity-[0.05] pointer-events-none"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter px-4 lg:px-margin-desktop max-w-container-max mx-auto relative z-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-4 space-y-6">
          <Link to="/" className="flex items-center gap-3 text-primary-container hover:opacity-90 transition-opacity">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 48 48">
              <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" />
            </svg>
            <h2 className="font-serif text-2xl font-bold uppercase tracking-widest text-[#FFF8E7]">
              Bee's Bakery
            </h2>
          </Link>
          <p className="font-sans text-sm text-[#eee8d7] leading-relaxed max-w-sm">
            Crafting centerpiece memories through the art of fine custom patisserie. Blending classical Tuscan techniques with contemporary digital designs.
          </p>
          <div className="flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-outline/30 rounded-full hover:border-primary-container hover:text-primary-container transition-all flex items-center justify-center" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-outline/30 rounded-full hover:border-primary-container hover:text-primary-container transition-all flex items-center justify-center" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="mailto:hello@beesbakery.com" className="p-2 border border-outline/30 rounded-full hover:border-primary-container hover:text-primary-container transition-all" aria-label="Email">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2 space-y-5">
          <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-primary-container">
            Explore
          </h4>
          <ul className="space-y-3 font-sans text-sm text-[#eee8d7]">
            <li><Link to="/" className="hover:text-primary-container transition-colors">Home</Link></li>
            <li><Link to="/gallery" className="hover:text-primary-container transition-colors">Gallery Portfolio</Link></li>
            <li><Link to="/about" className="hover:text-primary-container transition-colors">About Bianca</Link></li>
            <li><Link to="/testimonials" className="hover:text-primary-container transition-colors">Testimonials</Link></li>
            <li><Link to="/faq" className="hover:text-primary-container transition-colors">FAQs</Link></li>
          </ul>
        </div>

        {/* Order Links */}
        <div className="lg:col-span-2 space-y-5">
          <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-primary-container">
            Orders
          </h4>
          <ul className="space-y-3 font-sans text-sm text-[#eee8d7]">
            <li><Link to="/custom" className="hover:text-primary-container transition-colors">Custom Designs</Link></li>
            <li><Link to="/contact" className="hover:text-primary-container transition-colors">Consultations</Link></li>
            <li><Link to="/contact" className="hover:text-primary-container transition-colors">Location & Hours</Link></li>
          </ul>
        </div>

        {/* Contact info / Hours */}
        <div className="lg:col-span-4 space-y-5">
          <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-primary-container">
            Studio Confectionery
          </h4>
          <ul className="space-y-3 font-sans text-sm text-[#eee8d7]">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary-container shrink-0 mt-0.5" />
              <span>124 Artisanal Way, Cakery District, New York, NY 10012</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-primary-container shrink-0" />
              <span>+1 (212) 555-0198</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-primary-container shrink-0 mt-0.5" />
              <span className="underline decoration-[#827560] underline-offset-4">hello@beesbakery.com</span>
            </li>
          </ul>
          
          <div className="pt-2">
            <h5 className="font-sans text-xs font-bold uppercase tracking-wider text-[#d4c4ac] mb-2">Hours</h5>
            <p className="font-sans text-xs text-[#eee8d7]">Tuesday — Saturday: 9:00 AM — 6:00 PM</p>
            <p className="font-sans text-xs text-[#d4c4ac] mt-1">Closed Sunday & Monday</p>
          </div>
        </div>

      </div>

      {/* Newsletter Signup Banner */}
      <div className="max-w-container-max mx-auto px-4 lg:px-margin-desktop mt-16 pt-8 border-t border-outline/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <h4 className="font-serif text-xl font-bold">Join the Atelier Mailing List</h4>
            <p className="font-sans text-sm text-[#eee8d7]">
              Subscribe to receive exclusive previews of seasonal cake collections, recipes, and event slots.
            </p>
          </div>
          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                disabled={status === 'success'}
                placeholder="Enter your email address"
                className="w-full bg-[#333025]/50 border border-outline/30 rounded px-4 py-3 font-sans text-sm text-[#FFF8E7] placeholder-[#827560] focus:outline-none focus:border-primary-container transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="bg-primary-container text-on-primary-container hover:bg-primary-container/90 px-6 py-3 rounded font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 shrink-0 flex items-center justify-center gap-2 hover:translate-x-1"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Validation messages */}
            {status === 'error' && (
              <p className="text-red-400 font-sans text-xs mt-2">Please enter a valid email address.</p>
            )}
            {status === 'success' && (
              <div className="flex items-center gap-2 text-green-400 font-sans text-xs mt-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscription successful! Welcome to the Bee's Bakery circle.</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Sub-Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-[#d4c4ac] uppercase tracking-widest mt-16 pt-8 border-t border-outline/10">
          <p>© 2026 Bee's Bakery. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/faq" className="hover:text-primary-container transition-colors">Privacy Policy</Link>
            <Link to="/faq" className="hover:text-primary-container transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
