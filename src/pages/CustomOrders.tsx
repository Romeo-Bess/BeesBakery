import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Trash2, Check, Loader2, Sparkles } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const PRICING_TIERS = [
  {
    title: 'Minimalist Chic',
    price: 'From R150',
    desc: 'Sophisticated elegance featuring single-tone frosting, sharp edges, and delicate organic textures.',
    details: [
      'Single tier serving 10-20 guests',
      'Textured Swiss meringue finishes',
      'Edible gold or silver leaf accents',
      'Fresh flower sprig toppings'
    ],
    idealFor: 'Intimate Birthdays, Anniversaries'
  },
  {
    title: 'Avant-Garde',
    price: 'From R350',
    desc: 'Bespoke sculptural shapes, custom marbling, structural curves, and hand-molded chocolate sails.',
    details: [
      'Double-tier setup serving 25-40 guests',
      'Marbled buttercream or custom velvet glazes',
      'Tempered chocolate architectural waves',
      'Sugar-dusted fruits and floral garnishes'
    ],
    idealFor: 'Milestone Celebrations, Gallery Galas'
  },
  {
    title: 'Couture Masterpiece',
    price: 'From R700',
    desc: 'Grand multi-tiered showstoppers displaying cascading sugar floristry and custom edible sculpture work.',
    details: [
      '3+ custom tiers serving 50-100+ guests',
      'Handcrafted sugar roses and peonies',
      'Custom cake sketch blueprint drafts',
      'White-glove courier delivery & setup'
    ],
    idealFor: 'Luxury Weddings, Grand Corporate Galas'
  }
];

