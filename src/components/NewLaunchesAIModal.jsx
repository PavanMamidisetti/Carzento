import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Bot,
  Zap,
  X,
  Send,
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Tag,
  Gauge,
  Fuel,
  Cpu,
  Star,
  Search,
} from 'lucide-react';
import { INDIAN_MARKET_CARS } from '../data/indianMarketCars';

/**
 * Newly Launched Cars in the Indian Market with AI Market Intelligence
 */
const NEW_LAUNCHES_DATA = [
  {
    carId: 'tata-curvv',
    name: 'Tata Curvv',
    brand: 'Tata Motors',
    category: 'SUV Coupe',
    launchDate: 'Latest 2025/2026 Launch',
    price: '₹10.00 - 19.00 Lakh',
    fuel: 'Petrol / Diesel',
    mileage: '15.0 - 20.0 kmpl',
    aiScore: '9.4/10',
    aiBadge: 'Trendsetter Disrupter',
    aiVerdict:
      'India’s first mass-market coupe SUV. Disrupts the segment with flush aerodynamic door handles, 500L boot space, high ground clearance (208mm), and segment-first Hyperion Turbo GDi with Level 2 ADAS.',
    aiKeyStrengths: ['5-Star Bharat NCAP Rating', 'Coupe Styling', '20 Level 2 ADAS Features'],
    aiTargetAudience: 'Buyers seeking sporty European coupe design with rugged SUV capability and top-tier safety.',
  },
  {
    carId: 'maruti-dzire',
    name: 'Maruti Suzuki Dzire (All-New Gen)',
    brand: 'Maruti Suzuki',
    category: 'Sedan',
    launchDate: 'Brand New Generation',
    price: '₹6.79 - 10.14 Lakh',
    fuel: 'Petrol / CNG',
    mileage: '24.79 - 33.73 km/kg',
    aiScore: '9.6/10',
    aiBadge: 'Safety & Efficiency Benchmark',
    aiVerdict:
      'Historic leap for Maruti Suzuki: achieves a flawless 5-Star Global NCAP rating with 6 standard airbags. Introduces a segment-first electric sunroof, 360-degree camera, and class-leading 33.73 km/kg CNG economy.',
    aiKeyStrengths: ['5-Star Global NCAP', 'Segment-First Sunroof', '33.73 km/kg CNG Mileage'],
    aiTargetAudience: 'Families, daily commuters, and professionals wanting maximum fuel economy with zero compromise on safety.',
  },
  {
    carId: 'mahindra-xuv-3xo',
    name: 'Mahindra XUV 3XO',
    brand: 'Mahindra',
    category: 'Compact SUV',
    launchDate: 'Brand New Launch',
    price: '₹7.49 - 15.49 Lakh',
    fuel: 'Petrol / Diesel',
    mileage: '18.06 - 21.20 kmpl',
    aiScore: '9.3/10',
    aiBadge: 'Best Tech & Panoramic Roof',
    aiVerdict:
      'Completely rewrites sub-compact SUV expectations by offering a segment-first Panoramic Skyroof, 130 PS direct injection engine, dual-zone climate control, and full Level 2 ADAS suite.',
    aiKeyStrengths: ['Panoramic Skyroof', '130 PS Turbo Performance', 'Level 2 ADAS Radar/Camera'],
    aiTargetAudience: 'Enthusiasts desiring hot-hatch acceleration, big-car luxury tech, and commanding road presence.',
  },
  {
    carId: 'mg-windsor-ev',
    name: 'MG Windsor EV',
    brand: 'MG Motor',
    category: 'EV',
    launchDate: 'Recent EV Disrupter',
    price: '₹13.50 - 15.50 Lakh',
    fuel: 'Electric',
    mileage: '331 km per charge',
    aiScore: '9.1/10',
    aiBadge: 'Luxury Aero-Lounge',
    aiVerdict:
      'Transforms EV travel with business-class 135° reclining rear Aero Lounge seats, a massive 15.6-inch GrandView cinema display, 604-litre boot, and accessible Battery-as-a-Service (BaaS) ownership.',
    aiKeyStrengths: ['135° Reclining Lounge Seats', '15.6-inch Screen', '604 Litre Trunk'],
    aiTargetAudience: 'Chauffeur-driven executives and tech-forward families looking for pure comfort and low running costs.',
  },
  {
    carId: 'hyundai-creta',
    name: 'Hyundai Creta (New Facelift)',
    brand: 'Hyundai',
    category: 'SUV',
    launchDate: 'New Generation',
    price: '₹11.00 - 20.15 Lakh',
    fuel: 'Petrol / Diesel',
    mileage: '17.4 - 21.8 kmpl',
    aiScore: '9.5/10',
    aiBadge: 'Segment Market Leader',
    aiVerdict:
      'The undisputed king of compact SUVs upgraded with 19 Level 2 ADAS functions, dual 10.25-inch curved display, Bose 8-speaker audio, and refined 1.5L Turbo petrol offering 160 PS power.',
    aiKeyStrengths: ['19 Level 2 ADAS Suite', 'Dual Connected Displays', 'Proven Resale Value'],
    aiTargetAudience: 'Universal buyers wanting the most complete, reliable, and feature-loaded SUV in India.',
  },
  {
    carId: 'tata-safari',
    name: 'Tata Safari (New Facelift)',
    brand: 'Tata Motors',
    category: 'SUV',
    launchDate: 'New Flagship Generation',
    price: '₹16.19 - 27.34 Lakh',
    fuel: 'Diesel',
    mileage: '14.5 - 16.3 kmpl',
    aiScore: '9.2/10',
    aiBadge: 'Safest 7-Seater in India',
    aiVerdict:
      'Rated as the safest vehicle ever tested by Bharat NCAP with record-breaking scores. Features gesture-controlled smart tailgate, ventilated 1st and 2nd row captain chairs, and full ADAS Level 2.',
    aiKeyStrengths: ['Highest Bharat NCAP Score', 'Ventilated 2nd-Row Captain Seats', 'Gesture Power Tailgate'],
    aiTargetAudience: 'Large families needing uncompromised highway safety, expansive space, and luxury cruiser comfort.',
  },
];

