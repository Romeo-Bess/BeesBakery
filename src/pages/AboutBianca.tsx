import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { testimonialsData } from '../data/testimonialsData';

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
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

export default function AboutBianca() {
  useSEO({
    title: 'About Bianca | Founder & Master Pastry Chef',
    description: "Read the story of Bianca, founder and head confectioner of Bee's Bakery. Learn about her Tuscan patisserie training, artisanal vision, and attention to detail."
  });

  const [reviewIdx, setReviewIdx] = useState(0);

  return (
    <div className="pt-20 min-h-screen">
      
      {/* Narrative Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 honeycomb-pattern pointer-events-none -z-10 opacity-70"></div>
        <div className="max-w-container-max mx-auto px-4 lg:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Portrait Column */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-4 border border-outline-variant/40 opacity-30 rounded-lg transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
            <div className="relative overflow-hidden rounded-lg aspect-[4/5] premium-shadow border border-outline-variant/10">
              <img
                alt="Portrait of Head Baker Bianca"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6-fs4m9xSzfoTtVMwYBpIgvlKe-Km3McfM1RvftY2JGBmOVMKmsWeN4bIVuLMsiwzD5nBETgZACP25ZejE37VBXAo3xrAZCDOR_VqXrMnRVPMNngOgYguPhtR-V5rFIkzNZgt0WkESsfw1oixhbt_ANVPKL-bBNX-0I47Iyr3JTiZcxaouQWALNu-qG1q07kzw7AW4EAZ8LUD5JaxSx2ytl992r2Ku39e5zPcIfeHNZpTREfB18dMVFsIPdsQ8Ix-DTUcACsg7ko"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
              />
            </div>
          </div>

          {/* Text Story Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="font-sans text-xs font-bold text-primary tracking-[0.2em] uppercase">The Heart Behind the Flour</span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-on-surface font-semibold leading-tight">
              Meet Bianca – Founder &amp; Head Confectioner
            </h1>
            
            <div className="space-y-4 font-sans text-sm text-on-surface-variant leading-relaxed">
              <p>
                My culinary narrative began in my grandmother's sun-drenched kitchen in Tuscany. It was there that I first observed how simple organic ingredients—fresh wheat flour, wildflower honey, and vanilla beans—could bring families together and mark beautiful milestones.
              </p>
              <p>
                After graduating from the historic Patisserie Institute in Florence, I trained in boutique cake studios across Milan and Paris. I realized that baking is not just about flavor; it is a meticulous visual craft, comparable to haute couture.
              </p>
              <p>
                In 2014, I founded **Bee's Bakery** with a single-minded vision: to build custom centerpiece cakes that combine refined design details with organic, rich local ingredients. I personally sketch every design blueprint, molding each delicate sugar bloom by hand.
              </p>
              <p className="italic border-l-2 border-primary pl-4 text-on-surface py-1 bg-primary/5 rounded-r">
                "We don't merely bake cakes. We create memories that linger on the palate and in the heart."
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/gallery"
                className="bg-on-surface text-background px-8 py-3.5 rounded font-sans text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors duration-300"
              >
                View Creation Portfolio
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

      {/* Counters statistics section */}
      <section className="bg-surface-container py-16 border-y border-outline-variant/20">
        <div className="max-w-container-max mx-auto px-4 lg:px-margin-desktop">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center gap-2 p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/10 premium-shadow">
              <Counter value={12} />
              <span className="font-sans text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Years Experience</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2 p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/10 premium-shadow">
              <Counter value={2500} suffix="+" />
              <span className="font-sans text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Cakes Completed</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2 p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/10 premium-shadow">
              <Counter value={1800} suffix="+" />
              <span className="font-sans text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Happy Customers</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2 p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/10 premium-shadow">
              <Counter value={500} suffix="+" />
              <span className="font-sans text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Events Served</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Quote Slider */}
      <section className="py-20 relative">
        <div className="max-w-container-max mx-auto px-4 lg:px-margin-desktop">
          
          <div className="flex flex-col items-center text-center mb-12 space-y-4">
            <span className="font-sans text-xs font-bold text-primary tracking-[0.2em] uppercase">Client Experiences</span>
            <h2 className="font-serif text-2xl md:text-3xl text-on-surface font-semibold">Kind Words From Our Hive</h2>
            <div className="w-12 h-0.5 bg-primary-container"></div>
          </div>

          <div className="max-w-3xl mx-auto relative px-10">
            <div className="glass-panel p-8 md:p-12 rounded-xl text-center space-y-6 shadow-sm border border-outline-variant/15 bg-surface flex flex-col justify-between items-center min-h-[300px]">
              <div className="flex text-primary">
                {[...Array(testimonialsData[reviewIdx].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="font-serif text-base md:text-lg text-on-surface-variant italic leading-relaxed">
                "{testimonialsData[reviewIdx].text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant shrink-0">
                  <img
                    src={testimonialsData[reviewIdx].image}
                    alt={testimonialsData[reviewIdx].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-sans text-xs font-bold text-on-surface uppercase tracking-wider">{testimonialsData[reviewIdx].name}</h4>
                  <p className="font-sans text-[10px] text-outline uppercase tracking-wider">{testimonialsData[reviewIdx].eventType}</p>
                </div>
              </div>
            </div>

            {/* Slider Controls */}
            <button
              onClick={() => setReviewIdx((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-surface border border-outline-variant/60 hover:bg-primary hover:text-white flex items-center justify-center transition-colors text-on-surface"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setReviewIdx((prev) => (prev + 1) % testimonialsData.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-surface border border-outline-variant/60 hover:bg-primary hover:text-white flex items-center justify-center transition-colors text-on-surface"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Philosophy banner CTA */}
      <section className="bg-on-surface text-surface py-20 text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          <Award className="w-10 h-10 text-primary-container mx-auto" />
          <h2 className="font-serif text-2xl md:text-3xl text-surface-bright font-semibold">Ready to Create Your Custom Story?</h2>
          <p className="font-sans text-sm text-[#eee8d7] leading-relaxed">
            Let's collaborate on a custom dessert centerpiece that perfectly frames the theme and flavor of your celebration.
          </p>
          <div className="pt-4">
            <Link
              to="/custom"
              className="bg-primary text-white hover:bg-primary-container hover:text-on-primary-container px-10 py-4.5 rounded font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(244,180,0,0.3)] inline-block"
            >
              Start Custom Consultation
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
