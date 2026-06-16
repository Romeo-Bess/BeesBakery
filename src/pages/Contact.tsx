import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, 
  Loader2, MessageCircle, Compass 
} from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export default function Contact() {
  useSEO({
    title: 'Contact Our Atelier | Cake Consultations & Studio Hours',
    description: "Get in touch with Bee's Bakery. Submit a message, chat directly via WhatsApp, check operating hours, or locate our boutique cake studio."
  });

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  
  // Submit states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Full name is required.';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Please provide a valid email.';
    if (!message.trim()) newErrors.message = 'Please write a message.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset
      setName('');
      setEmail('');
      setMessage('');
      setSubject('General Inquiry');
    }, 1500);
  };

  return (
    <div className="pt-20 min-h-screen">
      
      {/* Page Header */}
      <header className="max-w-container-max mx-auto px-4 lg:px-margin-desktop py-16 md:py-24 text-center">
        <span className="font-sans text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4 inline-block">Connect</span>
        <h1 className="font-serif text-display-lg text-on-surface mb-6">Contact Our Atelier</h1>
        <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          We would love to discuss custom details for your upcoming celebrations. Visit our studio or message us directly.
        </p>
      </header>

      {/* Main Grid: Info Cards Left, Form Right */}
      <section className="max-w-container-max mx-auto px-4 lg:px-margin-desktop pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border-l-4 border-primary pl-3 mb-8">
            <h3 className="font-serif text-xl font-bold text-on-surface">Studio Details</h3>
            <p className="font-sans text-xs text-on-surface-variant">Reach out via email, phone, or instant WhatsApp chat.</p>
          </div>

          {/* Contact Cards */}
          <div className="space-y-4">
            
            {/* Address */}
            <div className="glass-panel p-5 rounded-lg border border-outline-variant/15 flex items-start gap-4 bg-surface">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-on-surface mb-1">Our Studio Address</h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  124 Artisanal Way, Cakery District, New York, NY 10012
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="glass-panel p-5 rounded-lg border border-outline-variant/15 flex items-start gap-4 bg-surface">
              <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-on-surface mb-1">Email Communication</h4>
                <p className="font-sans text-xs text-on-surface-variant underline underline-offset-4 decoration-outline-variant">
                  hello@beesbakery.com
                </p>
              </div>
            </div>

            {/* WhatsApp & Phone */}
            <div className="glass-panel p-5 rounded-lg border border-outline-variant/15 flex items-start gap-4 bg-surface">
              <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-on-surface mb-1">Direct Calling</h4>
                <p className="font-sans text-xs text-on-surface-variant">
                  +1 (212) 555-0198
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="glass-panel p-5 rounded-lg border border-outline-variant/15 flex items-start gap-4 bg-surface">
              <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-on-surface mb-1">Atelier Hours</h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Tuesday — Saturday: 9:00 AM — 6:00 PM
                </p>
                <p className="text-[10px] text-outline mt-1 uppercase font-bold">Closed Sunday &amp; Monday</p>
              </div>
            </div>

          </div>

          {/* Instant WhatsApp Button */}
          <div className="pt-4">
            <a
              href="https://wa.me/12125550198"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-white hover:bg-[#20ba56] py-4 rounded-lg font-sans text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 shadow-md"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              Chat on WhatsApp
            </a>
            <p className="text-[9px] text-outline text-center mt-2">
              *Instant quote adjustments and design sketches support.
            </p>
          </div>

        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 md:p-10 rounded-xl border border-outline-variant/20 shadow-xl bg-surface">
            
            <div className="border-l-4 border-primary pl-3 mb-8">
              <h3 className="font-serif text-xl font-bold text-on-surface">Send a Message</h3>
              <p className="font-sans text-xs text-on-surface-variant">We typically respond to web requests within 2 hours.</p>
            </div>

            <form onSubmit={handleSubmitContact} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full bg-surface border rounded-lg px-4 py-2.5 font-sans text-xs outline-none focus:border-primary ${
                      errors.name ? 'border-red-400' : 'border-outline-variant'
                    }`}
                    placeholder="e.g. John Doe"
                  />
                  {errors.name && <p className="text-red-400 font-sans text-[10px]">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-surface border rounded-lg px-4 py-2.5 font-sans text-xs outline-none focus:border-primary ${
                      errors.email ? 'border-red-400' : 'border-outline-variant'
                    }`}
                    placeholder="address@hello.com"
                  />
                  {errors.email && <p className="text-red-400 font-sans text-[10px]">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Subject Topic</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-sans text-xs outline-none focus:border-primary"
                >
                  <option value="General Inquiry">General Atelier Inquiry</option>
                  <option value="Tasting Slots">Cake Tasting &amp; Consultation Booking</option>
                  <option value="Delivery Coordination">Delivery Setup Logistics</option>
                  <option value="Collaboration">Business Collaboration / Partnership</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Your Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full bg-surface border rounded-lg px-4 py-3 font-sans text-xs outline-none focus:border-primary h-36 ${
                    errors.message ? 'border-red-400' : 'border-outline-variant'
                  }`}
                  placeholder="Tell us about your event theme, date details, and number of guests..."
                ></textarea>
                {errors.message && <p className="text-red-400 font-sans text-[10px]">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-on-background text-background py-4 rounded font-sans text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message Request
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

            </form>

            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-green-50 text-green-800 border border-green-200 p-4 rounded-lg mt-4 flex items-start gap-2.5 text-xs font-sans"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-bold">Message Transmitted!</p>
                    <p className="text-[10px] text-green-600 mt-0.5">
                      Your note has been received by Beatrice. She will email you back shortly.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </section>

      {/* Embedded Custom Map Placeholder */}
      <section className="max-w-container-max mx-auto px-4 lg:px-margin-desktop pb-24">
        <div className="border-l-4 border-primary pl-3 mb-8">
          <h3 className="font-serif text-xl font-bold text-on-surface">Studio Location</h3>
          <p className="font-sans text-xs text-on-surface-variant">Find us in the heart of the historic Cakery District.</p>
        </div>

        {/* Styled custom vector/map placeholder */}
        <div className="w-full h-80 rounded-xl overflow-hidden relative border border-outline-variant/30 shadow-md bg-[#F5E6C8] flex items-center justify-center group">
          {/* Abstract Grid Map Background */}
          <div className="absolute inset-0 opacity-20 honeycomb-pattern"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-[#7a5900]/5 via-transparent to-[#F5E6C8]/10"></div>
          
          {/* Mock Vector Street Lines */}
          <div className="absolute top-1/4 left-0 w-full h-1 bg-[#1e1c12]/5 transform rotate-3"></div>
          <div className="absolute top-2/3 left-0 w-full h-2 bg-[#1e1c12]/5 transform -rotate-2"></div>
          <div className="absolute top-0 left-1/3 w-1.5 h-full bg-[#1e1c12]/5 transform rotate-12"></div>
          <div className="absolute top-0 left-2/3 w-1 h-full bg-[#1e1c12]/5 transform -rotate-6"></div>

          {/* Centralized Location Pin */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 relative z-10"
          >
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg border-2 border-white">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div className="glass-panel py-2 px-4 rounded border border-[#7a5900]/30 backdrop-blur-md shadow-md text-center max-w-[200px]">
              <span className="block font-sans text-[9px] font-bold text-primary uppercase tracking-widest">Bee's Bakery Studio</span>
              <span className="text-[10px] text-on-surface leading-tight mt-0.5 block">124 Artisanal Way</span>
            </div>
          </motion.div>

          {/* Hover instructions overlay */}
          <div className="absolute inset-0 bg-on-background/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
            <span className="bg-background text-on-background px-4 py-2 rounded shadow-md text-xs font-sans font-bold uppercase tracking-widest border border-outline-variant">
              Open in Google Maps
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