const PRESET_AI_QUERIES = [
  'Best new launch under ₹12 Lakh',
  'Tata Curvv vs Mahindra XUV 3XO',
  'Which new launch has highest mileage?',
  'Top new electric car launch',
];

/**
 * Intelligent AI Answer Generator based on Indian Market Launches
 */
function generateAIResponse(query) {
  const q = query.toLowerCase().trim();

  if (q.includes('under') && (q.includes('12') || q.includes('10'))) {
    return {
      text: 'Based on price-to-value AI matrix analysis, the top newly launched cars under ₹12 Lakh are the **Maruti Suzuki Dzire (All-New)** (₹6.79 - 10.14 L) with certified 5-Star safety and 33.73 km/kg mileage, and the **Mahindra XUV 3XO** (from ₹7.49 L) with segment-first Panoramic Skyroof and Level 2 ADAS.',
      recommendedCarId: 'maruti-dzire',
    };
  }

  if (q.includes('curvv') || (q.includes('vs') && q.includes('3xo'))) {
    return {
      text: 'AI Comparative Verdict: The **Tata Curvv** wins on boot space (500L), high ground clearance (208mm), and distinctive coupe styling. The **Mahindra XUV 3XO** wins on accessible entry pricing (starts at ₹7.49 L), panoramic skyroof, and raw 130 PS TGDi power output.',
      recommendedCarId: 'tata-curvv',
    };
  }

  if (q.includes('mileage') || q.includes('fuel') || q.includes('cng')) {
    return {
      text: 'The AI Mileage Champion among new launches is the **All-New Maruti Suzuki Dzire**, delivering an unprecedented **33.73 km/kg** in CNG mode and **25.71 kmpl** in petrol AGS mode, making it the most fuel-efficient sedan in India.',
      recommendedCarId: 'maruti-dzire',
    };
  }

  if (q.includes('electric') || q.includes('ev') || q.includes('battery')) {
    return {
      text: 'The most disruptive new electric launch is the **MG Windsor EV** (₹13.50 - 15.50 Lakh). AI highlights its unique 135° reclining rear Aero Lounge seats, 15.6-inch GrandView screen, and 331 km real-world range.',
      recommendedCarId: 'mg-windsor-ev',
    };
  }

  return {
    text: `AI Market Synthesis: For "${query}", the Indian market's newest launches showcase a huge push into 5-Star Global/Bharat NCAP safety, Level 2 ADAS, and connected screens. Explore our AI-curated vehicles below for detailed specifications and variant pricing.`,
    recommendedCarId: null,
  };
}

