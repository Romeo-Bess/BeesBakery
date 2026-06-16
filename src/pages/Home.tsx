import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Stars, Sparkles, Award, Utensils, Heart, CheckCircle2, Star } from 'lucide-react';
import { useSEO, localBusinessSchema } from '../hooks/useSEO';
import { cakesData } from '../data/cakesData';
import { testimonialsData } from '../data/testimonialsData';
import { ParallaxHeroImages } from '../components/ui/parallax-hero-images';
import { BentoGrid, BentoGridItem } from '../components/ui/bento-grid';
import { InfiniteMovingCards } from '../components/ui/infinite-moving-cards';

const PARALLAX_IMAGES = cakesData.map((cake) => cake.image);



const FEATURES = [
  {
    icon: Sparkles,
    title: 'Fresh Ingredients',
    desc: 'We source only premium ethical ingredients globally, from organic butter to Madagascar vanilla beans.',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800',
    objectPosition: 'center'
  },
  {
    icon: Heart,
    title: 'Handmade Designs',
    desc: 'Each sugar petal, chocolate shard, and piping flourish is meticulously crafted by hand in our studio.',
    image: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=800',
    objectPosition: 'center'
  },
  {
    icon: Stars,
    title: 'Custom Orders',
    desc: 'Collaborate directly with Bianca to sketch and conceptualize a confection tailored to your event.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800',
    objectPosition: 'center',
    objectFit: 'cover'
  },
  {
    icon: CheckCircle2,
    title: 'Reliable Service',
    desc: 'With white-glove, climate-controlled deliveries, we guarantee your cake arrives flawless and on-time.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
    objectPosition: 'center'
  },
  {
    icon: Award,
    title: 'Event Specialists',
    desc: 'Experienced in handling grand setups for weddings, corporate galas, and bespoke parties.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
    objectPosition: 'center',
    objectFit: 'cover'
  },
  {
    icon: Utensils,
    title: 'Premium Quality',
    desc: 'Baking in small batches ensures a moist sponge, balanced sweetness, and gourmet flavor combinations.',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800',
    objectPosition: 'center'
  }
];

