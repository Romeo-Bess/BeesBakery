import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Star } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import CakeSculptor from '../components/CakeSculptor';


const FLAVORS = ['Madagascar Vanilla', 'Dark Cacao & Sea Salt', 'Earl Grey & Lavender', 'Pistachio Rose'];
const FROSTINGS = ['Swiss Meringue', 'Velvet Ganache', 'Rustic Nude'];
const SIZES = [
  { label: '6" Petite (4-6 guests)', price: 65 },
  { label: '8" Standard (10-12 guests)', price: 100 },
  { label: '10" Grand (15-20 guests)', price: 140 },
  { label: 'Custom Tiered (30+ guests)', price: 220 }
];

export default function Studio() {
  useSEO({
    title: 'Interactive Cake Studio | Design Your Artisan Centerpiece',
    description: 'Design and customize your premium bakery creation in real-time. Calculate prices instantly, explore AI inspiration concepts, and schedule milestones.'
  });

  // Designer State
  const [cakeSize, setCakeSize] = useState('8" Standard (10-12 guests)');
  const [flavor, setFlavor] = useState('Madagascar Vanilla');
  const [frosting, setFrosting] = useState('Swiss Meringue');
  const [addonFloralGold, setAddonFloralGold] = useState(false);
  const [addonCupcakes, setAddonCupcakes] = useState(false);
  const [addonCalligraphy, setAddonCalligraphy] = useState(false);
  const [calligraphyMessage, setCalligraphyMessage] = useState('');

  // Celebration Timeline State
  const [milestoneName, setMilestoneName] = useState('');
  const [milestoneCategory, setMilestoneCategory] = useState('Birthday');
  const [milestoneDate, setMilestoneDate] = useState('');
  const [timelineList, setTimelineList] = useState<{ id: string; name: string; category: string; date: string }[]>([]);

  // AI Prompt State
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedConcepts, setGeneratedConcepts] = useState<{ id: string; title: string; image: string; prompt: string }[]>([]);

  // Memory Gallery State
  const [memories, setMemories] = useState([
    {
      id: '1',
      name: 'Victoria & Mark',
      event: 'Wedding Anniversary',
      comment: 'The Blush Peony Tier was the highlight of our reception. Guests are still talking about the pistachio rose filling!',
      rating: 5,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe0AsY70hmWRuh6NWWKuDhsfU3K421235LgVyljb7Iaod7m0EUIoPopRgDpsEVzwkAdTZiIeDQk038vtf6XGpdYWGgGhsa179b6ui6jxWZ94TMbooxhwW43isIhzjGs5Ni7Flszr8Q_VsVAPEvntLjBpVFfz6rMX9LalKnjKaLr1KCFrEmTpB1BKBm0MYT6ht8yAsC9WfK4G6FB2WgC424rueH_BDs5jlXza_xNNv27u2yOAhJzq1Vsg9e4nZR0QTQb30TFb3UjDQ'
    },
    {
      id: '2',
      name: 'Oliver K.',
      event: 'Milestone 40th Birthday',
      comment: 'Incredible detail and depth on the Midnight Fig Velvet. Rich dark chocolate that was not overly sweet. Phenomenal.',
      rating: 5,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeFi4OuBXpWK_GcjCLPhyxZe1IfRX8ygi5gg8GRi1TuTFUZIw1_BCF7zgIfIGMyuehoMyCXvA9dEavwe1Gx4IgEWW5gytx_yiz60d2lwcA-3ZrIFFMLhIQpjoVYWaO-m64eWetNI20GopdxlPXEbuYmxohDI9J61B2LAeqHwGOPifoRgbpsIYYYgD0AHSOs_24EhNzdNM_6BYjtszJBwWQm3zcvz7oKlAFoWpaWLswn2EN-P9hCaGgPiLl2IU011hOgLKXaXsFnB4'
    }
  ]);
  const [memoryImage, setMemoryImage] = useState<string>('');
  const [memoryName, setMemoryName] = useState('');
  const [memoryComment, setMemoryComment] = useState('');

  // Calculate live total price
  const basePrice = SIZES.find(s => s.label === cakeSize)?.price || 65;
  const surchargeAddons = 
    (addonFloralGold ? 25 : 0) +
    (addonCupcakes ? 32 : 0) +
    (addonCalligraphy ? 12 : 0);
  const totalPrice = basePrice + surchargeAddons;

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!milestoneName.trim() || !milestoneDate) return;
    setTimelineList([
      ...timelineList,
      {
        id: Date.now().toString(),
        name: milestoneName,
        category: milestoneCategory,
        date: milestoneDate
      }
    ]);
    setMilestoneName('');
    setMilestoneDate('');
  };

  const handleMockAIGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedConcepts([
        {
          id: Date.now().toString(),
          title: `Artisan Concept: ${aiPrompt.substring(0, 25)}`,
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6-fs4m9xSzfoTtVMwYBpIgvlKe-Km3McfM1RvftY2JGBmOVMKmsWeN4bIVuLMsiwzD5nBETgZACP25ZejE37VBXAo3xrAZCDOR_VqXrMnRVPMNngOgYguPhtR-V5rFIkzNZgt0WkESsfw1oixhbt_ANVPKL-bBNX-0I47Iyr3JTiZcxaouQWALNu-qG1q07kzw7AW4EAZ8LUD5JaxSx2ytl992r2Ku39e5zPcIfeHNZpTREfB18dMVFsIPdsQ8Ix-DTUcACsg7ko',
          prompt: aiPrompt
        },
        ...generatedConcepts
      ]);
      setIsGenerating(false);
      setAiPrompt('');
    }, 1500);
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memoryName.trim() || !memoryComment.trim()) return;
    setMemories([
      {
        id: Date.now().toString(),
        name: memoryName,
        event: 'Sweet Celebrator',
        comment: memoryComment,
        rating: 5,
        image: memoryImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo8fzswCMtH9sZzAEHsBHUXlFGC41KMIkuwtIGiMW6dPJQb0wyB72jbj124MzPVOxGoZlHEkBhigSqgfYB-zDCm3yALGSqml-8gW8TNQcisjYA9TnZPaUHazYl--CwJUPx7nRXFEZlbdLptcSGsDpk17WsoaQsc1mGQg2Rvj3T9RTwP4CMhbQ-621pvb4cxZ3uFthuS13nS2sNLzQZt2JsMDrhHz5ENemBFzLpu6QNoEqxOM3tUYUzG_oiYebKvdzQP-nPT9-lmbc'
      },
      ...memories
    ]);
    setMemoryName('');
    setMemoryComment('');
    setMemoryImage('');
  };

  return (
    <div className="pt-20 bg-on-background text-[#FFF8E7] min-h-screen">
      
      {/* Header */}
      <header className="max-w-container-max mx-auto px-4 lg:px-margin-desktop py-12 text-center">
        <span className="font-sans text-xs font-bold text-primary uppercase tracking-[0.2em] mb-3 inline-block">Interactive Space</span>
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">The Customizer Studio</h1>
        <p className="font-sans text-xs text-[#eee8d7]/70 max-w-xl mx-auto">
          Tailor-design your centerpiece structure, register milestones for priority booking, and visualize concepts in real-time.
        </p>
      </header>

      {/* Main Designer Grid */}
      <main className="max-w-container-max mx-auto px-4 lg:px-margin-desktop pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Control Panel */}
        <section className="lg:col-span-6 space-y-10">
          
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-serif text-xl text-white font-semibold">1. Core Architecture</h3>
            <p className="font-sans text-[10px] text-[#eee8d7]/60">Select sizing tiers and custom base flavors.</p>
          </div>

          {/* Size Choice */}
          <div className="space-y-3">
            <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#eee8d7]/50">Tiers &amp; Servings</label>
            <div className="grid grid-cols-2 gap-3">
              {SIZES.map(sz => (
                <button
                  key={sz.label}
                  onClick={() => setCakeSize(sz.label)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    cakeSize === sz.label ? 'border-primary bg-primary/10 text-white' : 'border-white/10 hover:border-primary/50'
                  }`}
                >
                  <p className="font-sans text-xs font-bold">{sz.label.split(' (')[0]}</p>
                  <p className="text-[10px] text-primary mt-0.5">${sz.price}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Flavor Profiles */}
          <div className="space-y-3">
            <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#eee8d7]/50">Base Flavor sponge</label>
            <div className="flex flex-wrap gap-2">
              {FLAVORS.map(flv => (
                <button
                  key={flv}
                  onClick={() => setFlavor(flv)}
                  className={`px-3.5 py-2 rounded-full font-sans text-xs font-bold transition-all border ${
                    flavor === flv ? 'bg-primary text-on-background border-primary' : 'bg-transparent border-white/20 hover:border-primary'
                  }`}
                >
                  {flv}
                </button>
              ))}
            </div>
          </div>

          {/* Frosting Styles */}
          <div className="space-y-3">
            <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#eee8d7]/50">Frosting Texture Coating</label>
            <div className="flex flex-wrap gap-2">
              {FROSTINGS.map(fst => (
                <button
                  key={fst}
                  onClick={() => setFrosting(fst)}
                  className={`px-3.5 py-2 rounded-full font-sans text-xs font-bold transition-all border ${
                    frosting === fst ? 'bg-primary text-on-background border-primary' : 'bg-transparent border-white/20 hover:border-primary'
                  }`}
                >
                  {fst}
                </button>
              ))}
            </div>
          </div>

          {/* Flourishes (Addons) */}
          <div className="border-l-4 border-primary pl-4 pt-1">
            <h3 className="font-serif text-xl text-white font-semibold">2. Handcrafted Embellishments</h3>
            <p className="font-sans text-[10px] text-[#eee8d7]/60">Elevate the appearance with premium studio details.</p>
          </div>

          <div className="space-y-4">
            {/* Toggles */}
            <label className="flex items-center gap-3 cursor-pointer p-3 border border-white/10 rounded-lg hover:border-primary/40 transition-colors">
              <input
                type="checkbox"
                checked={addonFloralGold}
                onChange={() => setAddonFloralGold(!addonFloralGold)}
                className="accent-primary w-4 h-4"
              />
              <div className="text-left">
                <span className="block font-sans text-xs font-bold">Floral &amp; 24k Gold Leaf Overlay (+$25)</span>
                <span className="block text-[10px] text-[#eee8d7]/60"> pressed botanicals and gold shimmer.</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer p-3 border border-white/10 rounded-lg hover:border-primary/40 transition-colors">
              <input
                type="checkbox"
                checked={addonCupcakes}
                onChange={() => setAddonCupcakes(!addonCupcakes)}
                className="accent-primary w-4 h-4"
              />
              <div className="text-left">
                <span className="block font-sans text-xs font-bold">Matching Cupcakes (Box of 6) (+$32)</span>
                <span className="block text-[10px] text-[#eee8d7]/60">Hand-designed pairing boxes.</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer p-3 border border-white/10 rounded-lg hover:border-primary/40 transition-colors">
              <input
                type="checkbox"
                checked={addonCalligraphy}
                onChange={() => setAddonCalligraphy(!addonCalligraphy)}
                className="accent-primary w-4 h-4"
              />
              <div className="text-left">
                <span className="block font-sans text-xs font-bold">Chocolate Calligraphy Message Banner (+$12)</span>
                <span className="block text-[10px] text-[#eee8d7]/60">Custom written chocolate banner base.</span>
              </div>
            </label>

            {addonCalligraphy && (
              <div className="space-y-2">
                <label className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#eee8d7]/50">Banner Text Message</label>
                <input
                  type="text"
                  maxLength={25}
                  value={calligraphyMessage}
                  onChange={(e) => setCalligraphyMessage(e.target.value)}
                  placeholder="e.g. Happy Anniversary (Max 25 Chars)"
                  className="w-full bg-[#1E1E1E] border border-white/10 rounded-lg px-4 py-2 text-sm text-[#FFF8E7] focus:border-primary outline-none"
                />
              </div>
            )}
          </div>

        </section>

        {/* Right Side: Visualizer and Pricing */}
        <section className="lg:col-span-6 lg:sticky lg:top-28 space-y-6">
          <CakeSculptor
            cakeType="Tiered Event"
            cakeSize={cakeSize}
            flavor={flavor}
            frosting={frosting}
            addonFloralGold={addonFloralGold}
            addonCupcakes={addonCupcakes}
            addonCalligraphy={addonCalligraphy}
            calligraphyMessage={calligraphyMessage}
          />

          <div className="bg-[#1E1E1E] p-6 rounded-xl border border-white/5 space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#eee8d7]/50">ESTIMATED PRICE</span>
                <p className="font-serif text-3xl font-bold text-primary">${totalPrice}.00</p>
              </div>
              <Link
                to={`/order?cakeType=${cakeSize.includes('Custom') ? 'Tiered Event' : 'Signature Layer'}&flavor=${encodeURIComponent(flavor)}`}
                className="bg-primary text-on-background px-6 py-3.5 rounded font-sans text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-[10px] text-[#eee8d7]/50 italic">
              *Price excludes local white-glove climate delivery options.
            </p>
          </div>
        </section>

      </main>

      {/* Celebration Timeline Section */}
      <section className="bg-neutral-900 border-t border-white/5 py-20">
        <div className="max-w-container-max mx-auto px-4 lg:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-primary">
              <Calendar className="w-5 h-5" />
              <span className="font-sans text-xs font-bold uppercase tracking-widest">Milestone Registry</span>
            </div>
            <h2 className="font-serif text-3xl text-white">Save Your Celebrations</h2>
            <p className="font-sans text-xs text-[#eee8d7]/70 leading-relaxed">
              Register birthdays, corporate banquets, and weddings. Our system auto-calculates timing tracks and highlights menu priority slots 4 weeks in advance.
            </p>

            <form onSubmit={handleAddMilestone} className="space-y-4">
              <input
                type="text"
                value={milestoneName}
                onChange={(e) => setMilestoneName(e.target.value)}
                placeholder="Event Name (e.g. Leo's 5th Birthday)"
                className="w-full bg-[#1E1E1E] border border-white/10 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-primary"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={milestoneCategory}
                  onChange={(e) => setMilestoneCategory(e.target.value)}
                  className="bg-[#1E1E1E] border border-white/10 rounded-lg px-4 py-3 text-xs text-white outline-none"
                >
                  <option value="Birthday">Birthday</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Corporate">Corporate</option>
                </select>
                <input
                  type="date"
                  value={milestoneDate}
                  onChange={(e) => setMilestoneDate(e.target.value)}
                  className="bg-[#1E1E1E] border border-white/10 rounded-lg px-4 py-3 text-xs text-white outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-on-background py-3 rounded font-sans text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
              >
                Add Celebration Tracker
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-[#1E1E1E] p-6 rounded-xl border border-white/5 h-[350px] overflow-y-auto">
            <h3 className="font-serif text-lg mb-4 text-white">Upcoming Timelines</h3>
            {timelineList.length === 0 ? (
              <p className="text-xs text-[#eee8d7]/50 text-center pt-20">No saved milestones. Register above to track custom bakery recommendations.</p>
            ) : (
              <div className="space-y-3">
                {timelineList.map(item => (
                  <div key={item.id} className="flex justify-between items-center p-3.5 bg-neutral-900 rounded border border-white/5">
                    <div>
                      <p className="font-sans text-xs font-bold text-white">{item.name}</p>
                      <p className="text-[10px] text-primary uppercase mt-0.5">{item.category} • {item.date}</p>
                    </div>
                    <span className="text-[9px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded uppercase tracking-wider font-bold">
                      Recommendation Ready
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* AI Concept Inspiration */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-container-max mx-auto px-4 lg:px-margin-desktop">
          
          <div className="flex flex-col items-center mb-12 text-center space-y-4">
            <span className="font-sans text-xs font-bold text-primary uppercase tracking-[0.2em]">Artificial Ideation</span>
            <h2 className="font-serif text-3xl text-white">AI Cake Inspiration Generator</h2>
            <p className="font-sans text-xs text-[#eee8d7]/70 max-w-xl mx-auto">
              Type custom thematic concepts below. Our mock layout generator will generate editorial blueprints based on your keywords.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleMockAIGenerate} className="flex gap-4 mb-8">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g. Starry night space unicorn with velvet flowers..."
                className="flex-1 bg-[#1E1E1E] border border-white/10 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-primary"
                required
              />
              <button
                type="submit"
                disabled={isGenerating}
                className="bg-primary text-on-background px-6 py-3 rounded font-sans text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50"
              >
                {isGenerating ? 'Drafting...' : 'Dream Concept'}
              </button>
            </form>

            <AnimatePresence>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {generatedConcepts.map(concept => (
                  <motion.div
                    key={concept.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-white/5 flex flex-col justify-between"
                  >
                    <div className="aspect-[4/3] bg-neutral-900 overflow-hidden relative">
                      <img src={concept.image} alt={concept.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 bg-primary/95 text-on-background px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest">
                        AI Render
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-serif text-sm text-white mb-1">{concept.title}</h4>
                      <p className="text-[10px] text-[#eee8d7]/60 italic font-sans leading-relaxed">
                        Prompt: "{concept.prompt}"
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Memory Gallery */}
      <section className="bg-neutral-900 py-20 border-t border-white/5">
        <div className="max-w-container-max mx-auto px-4 lg:px-margin-desktop">
          
          <div className="flex flex-col items-center mb-12 text-center space-y-4">
            <span className="font-sans text-xs font-bold text-primary uppercase tracking-[0.2em]">Shared Honey</span>
            <h2 className="font-serif text-3xl text-white">The Memory Gallery</h2>
            <p className="font-sans text-xs text-[#eee8d7]/70 max-w-xl mx-auto">
              We sell celebrations, not cakes. Browse event pictures uploaded directly by our happy clients below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {memories.map(mem => (
              <div key={mem.id} className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-white/5 flex flex-col">
                <div className="aspect-[4/3] bg-neutral-900 overflow-hidden">
                  <img src={mem.image} alt={mem.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <p className="text-xs text-[#eee8d7]/80 italic leading-relaxed font-sans">
                    "{mem.comment}"
                  </p>
                  <div className="flex justify-between items-center border-t border-white/5 pt-3">
                    <div>
                      <p className="font-sans text-xs font-bold text-white">{mem.name}</p>
                      <p className="text-[9px] text-[#eee8d7]/40 uppercase">{mem.event}</p>
                    </div>
                    <div className="flex text-primary">
                      {[...Array(mem.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form to submit card */}
          <div className="max-w-md mx-auto bg-[#1E1E1E] p-6 rounded-xl border border-white/5">
            <h3 className="font-serif text-md mb-4 text-white text-center">Share Your Celebration Memory</h3>
            <form onSubmit={handleAddMemory} className="space-y-4">
              <input
                type="text"
                value={memoryName}
                onChange={(e) => setMemoryName(e.target.value)}
                placeholder="Your Name (e.g. Samantha &amp; Leo)"
                className="w-full bg-neutral-900 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none"
                required
              />
              <textarea
                value={memoryComment}
                onChange={(e) => setMemoryComment(e.target.value)}
                placeholder="Share a short review of your cake/celebration..."
                className="w-full bg-neutral-900 border border-white/10 rounded px-3 py-2 text-xs text-white h-20 outline-none"
                required
              />
              <input
                type="url"
                value={memoryImage}
                onChange={(e) => setMemoryImage(e.target.value)}
                placeholder="Photo Link URL (Optional)"
                className="w-full bg-neutral-900 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none"
              />
              <button
                type="submit"
                className="w-full bg-primary text-on-background py-2.5 rounded font-sans text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
              >
                Upload to Memory Board
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}