/**
 * NewLaunchesAIModal — Interactive AI-powered newly launched cars explorer.
 * Strictly image-free with background scroll lock.
 */
export default function NewLaunchesAIModal({ isOpen, onClose, onSelectCar }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [userQuery, setUserQuery] = useState('');
  const [aiMessage, setAiMessage] = useState({
    text: 'Hello! I am your AI Car Launch Assistant. I continuously evaluate new 2025-2026 car launches in India across safety, pricing, tech disruption, and real-world fuel economy. Click any launch below to inspect specifications and variant prices, or ask me a question!',
    recommendedCarId: null,
  });
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Prevent background scrolling
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendQuery = (textToSend) => {
    const query = (textToSend || userQuery).trim();
    if (!query) return;

    setUserQuery(query);
    setIsAiThinking(true);

    setTimeout(() => {
      const response = generateAIResponse(query);
      setAiMessage(response);
      setIsAiThinking(false);
    }, 450);
  };

  const handleOpenCarSpecs = (carId) => {
    const matched = INDIAN_MARKET_CARS.find((c) => c.id === carId || c.name.toLowerCase().includes(carId.toLowerCase()));
    if (matched && onSelectCar) {
      onSelectCar(matched);
      onClose();
    }
  };

  const filteredLaunches =
    activeCategory === 'All'
      ? NEW_LAUNCHES_DATA
      : activeCategory === 'EVs'
      ? NEW_LAUNCHES_DATA.filter((c) => c.fuel.includes('Electric'))
      : activeCategory === 'Under ₹12 Lakh'
      ? NEW_LAUNCHES_DATA.filter((c) => {
          const match = c.price.match(/₹([\d.]+)/);
          return match ? parseFloat(match[1]) < 12.0 : true;
        })
      : NEW_LAUNCHES_DATA.filter((c) => c.category.includes(activeCategory));

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overscroll-contain"
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window — Strictly NO IMAGES */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col"
          style={{
            background: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* ─── Header: AI Intelligence Badge & Title ─── */}
          <div
            className="p-5 sm:p-6 border-b shrink-0"
            style={{
              background: 'linear-gradient(180deg, rgba(30, 165, 153, 0.12) 0%, transparent 100%)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider"
                    style={{
                      background: 'rgba(30, 165, 153, 0.18)',
                      color: 'var(--color-teal)',
                      border: '1px solid rgba(30, 165, 153, 0.35)',
                    }}
                  >
                    <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                    <span>AI Market Intelligence</span>
                  </span>
                  <span
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-md"
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    2025 - 2026 Launches
                  </span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2"
                  style={{ color: 'var(--color-text)' }}
                >
                  <span>New Car Launches in India</span>
                </h2>
                <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                  Evaluated with AI Launch Disruption Scores, competitive verdicts, and verified specs.
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl transition-colors cursor-pointer shrink-0"
                style={{
                  background: 'rgba(0, 0, 0, 0.05)',
                  color: 'var(--color-text-secondary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-text)';
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                }}
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* ─── AI Query & Recommendation Box ─── */}
            <div
              className="mt-4 p-4 rounded-xl transition-all"
              style={{
                background: 'rgba(30, 165, 153, 0.06)',
                border: '1px solid rgba(30, 165, 153, 0.25)',
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="p-2 rounded-lg shrink-0 mt-0.5"
                  style={{ background: 'var(--color-teal)', color: '#ffffff' }}
                >
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-teal)]">
                      AI Launch Analyst
                    </span>
                    {isAiThinking && (
                      <span className="text-[11px] text-neutral-400 italic">Evaluating market parameters...</span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed" style={{ color: 'var(--color-text)' }}>
                    {aiMessage.text}
                  </p>

                  {aiMessage.recommendedCarId && (
                    <div className="mt-2.5">
                      <button
                        type="button"
                        onClick={() => handleOpenCarSpecs(aiMessage.recommendedCarId)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all shadow-sm"
                        style={{
                          background: 'var(--color-teal)',
                          color: '#ffffff',
                        }}
                      >
                        <SlidersHorizontal className="h-3.5 w-3.5" />
                        <span>View Recommended Car Specs &amp; Variants &rarr;</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Interactive AI Prompt Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendQuery();
                }}
                className="mt-3 flex items-center gap-2"
              >
                <div
                  className="flex-1 flex items-center rounded-xl px-3 py-1.5"
                  style={{
                    background: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <Search className="h-3.5 w-3.5 text-neutral-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="Ask AI: e.g. Which new launch has best mileage? or Curvv vs 3XO..."
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    className="w-full bg-transparent text-xs outline-none border-none placeholder-neutral-400"
                    style={{ color: 'var(--color-text)' }}
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  style={{ background: 'var(--color-teal)', color: '#ffffff' }}
                >
                  <span>Ask AI</span>
                  <Send className="h-3 w-3" />
                </button>
              </form>

              {/* Quick AI Questions Chips */}
              <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                <span className="text-[10px] uppercase font-semibold text-neutral-400">Quick Prompts:</span>
                {PRESET_AI_QUERIES.map((query) => (
                  <button
                    key={query}
                    type="button"
                    onClick={() => handleSendQuery(query)}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--color-text-secondary)',
                      border: '1px solid var(--color-border)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-teal)';
                      e.currentTarget.style.borderColor = 'var(--color-teal)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-secondary)';
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                    }}
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Filter Pills ─── */}
          <div
            className="px-5 sm:px-6 py-3 border-b flex items-center justify-between gap-3 shrink-0 flex-wrap"
            style={{ background: 'var(--color-base)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-center gap-1.5 flex-wrap">
              {['All', 'SUVs', 'Sedans', 'EVs', 'Under ₹12 Lakh'].map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer"
                    style={{
                      background: isActive ? 'var(--color-teal)' : 'transparent',
                      color: isActive ? '#ffffff' : 'var(--color-text-secondary)',
                      border: isActive ? '1px solid var(--color-teal)' : '1px solid var(--color-border)',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            <span className="text-xs font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
              Showing {filteredLaunches.length} AI Analyzed Launches
            </span>
          </div>

          {/* ─── Scrollable Cards Grid — Strictly Text & Specs (No Images) ─── */}
          <div
            className="p-5 sm:p-6 overflow-y-auto flex-1 overscroll-contain space-y-4"
            style={{ overscrollBehavior: 'contain' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLaunches.map((car) => (
                <div
                  key={car.carId}
                  className="p-4 sm:p-5 rounded-2xl transition-all flex flex-col justify-between group"
                  style={{
                    background: 'rgba(0, 0, 0, 0.02)',
                    border: '1px solid var(--color-border)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-teal)';
                    e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(30, 165, 153, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div>
                    {/* Top Row: Brand, Category, AI Score Badge */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                            style={{ background: 'rgba(30, 165, 153, 0.1)', color: 'var(--color-teal)' }}
                          >
                            {car.brand}
                          </span>
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded"
                            style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--color-text-secondary)' }}
                          >
                            {car.category}
                          </span>
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded"
                            style={{ background: 'rgba(251, 191, 36, 0.12)', color: '#fbbf24' }}
                          >
                            {car.launchDate}
                          </span>
                        </div>
                        <h3 className="text-lg font-extrabold group-hover:text-[var(--color-teal)] transition-colors" style={{ color: 'var(--color-text)' }}>
                          {car.name}
                        </h3>
                      </div>

                      {/* AI Launch Score */}
                      <div
                        className="px-2.5 py-1.5 rounded-xl text-center shrink-0"
                        style={{
                          background: 'rgba(30, 165, 153, 0.12)',
                          border: '1px solid rgba(30, 165, 153, 0.3)',
                        }}
                      >
                        <span className="block text-[9px] uppercase font-bold text-neutral-400">AI Score</span>
                        <span className="text-sm font-black text-[var(--color-teal)]">{car.aiScore}</span>
                      </div>
                    </div>

                    {/* Price and Mileage Metrics */}
                    <div className="flex items-center justify-between gap-2 my-2.5 p-2 rounded-xl text-xs" style={{ background: 'rgba(0, 0, 0, 0.03)', border: '1px solid var(--color-border)' }}>
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-neutral-400 block">Ex-Showroom Price</span>
                        <span className="font-extrabold text-[var(--color-teal)] text-sm">{car.price}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-semibold text-neutral-400 block">Economy / Range</span>
                        <span className="font-bold text-white text-xs">{car.mileage}</span>
                      </div>
                    </div>

                    {/* AI Launch Verdict */}
                    <div
                      className="p-3 rounded-xl my-2.5 text-xs leading-relaxed"
                      style={{
                        background: 'rgba(30, 165, 153, 0.04)',
                        border: '1px dashed rgba(30, 165, 153, 0.25)',
                      }}
                    >
                      <div className="flex items-center gap-1.5 font-bold text-[var(--color-teal)] mb-1">
                        <Cpu className="h-3.5 w-3.5" />
                        <span>AI Disruption Verdict:</span>
                      </div>
                      <p style={{ color: 'var(--color-text)' }}>{car.aiVerdict}</p>
                    </div>

                    {/* AI Key Strengths */}
                    <div className="flex items-center gap-1.5 flex-wrap my-2">
                      {car.aiKeyStrengths.map((strength) => (
                        <span
                          key={strength}
                          className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md"
                          style={{
                            background: 'rgba(255, 255, 255, 0.04)',
                            color: 'var(--color-text-secondary)',
                            border: '1px solid var(--color-border)',
                          }}
                        >
                          <ShieldCheck className="h-3 w-3 text-[var(--color-teal)]" />
                          <span>{strength}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action: View Specifications & Variants */}
                  <div className="pt-3 mt-2 border-t flex items-center justify-between gap-2" style={{ borderColor: 'var(--color-border)' }}>
                    <span className="text-[11px] font-medium text-neutral-400">
                      Target: {car.aiTargetAudience}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenCarSpecs(car.carId)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white cursor-pointer transition-all shadow-sm shrink-0 hover:brightness-110"
                      style={{ background: 'var(--color-teal)' }}
                    >
                      <SlidersHorizontal className="h-3.5 w-3.5" />
                      <span>Specs &amp; Variants &rarr;</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Footer ─── */}
          <div
            className="p-4 sm:p-5 border-t flex items-center justify-between gap-3 shrink-0"
            style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              <Sparkles className="h-3.5 w-3.5 text-[var(--color-teal)]" />
              <span>AI analysis synthesizes ARAI ratings, Global/Bharat NCAP crash tests &amp; market pricing.</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white transition-all cursor-pointer shadow-sm hover:brightness-110"
              style={{ background: 'var(--color-teal)' }}
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