// Stats animated counter helper component
function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const end = value;
      const stepTime = Math.abs(Math.floor(duration / end));
      
      const timer = setInterval(() => {
        start += Math.ceil(end / 100);
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, Math.max(stepTime, 20));

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-serif text-primary text-4xl md:text-5xl font-bold">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Home() {
  useSEO({
    title: 'Custom Cakes Crafted For Unforgettable Celebrations',
    description: "Welcome to Bee's Bakery, a luxury artisan cake studio. We craft premium bespoke wedding cakes, floral creations, and cupcakes made fresh to order.",
    schema: localBusinessSchema
  });



  // Testimonials marquee data
  const marqueeTestimonials = testimonialsData.map((t) => ({
    quote: t.text,
    name: t.name,
    title: t.eventType,
    image: t.image,
  }));

  return (
    <div className="pt-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full py-20 lg:py-32 flex items-center justify-center min-h-[calc(100vh-80px)] overflow-hidden">
        <div className="absolute inset-0 honeycomb-pattern pointer-events-none -z-10 opacity-70"></div>
        
        {/* Parallax Hero Images at the back */}
        <div className="absolute inset-0 z-0">
          <ParallaxHeroImages images={PARALLAX_IMAGES} className="opacity-75" />
        </div>

        {/* Radial Overlay for readability */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,249,236,0.95)_35%,rgba(255,249,236,0.6)_100%)] z-5 pointer-events-none"></div>

        {/* Centered Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center text-center gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container-low border border-outline-variant/50 w-fit">
            <Stars className="w-4 h-4 text-primary" />
            <span className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
              Artisan Confectionery Studio
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[64px] leading-[1.1] text-on-background tracking-tight max-w-3xl">
            Custom Cakes Crafted To Make Every Celebration <span className="text-primary italic font-normal">Unforgettable</span>
          </h1>

          <p className="font-sans text-body-lg text-on-surface-variant max-w-xl">
            Handcrafted cakes and cupcakes designed with passion, creativity, and attention to every detail. Made fresh in our atelier.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 justify-center">
            <Link
              to="/custom"
              className="bg-on-background text-background border border-on-background px-8 py-4 rounded font-sans text-xs font-bold uppercase tracking-widest hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(244,180,0,0.25)] flex items-center gap-2"
            >
              Inquire Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/gallery"
              className="bg-transparent border border-primary text-primary px-8 py-4 rounded font-sans text-xs font-bold uppercase tracking-widest hover:bg-surface-container-low transition-colors duration-300"
            >
              View Creations
            </Link>
          </div>

          {/* Floating Badges details */}
          <div className="flex flex-col items-center gap-4 mt-6 pt-6 border-t border-outline-variant/30 w-full max-w-md">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3.5">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo8fzswCMtH9sZzAEHsBHUXlFGC41KMIkuwtIGiMW6dPJQb0wyB72jbj124MzPVOxGoZlHEkBhigSqgfYB-zDCm3yALGSqml-8gW8TNQcisjYA9TnZPaUHazYl--CwJUPx7nRXFEZlbdLptcSGsDpk17WsoaQsc1mGQg2Rvj3T9RTwP4CMhbQ-621pvb4cxZ3uFthuS13nS2sNLzQZt2JsMDrhHz5ENemBFzLpu6QNoEqxOM3tUYUzG_oiYebKvdzQP-nPT9-lmbc"
                  alt="Client 1"
                  className="w-10 h-10 rounded-full border-2 border-background object-cover"
                />
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwznN0uO552vV41BheE9kBk6s1kWKhbJM6pLnjP21M_jnhPsYTVUxya_mHOo_aCOw_qKS3ehMeNBvhMKIGpHu6HzRXAhZomOh4ljLlQQu6JT04M7LECW3-8SS7MG4NBw_Kk6dKGfKvv9_XUnATli508sSQznM4n-MWi8PEpY8gZIQkDZ7KCBnHUFvKLigRx47wBlaJWuq-kWk8BSk_WwRAbjOJ-nzCYg5Sl2AnyrUpBj3lj7CX9TeiSmexHKWmIMfaqebHEXNqMx8"
                  alt="Client 2"
                  className="w-10 h-10 rounded-full border-2 border-background object-cover"
                />
                <div className="w-10 h-10 rounded-full border-2 border-background bg-surface-container flex items-center justify-center font-sans text-xs font-bold text-primary">
                  +2k
                </div>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="font-sans text-xs font-bold text-on-surface-variant mt-0.5">
                  Loved by 5-Star Discerning Clients
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating badge 1: Made Fresh */}
        <motion.div 
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute top-28 right-6 glass-panel rounded-lg p-3.5 hidden md:flex items-center gap-3.5 z-10"
        >
          <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="font-sans text-[10px] font-bold uppercase tracking-wider text-on-background">Made Fresh</p>
            <p className="font-sans text-xs text-on-surface-variant">To Order Daily</p>
          </div>
        </motion.div>

        {/* Floating badge 2: Custom Designs */}
        <motion.div 
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute bottom-28 left-6 glass-panel rounded-lg p-3.5 hidden md:flex items-center gap-3.5 z-10"
        >
          <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
            <Stars className="w-5 h-5" />
          </div>
          <div>
            <p className="font-sans text-[10px] font-bold uppercase tracking-wider text-on-background">Bespoke Only</p>
            <p className="font-sans text-xs text-on-surface-variant">Custom Designed</p>
          </div>
        </motion.div>
      </section>

      {/* 2. FEATURED PORTFOLIO PREVIEW */}
      <section className="bg-surface-container-low py-section-gap">
        <div className="max-w-container-max mx-auto px-4 lg:px-margin-desktop">
          
          <div className="flex flex-col items-center mb-16 text-center">
            <span className="font-sans text-xs font-bold text-primary uppercase tracking-[0.2em] mb-3">Our Portfolio Preview</span>
            <h2 className="font-serif text-3xl md:text-4xl text-on-background font-semibold">Featured Creations</h2>
            <div className="w-16 h-0.5 bg-primary-container mt-5"></div>
          </div>

          {/* Masonry grid for featured items */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {cakesData.slice(0, 3).map((cake, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={cake.id}
                className="relative rounded-xl overflow-hidden break-inside-avoid group cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 bg-surface-container-lowest"
              >
                <div className="overflow-hidden aspect-[4/5] relative">
                  <img
                    src={cake.image}
                    alt={cake.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="glass-panel p-4 rounded border border-white/10 backdrop-blur-md">
                    <span className="inline-block px-2.5 py-0.5 bg-primary-container/20 text-[#7a5900] text-[9px] font-bold rounded-full uppercase tracking-wider mb-2">
                      {cake.category} Cakes
                    </span>
                    <h3 className="font-serif text-lg text-on-background mb-2">{cake.title}</h3>
                    <Link
                      to={`/gallery?id=${cake.id}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-fixed-dim uppercase tracking-wider transition-colors"
                    >
                      Explore Collection
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link
              to="/gallery"
              className="bg-transparent border-b-2 border-primary text-on-background font-sans text-xs font-bold uppercase tracking-widest pb-1 hover:text-primary transition-all flex items-center gap-2"
            >
              View Full Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 3. WHY CHOOSE BEE'S BAKERY */}
      <section className="max-w-container-max mx-auto px-4 lg:px-margin-desktop py-section-gap relative">
        <div className="absolute inset-0 honeycomb-pattern pointer-events-none -z-10 opacity-30"></div>
        
        <div className="flex flex-col gap-12">
          
          {/* Header row */}
          <div className="max-w-3xl space-y-4">
            <span className="font-sans text-xs font-bold text-primary uppercase tracking-[0.2em]">The Atelier Difference</span>
            <h2 className="font-serif text-3xl md:text-4xl text-on-background leading-tight">
              Bespoke Confectionery Crafted With Meticulous Care
            </h2>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              We believe a cake is not merely a confection—it is the stunning centerpiece of your celebration. Every sketch, every ingredient, and every structural layer is chosen to ensure flawless execution.
            </p>
          </div>

          {/* Bento Grid layout */}
          <BentoGrid className="w-full">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              // We alternate column spans to make it look like a gorgeous bento grid:
              const isColSpan2 = i === 1 || i === 2 || i === 5;
              return (
                <BentoGridItem
                  key={feature.title}
                  title={feature.title}
                  description={feature.desc}
                  header={
                    <div className="flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden relative group/item border border-outline-variant/10">
                      <img 
                        src={feature.image} 
                        alt={feature.title} 
                        style={{
                          objectFit: (feature.objectFit as any) || 'cover',
                          objectPosition: feature.objectPosition || 'center'
                        }}
                        className="w-full h-full transition-transform duration-500 group-hover/bento:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent"></div>
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-xs flex items-center justify-center text-primary shadow-sm border border-outline-variant/10">
                        <Icon className="w-4 h-4 group-hover/bento:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                  }
                  icon={<Icon className="w-5 h-5 text-primary shrink-0" />}
                  className={isColSpan2 ? "md:col-span-2" : "md:col-span-1"}
                />
              );
            })}
          </BentoGrid>
          
          <div className="flex justify-start">
            <Link
              to="/about"
              className="inline-flex bg-primary text-white hover:bg-on-background px-6 py-3.5 rounded font-sans text-xs font-bold uppercase tracking-widest transition-colors duration-300"
            >
              Read Our Story
            </Link>
          </div>

        </div>
      </section>

      {/* 4. ABOUT BIANCA FOUNDER PREVIEW */}
      <section className="bg-surface-container py-24">
        <div className="max-w-container-max mx-auto px-4 lg:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Portrait Image Column */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-3 border border-outline-variant/40 opacity-40 rounded-lg transform translate-x-2.5 translate-y-2.5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
            <div className="relative overflow-hidden rounded-lg aspect-[4/5] premium-shadow border border-outline-variant/10">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6-fs4m9xSzfoTtVMwYBpIgvlKe-Km3McfM1RvftY2JGBmOVMKmsWeN4bIVuLMsiwzD5nBETgZACP25ZejE37VBXAo3xrAZCDOR_VqXrMnRVPMNngOgYguPhtR-V5rFIkzNZgt0WkESsfw1oixhbt_ANVPKL-bBNX-0I47Iyr3JTiZcxaouQWALNu-qG1q07kzw7AW4EAZ8LUD5JaxSx2ytl992r2Ku39e5zPcIfeHNZpTREfB18dMVFsIPdsQ8Ix-DTUcACsg7ko"
                alt="Pastry Chef Bianca"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
              />
            </div>
          </div>

          {/* Story & Statistics Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="font-sans text-xs font-bold text-primary tracking-[0.2em] uppercase">The Heart Behind the Flour</span>
            <h2 className="font-serif text-3xl md:text-4xl text-on-surface leading-tight font-semibold">
              Meet Bianca – Founder & Head Confectioner
            </h2>
            <div className="space-y-4 font-sans text-sm text-on-surface-variant leading-relaxed">
              <p>
                My journey began in my grandmother's sun-drenched kitchen in Tuscany, where I first learned that baking is not just a profession; it is an act of storytelling and a pursuit of visual art.
              </p>
              <p>
                At Bee's Bakery, we curate masterpiece memories for life's most precious milestones. My passion is matched only by my meticulous attention to every delicate sugar petal and nuanced cake crumb, ensuring your celebration is custom-tailored to perfection.
              </p>
              <p className="italic border-l-2 border-primary-container pl-4 py-1.5 text-on-surface">
                "True craftsmanship lies in the details that others might overlook, but that everyone feels on their special day."
              </p>
            </div>

            {/* Statistics Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-outline-variant/35 mt-2">
              <div className="flex flex-col gap-1 p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10 shadow-sm text-center">
                <Counter value={12} />
                <span className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Years Exp</span>
              </div>
              <div className="flex flex-col gap-1 p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10 shadow-sm text-center">
                <Counter value={2500} suffix="+" />
                <span className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Cakes Created</span>
              </div>
              <div className="flex flex-col gap-1 p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10 shadow-sm text-center">
                <Counter value={1800} suffix="+" />
                <span className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Happy Clients</span>
              </div>
              <div className="flex flex-col gap-1 p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10 shadow-sm text-center">
                <Counter value={500} suffix="+" />
                <span className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Events Served</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/about"
                className="bg-on-surface text-surface px-8 py-3.5 rounded font-sans text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors duration-300"
              >
                Read Bianca's Story
              </Link>
              <Link
                to="/custom"
                className="border border-outline px-8 py-3.5 rounded font-sans text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-colors duration-300"
              >
                Book a Consultation
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 5. TESTIMONIALS SLIDER SECTION */}
      <section className="py-section-gap relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-4 lg:px-margin-desktop">
          
          <div className="flex flex-col items-center text-center mb-16 space-y-4">
            <span className="font-sans text-xs font-bold text-primary tracking-[0.2em] uppercase">Client Stories</span>
            <h2 className="font-serif text-3xl md:text-4xl text-on-surface font-semibold">Kind Words From Our Hive</h2>
            <div className="w-16 h-0.5 bg-primary-container"></div>
          </div>

          {/* Testimonial slider card */}
          {/* Testimonials marquee */}
          <div className="w-full flex justify-center overflow-hidden">
            <InfiniteMovingCards
              items={marqueeTestimonials}
              direction="left"
              speed="normal"
            />
          </div>

          <div className="flex justify-center mt-10">
            <Link
              to="/testimonials"
              className="font-sans text-xs font-bold text-primary hover:text-primary-fixed-dim uppercase tracking-wider transition-colors"
            >
              Read All Testimonials
            </Link>
          </div>

        </div>
      </section>

      {/* 6. FINAL CONSULTATION CALL TO ACTION */}
      <section className="bg-on-background text-surface py-24 relative overflow-hidden">
        {/* Abstract Gold Glow elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/15 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-r from-primary/10 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="max-w-container-max mx-auto px-4 lg:px-margin-desktop text-center relative z-10 flex flex-col items-center gap-6">
          <Sparkles className="w-12 h-12 text-primary-container" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] leading-[1.2] text-[#FFF8E7] max-w-3xl font-semibold">
            Let's Create Something <span className="text-primary italic font-normal">Beautiful</span> Together
          </h2>
          <p className="font-sans text-sm text-[#eee8d7] max-w-lg leading-relaxed">
            Schedule a private consultation to discuss your vision, sample our signature flavors, and begin sketching the centerpiece of your celebration.
          </p>
          <div className="pt-4 flex flex-wrap gap-4 justify-center">
            <Link
              to="/custom"
              className="bg-primary-container text-on-primary-container hover:bg-primary-container/90 px-8 py-4 rounded font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(244,180,0,0.35)]"
            >
              Schedule a Consultation
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border border-outline/50 hover:border-[#FFF8E7] text-[#FFF8E7] px-8 py-4 rounded font-sans text-xs font-bold uppercase tracking-widest transition-colors duration-300"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
