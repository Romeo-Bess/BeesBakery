import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, DollarSign, Users, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { cakesData } from '../data/cakesData';
import type { CakeItem } from '../types';

const CATEGORIES = ['All', 'Cakes', 'Cupcakes', 'Floral', 'Wedding', 'Birthday'];

export default function Gallery() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeParamId = searchParams.get('id');

  useSEO({
    title: 'Creations Gallery | Custom Confectionery Masterpieces',
    description: "Explore our collection of custom wedding cakes, birthday cupcakes, and wildflower confections. Search and filter by occasion to find your perfect design."
  });

  // State Management
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCake, setSelectedCake] = useState<CakeItem | null>(
    activeParamId ? cakesData.find(c => c.id === activeParamId) || null : null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtered and Searched Cakes
  const filteredCakes = useMemo(() => {
    return cakesData.filter((cake) => {
      // Category filter logic
      const categoryLower = selectedCategory.toLowerCase();
      let matchesCategory = true;
      if (selectedCategory !== 'All') {
        if (categoryLower === 'cakes') {
          // matches any cake categories except cupcakes
          matchesCategory = cake.category !== 'Cupcakes';
        } else {
          matchesCategory = cake.category.toLowerCase() === categoryLower;
        }
      }

      // Search query filter logic
      const matchesSearch =
        cake.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cake.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cake.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredCakes.length / itemsPerPage);
  const paginatedCakes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCakes.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCakes, currentPage]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleInquire = (cake: CakeItem) => {
    setSelectedCake(null);
    navigate(`/order?cakeId=${cake.id}&cakeType=${cake.category}&flavor=${
      cake.title.includes('Chocolate') || cake.title.includes('Fig') ? 'Dark Cacao & Sea Salt' : 'Madagascar Vanilla'
    }`);
  };

  return (
    <div className="pt-20 min-h-screen">
      
      {/* Gallery Header */}
      <header className="max-w-container-max mx-auto px-4 lg:px-margin-desktop text-center py-16 md:py-24">
        <h1 className="font-serif text-display-lg text-primary mb-6">Our Creations Portfolio</h1>
        <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
          Explore a curated selection of our finest custom masterpieces. Each creation is meticulously crafted, blending high-fashion elegance with unparalleled flavor profiles for your milestones.
        </p>

        {/* Search & Filter Controls */}
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {/* Search Input */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
            <input
              type="text"
              placeholder="Search creations (e.g. Vanilla, Floral, Gold)..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-surface-container-low border border-outline-variant/60 focus:border-primary rounded-lg pl-12 pr-4 py-3.5 font-sans text-sm outline-none transition-colors shadow-sm"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-all border ${
                  selectedCategory === cat
                    ? 'bg-on-background text-background border-on-background shadow-md'
                    : 'bg-surface-container-low text-on-surface-variant border-outline-variant hover:border-primary'
                }`}
              >
                {cat === 'All' ? 'All Creations' : `${cat} Collection`}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Masonry Image Portfolio */}
      <section className="max-w-container-max mx-auto px-4 lg:px-margin-desktop pb-16">
        {filteredCakes.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {paginatedCakes.map((cake) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                key={cake.id}
                onClick={() => setSelectedCake(cake)}
                className="relative group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-surface-container-highest cursor-pointer break-inside-avoid"
              >
                <div className="overflow-hidden aspect-square md:aspect-[3/4]">
                  <img
                    alt={cake.title}
                    src={cake.image}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="glass-panel p-4.5 rounded-lg border border-white/25 backdrop-blur-md">
                      <span className="inline-block px-2 py-0.5 bg-primary-container text-on-primary-container text-[8px] font-bold uppercase tracking-widest rounded mb-2">
                        {cake.category}
                      </span>
                      <h3 className="font-serif text-lg text-on-background mb-2">{cake.title}</h3>
                      <button className="flex items-center gap-1.5 font-sans text-xs font-bold text-primary uppercase tracking-widest hover:text-primary/80 transition-colors">
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface-container rounded-xl">
            <SlidersHorizontal className="w-10 h-10 text-outline mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold">No Creations Found</h3>
            <p className="font-sans text-sm text-on-surface-variant mt-2 max-w-sm mx-auto">
              We couldn't find any design matching your criteria. Try adjusting your search keywords or filter settings.
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-outline-variant rounded font-sans text-xs font-bold uppercase tracking-wider text-on-surface-variant hover:border-primary disabled:opacity-40 disabled:hover:border-outline-variant"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-9 h-9 rounded font-sans text-xs font-bold flex items-center justify-center transition-all ${
                    currentPage === pageNum
                      ? 'bg-primary text-white font-bold'
                      : 'border border-outline-variant hover:border-primary text-on-surface-variant'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-outline-variant rounded font-sans text-xs font-bold uppercase tracking-wider text-on-surface-variant hover:border-primary disabled:opacity-40 disabled:hover:border-outline-variant"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* Lightbox Modal overlay */}
      <AnimatePresence>
        {selectedCake && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1E1E1E]/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Click outside to close */}
            <div className="absolute inset-0 cursor-default" onClick={() => setSelectedCake(null)}></div>
            
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-background text-on-background rounded-xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 relative z-10 border border-outline-variant/30 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCake(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Lightbox Image */}
              <div className="h-[300px] md:h-full relative overflow-hidden bg-surface-container-highest">
                <img
                  src={selectedCake.image}
                  alt={selectedCake.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Lightbox Info Panel */}
              <div className="p-6 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[500px] md:max-h-none">
                <div className="space-y-6">
                  <div>
                    <span className="px-2.5 py-0.5 bg-primary-container/20 text-[#7a5900] text-[9px] font-bold rounded-full uppercase tracking-widest">
                      {selectedCake.category} Collection
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl text-on-surface mt-2 leading-tight">
                      {selectedCake.title}
                    </h2>
                  </div>

                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                    {selectedCake.description}
                  </p>

                  {/* Core Metrics */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-outline-variant/20">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <span className="block font-sans text-[10px] font-bold text-outline uppercase tracking-wider">Servings</span>
                        <span className="font-sans text-xs font-bold">{selectedCake.servings}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <span className="block font-sans text-[10px] font-bold text-outline uppercase tracking-wider">Base Price</span>
                        <span className="font-sans text-xs font-bold">R{selectedCake.basePrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Detail List */}
                  <div className="space-y-3">
                    <h4 className="font-sans text-[10px] font-bold text-outline uppercase tracking-widest">
                      Atelier Confection Details
                    </h4>
                    <ul className="space-y-2 text-xs font-sans text-on-surface-variant">
                      {selectedCake.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-container shrink-0"></span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => handleInquire(selectedCake)}
                    className="w-full bg-on-background text-background border border-on-background px-6 py-4 rounded font-sans text-xs font-bold uppercase tracking-widest hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                  >
                    Inquire / Order This Design
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-outline text-center mt-3">
                    *Design custom alterations available during checkout.
                  </p>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