export default function CustomOrders() {
  useSEO({
    title: 'Bespoke Consultations | Advanced Custom Cake Design',
    description: "Submit your cake inspiration and design criteria. View our custom design pricing tiers, select event parameters, budget levels, and start your consultation."
  });

  // Form states
  const [eventType, setEventType] = useState('Wedding');
  const [servings, setServings] = useState(30);
  const [budget, setBudget] = useState('R300 - R500');
  const [ideaText, setIdeaText] = useState('');
  const [inspirationImage, setInspirationImage] = useState<File | null>(null);
  const [inspirationPreview, setInspirationPreview] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  
  // Submit states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setErrors({ ...errors, image: 'File size must be under 8MB.' });
        return;
      }
      setInspirationImage(file);
      setInspirationPreview(URL.createObjectURL(file));
      setErrors({ ...errors, image: '' });
    }
  };

  const handleRemoveImage = () => {
    if (inspirationPreview) URL.revokeObjectURL(inspirationPreview);
    setInspirationImage(null);
    setInspirationPreview('');
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Full name is required.';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Please provide a valid email.';
    if (!phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!eventDate) newErrors.eventDate = 'Event date is required.';
    if (!ideaText.trim()) newErrors.ideaText = 'Please describe your design ideas.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="pt-20 min-h-screen">
      
      {/* Page Header */}
      <header className="max-w-container-max mx-auto px-4 lg:px-margin-desktop py-16 md:py-24 text-center">
        <span className="font-sans text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4 inline-block">Bespoke Designing</span>
        <h1 className="font-serif text-display-lg text-on-surface mb-6">Custom Confection Consultations</h1>
        <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Collaborate with Bianca to translate your design language into an edible sculpture. Submit your parameters below to start the sketch phase.
        </p>
      </header>

      {/* Pricing Tiers Section */}
      <section className="bg-surface-container-low py-16 border-y border-outline-variant/20">
        <div className="max-w-container-max mx-auto px-4 lg:px-margin-desktop">
          
          <div className="flex flex-col items-center mb-12 text-center">
            <span className="font-sans text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Reference Guidelines</span>
            <h2 className="font-serif text-2xl md:text-3xl text-on-background font-semibold">Estimated Pricing Tiers</h2>
            <div className="w-12 h-0.5 bg-primary-container mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_TIERS.map((tier, i) => (
              <div 
                key={tier.title}
                className="glass-panel p-8 rounded-xl flex flex-col justify-between items-start border border-outline-variant/15 shadow-sm hover:shadow-md transition-all bg-surface"
              >
                <div className="space-y-6 w-full">
                  <div>
                    <span className="text-[10px] font-sans font-bold text-primary uppercase tracking-widest block mb-1">
                      Tier {i + 1}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-on-surface">{tier.title}</h3>
                    <p className="font-serif text-2xl text-primary font-bold mt-2">{tier.price}</p>
                  </div>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                    {tier.desc}
                  </p>
                  <ul className="space-y-2 text-xs font-sans text-on-surface-variant pt-2 border-t border-outline-variant/10">
                    {tier.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 w-full text-[10px] font-sans font-bold text-outline uppercase tracking-wide border-t border-outline-variant/10 mt-6">
                  Ideal for: {tier.idealFor}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Advanced Custom Form */}
      <section className="max-w-container-max mx-auto px-4 lg:px-margin-desktop py-20">
        <div className="max-w-3xl mx-auto">
          
          <div className="border-l-4 border-primary pl-4 mb-10">
            <h3 className="font-serif text-2xl text-on-surface font-semibold">Advanced Custom Inquiry</h3>
            <p className="font-sans text-xs text-on-surface-variant">Provide specifications, inspiration photos, and timeline metrics below.</p>
          </div>

          <form onSubmit={handleSubmitInquiry} className="space-y-8">
            
            {/* Event parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Event Type */}
              <div className="space-y-2.5">
                <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Event Category</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm outline-none focus:border-primary"
                >
                  <option value="Wedding">Wedding Celebration</option>
                  <option value="Birthday">Milestone Birthday</option>
                  <option value="Anniversary">Anniversary Event</option>
                  <option value="Corporate">Corporate Gala</option>
                  <option value="Other">Other Bespoke Ceremony</option>
                </select>
              </div>

              {/* Event Date */}
              <div className="space-y-2.5">
                <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Event Date</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className={`w-full bg-surface border rounded-lg px-4 py-2.5 font-sans text-sm outline-none focus:border-primary ${
                    errors.eventDate ? 'border-red-400' : 'border-outline-variant'
                  }`}
                />
                {errors.eventDate && <p className="text-red-400 font-sans text-xs mt-1">{errors.eventDate}</p>}
              </div>

            </div>

            {/* Serving Size and Budget Slider */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Serving size number */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Serving Size Count</label>
                  <span className="text-xs font-sans font-bold text-primary">{servings} Guests</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={servings}
                  onChange={(e) => setServings(Number(e.target.value))}
                  className="w-full h-1.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[9px] text-outline font-sans">
                  <span>10 guests (Petite)</span>
                  <span>200 guests (Grand Banquet)</span>
                </div>
              </div>

              {/* Budget Range selection */}
              <div className="space-y-2.5">
                <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Budget Allocation Scale</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm outline-none focus:border-primary"
                >
                  <option value="R150 - R300">R150 — R300 (Minimalist Tiers)</option>
                  <option value="R300 - R500">R300 — R500 (Avant-Garde Designs)</option>
                  <option value="R500 - R800">R500 — R800 (Artisan Sculptures)</option>
                  <option value="R800+">R800+ (Grand Couture Showstoppers)</option>
                </select>
              </div>

            </div>

            {/* Inspiration Image Upload */}
            <div className="space-y-3">
              <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Inspiration Moodboard Image</label>
              
              {!inspirationPreview ? (
                <div className="border-2 border-dashed border-outline-variant/60 rounded-xl p-10 text-center bg-surface hover:border-primary transition-all relative flex flex-col items-center justify-center cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload className="w-8 h-8 text-outline group-hover:text-primary transition-colors mb-3" />
                  <p className="font-sans text-sm font-bold text-on-surface">Upload Design Reference / Sketch</p>
                  <p className="text-xs text-on-surface-variant mt-1">Accepts PNG, JPG. Max 8MB files.</p>
                </div>
              ) : (
                <div className="flex items-center gap-4 p-4 border border-outline-variant rounded-xl bg-surface-container-low">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-outline-variant shrink-0">
                    <img
                      src={inspirationPreview}
                      alt="Reference upload"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-xs font-bold truncate text-on-surface">
                      {inspirationImage?.name}
                    </p>
                    <p className="text-[10px] text-outline mt-0.5">
                      {inspirationImage && (inspirationImage.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors shrink-0"
                    aria-label="Remove image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
              {errors.image && <p className="text-red-400 font-sans text-xs mt-1">{errors.image}</p>}
            </div>

            {/* Design description */}
            <div className="space-y-3">
              <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Describe Your Design Ideas</label>
              <textarea
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
                className={`w-full bg-surface border rounded-lg px-4 py-4 font-sans text-sm outline-none focus:border-primary h-32 ${
                  errors.ideaText ? 'border-red-400' : 'border-outline-variant'
                }`}
                placeholder="Include details about color swatches, event themes, floral elements, flavor combination wishes, or custom toppers..."
              ></textarea>
              {errors.ideaText && <p className="text-red-400 font-sans text-xs">{errors.ideaText}</p>}
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-outline-variant/20">
              
              <div className="space-y-2.5">
                <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full bg-surface border rounded-lg px-4 py-3 font-sans text-sm outline-none focus:border-primary ${
                    errors.name ? 'border-red-400' : 'border-outline-variant'
                  }`}
                  placeholder="e.g. John Doe"
                />
                {errors.name && <p className="text-red-400 font-sans text-xs mt-1">{errors.name}</p>}
              </div>

              <div className="space-y-2.5">
                <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-surface border rounded-lg px-4 py-3 font-sans text-sm outline-none focus:border-primary ${
                    errors.email ? 'border-red-400' : 'border-outline-variant'
                  }`}
                  placeholder="address@hello.com"
                />
                {errors.email && <p className="text-red-400 font-sans text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-2.5">
                <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full bg-surface border rounded-lg px-4 py-3 font-sans text-sm outline-none focus:border-primary ${
                    errors.phone ? 'border-red-400' : 'border-outline-variant'
                  }`}
                  placeholder="+1 (212) 555-0198"
                />
                {errors.phone && <p className="text-red-400 font-sans text-xs mt-1">{errors.phone}</p>}
              </div>

            </div>

            {/* Submission button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white hover:bg-on-background py-4.5 rounded font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting Custom Inquiry...
                  </>
                ) : (
                  <>
                    Request Custom Consultation sketch
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>

        </div>
      </section>

      {/* Success Notification Dialog Overlay */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1E1E1E]/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-background text-on-background max-w-md w-full p-8 rounded-xl text-center space-y-6 border border-outline-variant/30 shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-primary-container/20 text-primary flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-on-surface">Consultation Requested!</h3>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Thank you, <span className="font-bold text-on-surface">{name}</span>. Bianca has received your {eventType} cake concept brief. She will sketch out two blueprint suggestions based on your {servings}-serving target and follow up at <span className="font-bold">{email}</span> within 24 hours.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setName('');
                  setEmail('');
                  setPhone('');
                  setEventDate('');
                  setIdeaText('');
                  handleRemoveImage();
                }}
                className="w-full bg-on-background text-background py-3.5 rounded font-sans text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors"
              >
                Close &amp; Return
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
