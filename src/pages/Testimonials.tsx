import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, Quote, Loader2, ThumbsUp, Sparkles } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { testimonialsData } from '../data/testimonialsData';

export default function Testimonials() {
  useSEO({
    title: 'Client Testimonials | What Our Clients Say',
    description: "Read honest reviews and testimonials from our clients. Learn why custom cake clients trust Bee's Bakery for weddings, birthdays, and celebrations."
  });

  const [reviews, setReviews] = useState(testimonialsData);
  const [name, setName] = useState('');
  const [eventType, setEventType] = useState('Wedding');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});

  const handleHelpful = (id: string) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newReview = {
        id: String(reviews.length + 1),
        name: name.trim(),
        eventType,
        rating,
        text: text.trim(),
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo8fzswCMtH9sZzAEHsBHUXlFGC41KMIkuwtIGiMW6dPJQb0wyB72jbj124MzPVOxGoZlHEkBhigSqgfYB-zDCm3yALGSqml-8gW8TNQcisjYA9TnZPaUHazYl--CwJUPx7nRXFEZlbdLptcSGsDpk17WsoaQsc1mGQg2Rvj3T9RTwP4CMhbQ-621pvb4cxZ3uFthuS13nS2sNLzQZt2JsMDrhHz5ENemBFzLpu6QNoEqxOM3tUYUzG_oiYebKvdzQP-nPT9-lmbc' // Default placeholder portrait
      };

      setReviews([newReview, ...reviews]);
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset
      setName('');
      setText('');
      setRating(5);
      setEventType('Wedding');
    }, 1500);
  };

  return (
    <div className="pt-20 min-h-screen">
      
      {/* Page Header */}
      <header className="max-w-container-max mx-auto px-4 lg:px-margin-desktop py-16 md:py-24 text-center">
        <span className="font-sans text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4 inline-block">Kind Words</span>
        <h1 className="font-serif text-display-lg text-on-surface mb-6">Client Experiences &amp; Reviews</h1>
        <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Read genuine feedback from our clients, sharing stories of custom wedding cakes, birthday cupcake sets, and corporate showstoppers.
        </p>
      </header>

      {/* Ratings Breakdown Dashboard */}
      <section className="bg-surface-container-low border-y border-outline-variant/20 py-12">
        <div className="max-w-container-max mx-auto px-4 lg:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-4 text-center md:border-r border-outline-variant/30 py-4">
            <h3 className="font-serif text-5xl font-bold text-primary">5.0</h3>
            <div className="flex justify-center text-primary mt-3 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="font-sans text-xs font-bold text-outline uppercase tracking-wider">
              Based on {reviews.length} Client Ratings
            </p>
          </div>

          <div className="md:col-span-8 space-y-3">
            <h4 className="font-sans text-[10px] font-bold text-outline uppercase tracking-widest mb-4">
              Rating Distribution
            </h4>
            
            {/* Stars break down rows */}
            {[
              { stars: 5, pct: 100, count: reviews.length },
              { stars: 4, pct: 0, count: 0 },
              { stars: 3, pct: 0, count: 0 },
              { stars: 2, pct: 0, count: 0 },
              { stars: 1, pct: 0, count: 0 }
            ].map((row) => (
              <div key={row.stars} className="flex items-center gap-4 text-xs font-sans text-on-surface-variant">
                <span className="w-12 text-right font-bold">{row.stars} Star</span>
                <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="bg-primary-container h-full rounded-full" style={{ width: `${row.pct}%` }}></div>
                </div>
                <span className="w-12 text-outline text-right">({row.count})</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Grid of Reviews and Review Submission Form */}
      <section className="max-w-container-max mx-auto px-4 lg:px-margin-desktop py-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Reviews Grid */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="font-serif text-2xl font-bold mb-6 text-on-surface">Client Reviews ({reviews.length})</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="glass-panel p-6 rounded-lg border border-outline-variant/15 flex flex-col justify-between items-start gap-4 shadow-sm bg-surface"
              >
                <div className="space-y-4 w-full">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex text-primary">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-4 h-4 text-outline-variant/50 shrink-0" />
                  </div>
                  
                  <p className="font-sans text-xs text-on-surface-variant italic leading-relaxed">
                    "{rev.text}"
                  </p>
                </div>

                <div className="flex justify-between items-center w-full pt-4 border-t border-outline-variant/10 mt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-outline-variant shrink-0">
                      <img
                        src={rev.image}
                        alt={rev.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-sans text-xs font-bold text-on-surface uppercase tracking-wider">{rev.name}</h4>
                      <p className="font-sans text-[9px] text-outline uppercase tracking-wider">{rev.eventType}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleHelpful(rev.id)}
                    className="flex items-center gap-1 text-[10px] font-sans text-outline hover:text-primary transition-colors border border-outline-variant/40 rounded px-2 py-1 bg-surface-container-low"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>Helpful ({helpfulCounts[rev.id] || 0})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Submission Form */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <div className="glass-panel p-6 md:p-8 rounded-xl border border-outline-variant/20 shadow-xl bg-surface">
            
            <div className="border-l-4 border-primary pl-3 mb-6">
              <h3 className="font-serif text-lg font-bold text-on-surface">Leave Your Feedback</h3>
              <p className="font-sans text-[10px] text-on-surface-variant">We value your thoughts and patisserie experiences.</p>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              
              <div className="space-y-2">
                <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-3.5 py-2.5 font-sans text-xs outline-none focus:border-primary"
                  placeholder="e.g. Eleanor V."
                />
              </div>

              <div className="space-y-2">
                <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Celebration Category</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-3.5 py-2.5 font-sans text-xs outline-none focus:border-primary"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Corporate">Corporate Gala</option>
                  <option value="Special Occasion">Special Occasion</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline block">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((stars) => (
                    <button
                      type="button"
                      key={stars}
                      onClick={() => setRating(stars)}
                      className="text-primary hover:scale-110 transition-transform p-0.5"
                    >
                      <Star className={`w-5 h-5 ${stars <= rating ? 'fill-current' : 'text-outline-variant'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Testimonial Review</label>
                <textarea
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Share details about the flavors, presentation, design sketches, and delivery process..."
                  className="w-full bg-surface border border-outline-variant rounded-lg px-3.5 py-3 font-sans text-xs outline-none focus:border-primary h-28"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-on-background text-background py-3 rounded font-sans text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting Review...
                  </>
                ) : (
                  <>
                    Submit Feedback
                    <Sparkles className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

            </form>

            {/* Success notification */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-green-50 text-green-700 border border-green-200 p-4 rounded-lg mt-4 flex items-start gap-2.5 text-xs font-sans"
                >
                  <CheckCircle className="w-4 h-4 shrink-0 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-bold">Feedback Received!</p>
                    <p className="text-[10px] text-green-600 mt-0.5">Thank you for sharing your experience. Your review is now listed on our site.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </section>

    </div>
  );
}
