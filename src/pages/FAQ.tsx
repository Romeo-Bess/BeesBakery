import { useState, useMemo } from 'react';
import { Search, ChevronDown, HelpCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';
import { faqData } from '../data/faqData';

const FAQ_CATEGORIES = ['All', 'Ordering', 'Dietary', 'Consultations', 'Delivery', 'Care'];

export default function FAQ() {
  useSEO({
    title: 'Frequently Asked Questions | Bakery Policies & Guides',
    description: "Find answers to questions about custom cake orders, allergen information, delivery options, and storage instructions."
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ '1': true }); // First FAQ open by default

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filtered FAQs
  const filteredFAQs = useMemo(() => {
    return faqData.filter((faq) => {
      const matchesCategory =
        activeCategory === 'All' || faq.category.toLowerCase() === activeCategory.toLowerCase();

      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="pt-20 min-h-screen">
      
      {/* Page Header */}
      <header className="max-w-container-max mx-auto px-4 lg:px-margin-desktop text-center py-16 md:py-24">
        <span className="font-sans text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4 inline-block">Boutique Support</span>
        <h1 className="font-serif text-display-lg text-on-surface mb-6">Frequently Asked Questions</h1>
        <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Find answers regarding custom designing, dietary logistics, cake care, and order cancellation options.
        </p>

        {/* Search Input */}
        <div className="max-w-2xl mx-auto mt-10 flex flex-col gap-6">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs (e.g. Allergy, Delivery, Lead Time)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/60 focus:border-primary rounded-lg pl-12 pr-4 py-3.5 font-sans text-sm outline-none transition-colors shadow-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  // Reset open states when changing categories
                  setOpenIds({ '1': true });
                }}
                className={`px-4.5 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all border ${
                  activeCategory === cat
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant border-outline-variant hover:border-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Accordions List Section */}
      <section className="max-w-3xl mx-auto px-4 pb-24">
        {filteredFAQs.length > 0 ? (
          <div className="space-y-4">
            {filteredFAQs.map((faq) => {
              const isOpen = !!openIds[faq.id];
              return (
                <div
                  key={faq.id}
                  className="glass-panel rounded-lg border border-outline-variant/15 overflow-hidden bg-surface transition-all duration-300"
                >
                  {/* Trigger Header */}
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-surface-container-low transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                      <span className="font-serif text-base font-semibold text-on-surface">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-outline shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-primary' : ''
                      }`}
                    />
                  </button>

                  {/* Expanded Content Panel */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 pl-14 font-sans text-xs text-on-surface-variant leading-relaxed border-t border-outline-variant/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-surface-container rounded-xl">
            <AlertCircle className="w-10 h-10 text-outline mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold">No Answers Found</h3>
            <p className="font-sans text-xs text-on-surface-variant mt-1 max-w-xs mx-auto">
              We couldn't find matching FAQs. Try searching for other keywords or select different category tabs.
            </p>
          </div>
        )}
      </section>

    </div>
  );
}
