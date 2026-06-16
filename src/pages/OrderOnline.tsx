import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cake, Layers, Upload, Plus, Minus, Check, CheckCircle2, 
  Trash2, ShieldCheck, ArrowRight, ArrowLeft, Loader2 
} from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
// Form interface
interface OrderFormData {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  cakeType: 'Signature Layer' | 'Tiered Event';
  cakeSize: '6" Petite (4-6 guests)' | '8" Standard (10-12 guests)' | '10" Grand (15-20 guests)' | 'Custom Tiered (30+ guests)';
  flavor: string;
  frosting: string;
  quantity: number;
  specialRequests: string;
  deliveryMethod: 'pickup' | 'delivery';
  deliveryAddress: string;
  inspirationImage: File | null;
  inspirationPreviewUrl: string;
  orderNotes: string;
  // Flourishes (Add-ons)
  addonFloralGold: boolean;
  addonCupcakes: boolean;
  addonCalligraphy: boolean;
  calligraphyMessage: string;
}

export default function OrderOnline() {
  const [searchParams] = useSearchParams();
  useSEO({
    title: 'Order Online | Craft Your Custom Artisan Cake',
    description: "Design and customize your premium cake online. Select flavors, servings, frostings, and get a real-time quote for your custom confectionery."
  });

  // Prefill details from Gallery selection if present
  const queryCakeType = searchParams.get('cakeType');
  const queryFlavor = searchParams.get('flavor');

  // Form initial state
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    cakeType: queryCakeType && queryCakeType.includes('Wedding') ? 'Tiered Event' : 'Signature Layer',
    cakeSize: '10" Grand (15-20 guests)',
    flavor: queryFlavor || 'Madagascar Vanilla',
    frosting: 'Swiss Meringue',
    quantity: 1,
    specialRequests: '',
    deliveryMethod: 'delivery',
    deliveryAddress: '',
    inspirationImage: null,
    inspirationPreviewUrl: '',
    orderNotes: '',
    addonFloralGold: false,
    addonCupcakes: false,
    addonCalligraphy: false,
    calligraphyMessage: ''
  });

  // Steps state
  const [step, setStep] = useState<number>(1);
  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Live calculations
  const prices = {
    baseSignature: 65,
    baseTiered: 180,
    sizeSurcharges: {
      '6" Petite (4-6 guests)': 0,
      '8" Standard (10-12 guests)': 35,
      '10" Grand (15-20 guests)': 75,
      'Custom Tiered (30+ guests)': 120
    },
    frostingSurcharges: {
      'Swiss Meringue': 0,
      'Velvet Ganache': 15,
      'Rustic Nude': 0
    },
    addons: {
      floralGold: 25,
      cupcakes: 32,
      calligraphy: 12
    },
    delivery: 18
  };

  const calculateSubtotal = () => {
    const base = formData.cakeType === 'Tiered Event' ? prices.baseTiered : prices.baseSignature;
    const sizeFee = prices.sizeSurcharges[formData.cakeSize] || 0;
    const frostingFee = prices.frostingSurcharges[formData.frosting as keyof typeof prices.frostingSurcharges] || 0;
    
    let itemsBase = (base + sizeFee + frostingFee) * formData.quantity;
    
    if (formData.addonFloralGold) itemsBase += prices.addons.floralGold;
    if (formData.addonCupcakes) itemsBase += prices.addons.cupcakes;
    if (formData.addonCalligraphy) itemsBase += prices.addons.calligraphy;
    
    if (formData.deliveryMethod === 'delivery') itemsBase += prices.delivery;
    
    return itemsBase;
  };

  // Stepper validation
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<Record<keyof OrderFormData, string>> = {};
    
    if (currentStep === 1) {
      if (!formData.eventDate) newErrors.eventDate = 'Event date is required.';
    }
    
    if (currentStep === 3) {
      if (!formData.name.trim()) newErrors.name = 'Full name is required.';
      if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Please enter a valid email address.';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
      if (formData.deliveryMethod === 'delivery' && !formData.deliveryAddress.trim()) {
        newErrors.deliveryAddress = 'Delivery address is required for white-glove shipping.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(3, s + 1));
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo(0, 0);
  };

  // Image Upload Handle
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, inspirationImage: 'Image file must be under 5MB.' });
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        inspirationImage: file,
        inspirationPreviewUrl: previewUrl
      });
      setErrors({ ...errors, inspirationImage: undefined });
    }
  };

  const handleRemoveImage = () => {
    if (formData.inspirationPreviewUrl) {
      URL.revokeObjectURL(formData.inspirationPreviewUrl);
    }
    setFormData({
      ...formData,
      inspirationImage: null,
      inspirationPreviewUrl: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    
    // Simulate database entry API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="pt-20 min-h-screen">
      
      {/* Page Header */}
      <header className="max-w-container-max mx-auto px-4 lg:px-margin-desktop py-12 text-center">
        <h1 className="font-serif text-display-lg text-primary mb-4">Craft Your Confection</h1>
        <p className="font-sans text-sm text-on-surface-variant max-w-xl mx-auto">
          Tailor every element of your artisan cake below. Our baking studio handles each order as a bespoke masterpiece.
        </p>

        {/* Stepper Indicators */}
        <div className="flex justify-center items-center gap-3 md:gap-8 mt-12 text-xs font-sans font-bold uppercase tracking-widest">
          <button 
            onClick={() => step > 1 && setStep(1)}
            className={`pb-2 border-b-2 transition-all ${step >= 1 ? 'border-primary text-primary' : 'border-transparent text-outline'}`}
          >
            01. Selection
          </button>
          <div className="h-px w-6 md:w-12 bg-outline-variant/50"></div>
          <button 
            onClick={() => step > 2 && setStep(2)}
            disabled={step < 2}
            className={`pb-2 border-b-2 transition-all ${step >= 2 ? 'border-primary text-primary' : 'border-transparent text-outline'}`}
          >
            02. Add-ons
          </button>
          <div className="h-px w-6 md:w-12 bg-outline-variant/50"></div>
          <button 
            disabled={step < 3}
            className={`pb-2 border-b-2 transition-all ${step === 3 ? 'border-primary text-primary' : 'border-transparent text-outline'}`}
          >
            03. Details
          </button>
        </div>
      </header>

      {/* Main Grid: Form Left, Sticky Summary Right */}
      <main className="max-w-container-max mx-auto px-4 lg:px-margin-desktop pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Form Panel */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              <AnimatePresence mode="wait">
                
                {/* STEP 1: Core Selection */}
                {step === 1 && (
                  <motion.section
                    key="step1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="font-serif text-2xl text-on-surface font-semibold">The Foundation</h3>
                      <p className="font-sans text-xs text-on-surface-variant">Select the core structure of your custom cake design.</p>
                    </div>

                    {/* Cake Type buttons */}
                    <div className="space-y-4">
                      <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Cake Type</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, cakeType: 'Signature Layer' })}
                          className={`p-5 rounded-lg border-2 text-left relative transition-all ${
                            formData.cakeType === 'Signature Layer'
                              ? 'border-primary bg-primary-container/5'
                              : 'border-outline-variant/40 bg-surface hover:border-primary/50'
                          }`}
                        >
                          {formData.cakeType === 'Signature Layer' && (
                            <CheckCircle2 className="w-5 h-5 text-primary absolute top-4 right-4" />
                          )}
                          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary mb-3">
                            <Cake className="w-5 h-5" />
                          </div>
                          <span className="block font-sans text-sm font-bold text-on-surface">Signature Layer Cake</span>
                          <span className="text-xs text-on-surface-variant">Single-tier custom statement. Starting at R65.00</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, cakeType: 'Tiered Event' })}
                          className={`p-5 rounded-lg border-2 text-left relative transition-all ${
                            formData.cakeType === 'Tiered Event'
                              ? 'border-primary bg-primary-container/5'
                              : 'border-outline-variant/40 bg-surface hover:border-primary/50'
                          }`}
                        >
                          {formData.cakeType === 'Tiered Event' && (
                            <CheckCircle2 className="w-5 h-5 text-primary absolute top-4 right-4" />
                          )}
                          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary mb-3">
                            <Layers className="w-5 h-5" />
                          </div>
                          <span className="block font-sans text-sm font-bold text-on-surface">Tiered Event Cake</span>
                          <span className="text-xs text-on-surface-variant">Multi-level landmark confections. Starting at R180.00</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Dimensions select */}
                      <div className="space-y-3">
                        <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Dimensions (Servings)</label>
                        <select
                          value={formData.cakeSize}
                          onChange={(e: any) => setFormData({ ...formData, cakeSize: e.target.value })}
                          className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        >
                          <option value='6" Petite (4-6 guests)'>6" Petite (4-6 guests)</option>
                          <option value='8" Standard (10-12 guests)'>8" Standard (10-12 guests)</option>
                          <option value='10" Grand (15-20 guests)'>10" Grand (15-20 guests)</option>
                          <option value='Custom Tiered (30+ guests)'>Custom Tiered (30+ guests)</option>
                        </select>
                      </div>

                      {/* Event Date picker */}
                      <div className="space-y-3">
                        <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Event Date</label>
                        <input
                          type="date"
                          value={formData.eventDate}
                          onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                          className={`w-full bg-surface border rounded-lg px-4 py-2.5 font-sans text-sm outline-none focus:border-primary ${
                            errors.eventDate ? 'border-red-400' : 'border-outline-variant'
                          }`}
                        />
                        {errors.eventDate && (
                          <p className="text-red-400 font-sans text-xs">{errors.eventDate}</p>
                        )}
                      </div>
                    </div>

                    {/* Flavors selections */}
                    <div className="space-y-3">
                      <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Flavor Profile</label>
                      <div className="flex flex-wrap gap-2.5">
                        {['Madagascar Vanilla', 'Dark Cacao & Sea Salt', 'Earl Grey & Lavender', 'Pistachio Rose'].map((flv) => (
                          <button
                            type="button"
                            key={flv}
                            onClick={() => setFormData({ ...formData, flavor: flv })}
                            className={`px-4.5 py-2.5 rounded-full font-sans text-xs font-bold transition-all border ${
                              formData.flavor === flv
                                ? 'bg-primary text-white border-primary shadow-sm'
                                : 'bg-surface text-on-surface border-outline-variant hover:border-primary'
                            }`}
                          >
                            {flv}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Frosting Selections */}
                    <div className="space-y-3">
                      <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Frosting Style</label>
                      <div className="flex flex-wrap gap-2.5">
                        {['Swiss Meringue', 'Velvet Ganache', 'Rustic Nude'].map((fst) => (
                          <button
                            type="button"
                            key={fst}
                            onClick={() => setFormData({ ...formData, frosting: fst })}
                            className={`px-4.5 py-2.5 rounded-full font-sans text-xs font-bold transition-all border ${
                              formData.frosting === fst
                                ? 'bg-primary text-white border-primary shadow-sm'
                                : 'bg-surface text-on-surface border-outline-variant hover:border-primary'
                            }`}
                          >
                            {fst}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity selectors */}
                    <div className="space-y-3">
                      <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Quantity</label>
                      <div className="flex items-center gap-4 bg-surface border border-outline-variant rounded-lg w-fit px-2 py-1">
                        <button
                          type="button"
                          onClick={() => setFormData((fd) => ({ ...fd, quantity: Math.max(1, fd.quantity - 1) }))}
                          className="p-2 hover:text-primary transition-colors text-on-surface-variant"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-sans text-sm font-bold">{formData.quantity}</span>
                        <button
                          type="button"
                          onClick={() => setFormData((fd) => ({ ...fd, quantity: fd.quantity + 1 }))}
                          className="p-2 hover:text-primary transition-colors text-on-surface-variant"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="pt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="bg-on-background text-background px-8 py-4 rounded font-sans text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors flex items-center gap-2"
                      >
                        Continue to Flourishes
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </motion.section>
                )}

                {/* STEP 2: Flourishes (Add-ons) */}
                {step === 2 && (
                  <motion.section
                    key="step2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="font-serif text-2xl text-on-surface font-semibold">Artisanal Flourishes</h3>
                      <p className="font-sans text-xs text-on-surface-variant">Elevate your celebration centerpiece with curated additions.</p>
                    </div>

                    {/* Add-on Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      
                      {/* Add-on 1: Floral & Gold */}
                      <div 
                        onClick={() => setFormData({ ...formData, addonFloralGold: !formData.addonFloralGold })}
                        className={`rounded-xl overflow-hidden flex flex-col group cursor-pointer border-2 shadow-sm transition-all bg-surface ${
                          formData.addonFloralGold ? 'border-primary shadow-md' : 'border-outline-variant/30'
                        }`}
                      >
                        <div className="aspect-square relative overflow-hidden bg-surface-container-high">
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZRh-lTYsTTxduNgpGY7CZ-darJZfTKw6WoKS6b36_FVYOuBjWLSlFwm8SHPHWygQk-5pbs4D7JY0CxvSNgCSmOv1MDCxdTGNh4aFBT8WWM0HmOkgOrTPhERll3yj2C71Pb1bxXxa_2Gm4UaSI3VwDewTRrGS3qLG-j5D1k8mDcQHZC5g2r-6DhImDuTDR5Timq-i8-edryVUDtleJYrSor5H0XmfGrIrUWxKpvIYEvuSc9KOgTuLgorjhNwW3oYbbm4xd5zV2f0g"
                            alt="Floral & Gold Leaf decoration"
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 right-3">
                            <span className={`w-7 h-7 rounded-full flex items-center justify-center border shadow-sm ${
                              formData.addonFloralGold ? 'bg-primary text-white border-primary' : 'bg-white/85 text-outline border-outline-variant/30'
                            }`}>
                              <Check className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-sans text-xs font-bold text-on-surface uppercase">Floral &amp; Gold Leaf</h4>
                            <p className="text-[10px] text-on-surface-variant mt-1 leading-relaxed">
                              Organic pressed flowers and shimmer layers of 24k gold leaf.
                            </p>
                          </div>
                          <span className="block font-sans text-xs font-bold text-primary mt-3">+${prices.addons.floralGold.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Add-on 2: Cupcakes */}
                      <div 
                        onClick={() => setFormData({ ...formData, addonCupcakes: !formData.addonCupcakes })}
                        className={`rounded-xl overflow-hidden flex flex-col group cursor-pointer border-2 shadow-sm transition-all bg-surface ${
                          formData.addonCupcakes ? 'border-primary shadow-md' : 'border-outline-variant/30'
                        }`}
                      >
                        <div className="aspect-square relative overflow-hidden bg-surface-container-high">
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuADUVR9K4Ig3kHfG292Fxjs3Bk4-M8MTxCkrbdQJBp9qIhTnHASYTH7rvgQ8lsee0LFBwKZ-LL2mOb5gYUDxVPSHS1OU0Dj54SbgFwJWKeDvGCyEutax9WFa_yqC3HBHBB05_q__aNyoiVwkg8cq3OWG97_rWZMRcftmmlEf8imnqE8jkWy9oMwEF7l2qWL4yEu_Li1ePZoVo8KD8-LxvbIHCN2q2u3fUSkGxDTbM7XqWLfybpkQ-5tOe9KkWsL_ISIAzyGdMn5wsA"
                            alt="Box of 6 gourmet cupcakes"
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 right-3">
                            <span className={`w-7 h-7 rounded-full flex items-center justify-center border shadow-sm ${
                              formData.addonCupcakes ? 'bg-primary text-white border-primary' : 'bg-white/85 text-outline border-outline-variant/30'
                            }`}>
                              <Check className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-sans text-xs font-bold text-on-surface uppercase">Artisan Cupcakes (6)</h4>
                            <p className="text-[10px] text-on-surface-variant mt-1 leading-relaxed">
                              Matching vanilla cupcakes to complete your party dessert spread.
                            </p>
                          </div>
                          <span className="block font-sans text-xs font-bold text-primary mt-3">+${prices.addons.cupcakes.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Add-on 3: Calligraphy Message */}
                      <div 
                        onClick={() => setFormData({ ...formData, addonCalligraphy: !formData.addonCalligraphy })}
                        className={`rounded-xl overflow-hidden flex flex-col group cursor-pointer border-2 shadow-sm transition-all bg-surface ${
                          formData.addonCalligraphy ? 'border-primary shadow-md' : 'border-outline-variant/30'
                        }`}
                      >
                        <div className="aspect-square relative overflow-hidden bg-surface-container-high">
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcy9qyTpxd4fEfjR75VNlz05663NetrmfqYvZA-DyKAZXSCwQCwmmqC954saf51kyHrFDxh7SwycOg5Xe4m9-iIvzrUeThW6kGNlOWNJxIud-raxrxhtXQ5_BVGp_YwPcPFokIGqfFxh00G-z5GvafrBkJ1ExPxMgwJPcvsGjtCK864OUasbjFtlq3HHb2uBBnxE8r0-e5p0TXZSTJU2_v9SicQK1EfRrAWzWnHsXnR6ylipTFu5gRoyto8-XMcqRdbJfoIJbOTPI"
                            alt="Calligraphy Plaque Script"
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 right-3">
                            <span className={`w-7 h-7 rounded-full flex items-center justify-center border shadow-sm ${
                              formData.addonCalligraphy ? 'bg-primary text-white border-primary' : 'bg-white/85 text-outline border-outline-variant/30'
                            }`}>
                              <Check className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-sans text-xs font-bold text-on-surface uppercase">Calligraphy Plaque</h4>
                            <p className="text-[10px] text-on-surface-variant mt-1 leading-relaxed">
                              Dark chocolate handwritten script message plaque.
                            </p>
                          </div>
                          <span className="block font-sans text-xs font-bold text-primary mt-3">+${prices.addons.calligraphy.toFixed(2)}</span>
                        </div>
                      </div>

                    </div>

                    {/* Calligraphy message content input */}
                    {formData.addonCalligraphy && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3"
                      >
                        <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Calligraphy Text</label>
                        <input
                          type="text"
                          maxLength={30}
                          value={formData.calligraphyMessage}
                          onChange={(e) => setFormData({ ...formData, calligraphyMessage: e.target.value })}
                          placeholder="e.g. Happy Birthday Eleanor! (max 30 chars)"
                          className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm outline-none focus:border-primary"
                        />
                      </motion.div>
                    )}

                    <div className="space-y-3 pt-2">
                      <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Special Custom Requests</label>
                      <textarea
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                        placeholder="Write allergy warnings, minor frosting adjustments, or decoration details here..."
                        className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-4 font-sans text-sm outline-none focus:border-primary h-28"
                      ></textarea>
                    </div>

                    <div className="pt-6 flex justify-between">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="border border-outline px-6 py-4 rounded font-sans text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-colors flex items-center gap-2 text-on-surface-variant"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Selection
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="bg-on-background text-background px-8 py-4 rounded font-sans text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors flex items-center gap-2"
                      >
                        Continue to Details
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </motion.section>
                )}

                {/* STEP 3: Contact & Vision */}
                {step === 3 && (
                  <motion.section
                    key="step3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="font-serif text-2xl text-on-surface font-semibold">Delivery &amp; Contact Details</h3>
                      <p className="font-sans text-xs text-on-surface-variant">Provide the contact information and visual inspiration for confirmation.</p>
                    </div>

                    {/* Inspiration image upload */}
                    <div className="space-y-3">
                      <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Inspiration Sketch / Image</label>
                      
                      {!formData.inspirationPreviewUrl ? (
                        <div className="border-2 border-dashed border-outline-variant/60 rounded-xl p-8 text-center bg-surface hover:border-primary transition-all relative flex flex-col items-center justify-center cursor-pointer group">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          <Upload className="w-8 h-8 text-outline group-hover:text-primary transition-colors mb-3" />
                          <p className="font-sans text-sm font-bold text-on-surface">Upload Inspiration Photo</p>
                          <p className="text-xs text-on-surface-variant mt-1">Drag and drop or browse files (JPG, PNG. Max 5MB)</p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4 p-4 border border-outline-variant rounded-xl bg-surface-container-low">
                          <div className="w-20 h-20 rounded-lg overflow-hidden border border-outline-variant shrink-0">
                            <img
                              src={formData.inspirationPreviewUrl}
                              alt="Inspiration Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-sans text-xs font-bold truncate text-on-surface">
                              {formData.inspirationImage?.name}
                            </p>
                            <p className="text-[10px] text-outline mt-0.5">
                              {formData.inspirationImage && (formData.inspirationImage.size / (1024 * 1024)).toFixed(2)} MB
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
                      {errors.inspirationImage && (
                        <p className="text-red-400 font-sans text-xs mt-1">{errors.inspirationImage}</p>
                      )}
                    </div>

                    {/* Name, Email, Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2.5">
                        <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Full Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full bg-surface border rounded-lg px-4 py-3 font-sans text-sm outline-none focus:border-primary ${
                            errors.name ? 'border-red-400' : 'border-outline-variant'
                          }`}
                          placeholder="e.g. Jane Doe"
                        />
                        {errors.name && <p className="text-red-400 font-sans text-xs">{errors.name}</p>}
                      </div>

                      <div className="space-y-2.5">
                        <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Email Address</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full bg-surface border rounded-lg px-4 py-3 font-sans text-sm outline-none focus:border-primary ${
                            errors.email ? 'border-red-400' : 'border-outline-variant'
                          }`}
                          placeholder="hello@address.com"
                        />
                        {errors.email && <p className="text-red-400 font-sans text-xs">{errors.email}</p>}
                      </div>

                      <div className="space-y-2.5">
                        <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full bg-surface border rounded-lg px-4 py-3 font-sans text-sm outline-none focus:border-primary ${
                            errors.phone ? 'border-red-400' : 'border-outline-variant'
                          }`}
                          placeholder="+1 (212) 555-0198"
                        />
                        {errors.phone && <p className="text-red-400 font-sans text-xs">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Delivery vs. Pickup choice */}
                    <div className="space-y-4 pt-2">
                      <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Fulfillment Method</label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer font-sans text-sm">
                          <input
                            type="radio"
                            name="fulfillment"
                            checked={formData.deliveryMethod === 'pickup'}
                            onChange={() => setFormData({ ...formData, deliveryMethod: 'pickup' })}
                            className="text-primary focus:ring-primary w-4 h-4"
                          />
                          <span>Atelier Pickup (Free)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer font-sans text-sm">
                          <input
                            type="radio"
                            name="fulfillment"
                            checked={formData.deliveryMethod === 'delivery'}
                            onChange={() => setFormData({ ...formData, deliveryMethod: 'delivery' })}
                            className="text-primary focus:ring-primary w-4 h-4"
                          />
                          <span>White-Glove Local Delivery (+${prices.delivery.toFixed(2)})</span>
                        </label>
                      </div>
                    </div>

                    {/* Delivery Address if active */}
                    {formData.deliveryMethod === 'delivery' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2.5"
                      >
                        <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Delivery Address</label>
                        <input
                          type="text"
                          value={formData.deliveryAddress}
                          onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                          className={`w-full bg-surface border rounded-lg px-4 py-3 font-sans text-sm outline-none focus:border-primary ${
                            errors.deliveryAddress ? 'border-red-400' : 'border-outline-variant'
                          }`}
                          placeholder="Street Address, Suite/Apt, City, State, ZIP"
                        />
                        {errors.deliveryAddress && (
                          <p className="text-red-400 font-sans text-xs">{errors.deliveryAddress}</p>
                        )}
                      </motion.div>
                    )}

                    <div className="space-y-3">
                      <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-outline">Order Notes</label>
                      <textarea
                        value={formData.orderNotes}
                        onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                        placeholder="Additional notes about delivery schedules, drop-off coordinators, or celebration context..."
                        className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm outline-none focus:border-primary h-24"
                      ></textarea>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="pt-6 flex justify-between">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="border border-outline px-6 py-4 rounded font-sans text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-colors flex items-center gap-2 text-on-surface-variant"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Flourishes
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary text-white hover:bg-on-background px-8 py-4 rounded font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting Quote...
                          </>
                        ) : (
                          <>
                            Submit Order Request
                            <Check className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                  </motion.section>
                )}

              </AnimatePresence>

            </form>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="glass-panel p-6 md:p-8 rounded-xl relative overflow-hidden border border-outline-variant/20 shadow-xl bg-surface">
              {/* Decorative gold backdrop element */}
              <div className="absolute -right-10 -top-10 w-28 h-28 bg-primary/5 rounded-full blur-2xl"></div>
              
              <h3 className="font-serif text-xl font-bold mb-6 flex items-center justify-between">
                <span>Order Preview</span>
                <span className="text-[9px] font-sans font-bold bg-primary-container text-on-primary-container px-2 py-0.5 rounded tracking-widest">
                  ESTIMATE
                </span>
              </h3>

              {/* Estimate Items list */}
              <div className="space-y-4 border-b border-outline-variant/25 pb-6 mb-6 font-sans text-xs text-on-surface-variant">
                
                {/* Cake Base */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-on-surface">{formData.cakeType} Cake</p>
                    <p className="text-[10px] text-outline mt-0.5">
                      {formData.cakeSize.split(' (')[0]} • {formData.flavor}
                    </p>
                  </div>
                  <span className="font-bold text-on-surface">
                    ${(formData.cakeType === 'Tiered Event' ? prices.baseTiered : prices.baseSignature).toFixed(2)}
                  </span>
                </div>

                {/* Size Surcharge */}
                {prices.sizeSurcharges[formData.cakeSize] > 0 && (
                  <div className="flex justify-between items-center">
                    <p>Size Surcharge</p>
                    <span>+${prices.sizeSurcharges[formData.cakeSize].toFixed(2)}</span>
                  </div>
                )}

                {/* Frosting Upgrade */}
                {prices.frostingSurcharges[formData.frosting as keyof typeof prices.frostingSurcharges] > 0 && (
                  <div className="flex justify-between items-center">
                    <p>Frosting Upgrade ({formData.frosting})</p>
                    <span>+${prices.frostingSurcharges[formData.frosting as keyof typeof prices.frostingSurcharges].toFixed(2)}</span>
                  </div>
                )}

                {/* Quantity */}
                {formData.quantity > 1 && (
                  <div className="flex justify-between items-center italic text-primary">
                    <p>Quantity Multiplier</p>
                    <span>x{formData.quantity}</span>
                  </div>
                )}

                {/* Addons */}
                {(formData.addonFloralGold || formData.addonCupcakes || formData.addonCalligraphy) && (
                  <div className="space-y-2 pt-2 border-t border-outline-variant/10">
                    <p className="font-bold text-[10px] text-outline uppercase tracking-wider">Flourishes</p>
                    {formData.addonFloralGold && (
                      <div className="flex justify-between items-center text-[11px]">
                        <p>Floral &amp; Gold decoration</p>
                        <span>+${prices.addons.floralGold.toFixed(2)}</span>
                      </div>
                    )}
                    {formData.addonCupcakes && (
                      <div className="flex justify-between items-center text-[11px]">
                        <p>Matching Cupcakes (6)</p>
                        <span>+${prices.addons.cupcakes.toFixed(2)}</span>
                      </div>
                    )}
                    {formData.addonCalligraphy && (
                      <div className="flex justify-between items-center text-[11px]">
                        <p>Hand-written Calligraphy</p>
                        <span>+${prices.addons.calligraphy.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Shipping */}
                {formData.deliveryMethod === 'delivery' && (
                  <div className="flex justify-between items-center pt-2 border-t border-outline-variant/10">
                    <p className="text-primary font-bold">White-Glove Shipping</p>
                    <span className="text-primary font-bold">+${prices.delivery.toFixed(2)}</span>
                  </div>
                )}

              </div>

              {/* Total display */}
              <div className="space-y-2 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-outline uppercase tracking-widest text-[10px] font-bold">Estimated Total</span>
                  <span className="font-serif text-3xl font-bold text-primary">
                    ${calculateSubtotal().toFixed(2)}
                  </span>
                </div>
                <p className="text-[10px] text-outline text-right italic">
                  *Final quote will be verified by Beatrice within 2 hours
                </p>
              </div>

              {/* Security info */}
              <div className="border-t border-outline-variant/20 pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-primary-container/20">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbyr8sB0668SjJFFPH0VwbyjFe31YsFeHU90RARi4Y3T1lyVt1s6a9lqOQ1iNv3-zIU4aWw04gJmYyzY4oTDbIpO0aXShzlsjl-tln7s1EbBwK02lwiYd5HRyKpr59pcWw0FoXjw9DJF1N9MWuFKvmhYTApVBezk1amAnNBKvVI59leujWYqMbI49YPQ-pI-a7lJxXphOXxxuybtmdy2K8sWceo2wDJgqjZSeyB7mXYKMIPYsk1uS-MJeAffjEP53468J3VbsOCPQ" 
                      alt="Concierge Beatrice"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-sans text-[9px] font-bold text-outline uppercase tracking-wider">Atelier Concierge</span>
                    <p className="font-sans text-xs italic text-on-surface">"I will personally review your layout sketches." — Beatrice</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-surface-container-low p-3 rounded text-[10px] leading-relaxed text-on-surface-variant border border-outline-variant/10">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    Baking strictly from scratch with fresh local organic products. Fully refundable up to 72 hours before booking.
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

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
              className="bg-background text-on-background max-w-md w-full p-8 rounded-xl text-center space-y-6 border border-outline-variant/30 shadow-2xl relative"
            >
              <div className="w-16 h-16 rounded-full bg-primary-container/20 text-primary flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-on-surface">Order Request Submitted!</h3>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Thank you, <span className="font-bold text-on-surface">{formData.name}</span>. We have logged your request. Beatrice is checking ingredients and scheduler slots and will email you the design blueprint confirmation within 2 hours.
                </p>
              </div>

              <div className="bg-surface-container-low p-4 rounded text-left border border-outline-variant/10 text-xs">
                <p className="font-bold mb-1 text-on-surface text-center">Summary Log</p>
                <div className="flex justify-between py-1 border-b border-outline-variant/10">
                  <span>Confection Type:</span>
                  <span className="font-semibold text-on-surface">{formData.cakeType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-outline-variant/10">
                  <span>Flavor / Frosting:</span>
                  <span className="font-semibold text-on-surface">{formData.flavor} • {formData.frosting}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Estimated total:</span>
                  <span className="font-semibold text-primary">${calculateSubtotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    eventDate: '',
                    cakeType: 'Signature Layer',
                    cakeSize: '10" Grand (15-20 guests)',
                    flavor: 'Madagascar Vanilla',
                    frosting: 'Swiss Meringue',
                    quantity: 1,
                    specialRequests: '',
                    deliveryMethod: 'delivery',
                    deliveryAddress: '',
                    inspirationImage: null,
                    inspirationPreviewUrl: '',
                    orderNotes: '',
                    addonFloralGold: false,
                    addonCupcakes: false,
                    addonCalligraphy: false,
                    calligraphyMessage: ''
                  });
                  setStep(1);
                }}
                className="w-full bg-on-background text-background py-3.5 rounded font-sans text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors"
              >
                Dismiss &amp; Back to Form
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
