import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  SlidersHorizontal,
  Compass,
  Zap,
  ShieldCheck,
  Fuel,
  Users,
  ChevronRight,
  TrendingUp,
  Award,
  ArrowRight,
  Car,
} from 'lucide-react';
import { INDIAN_MARKET_CARS } from '../data/indianMarketCars';

const PREFERENCE_CATEGORIES = [
  { id: 'budget', label: 'By Budget', icon: SlidersHorizontal },
  { id: 'lifestyle', label: 'Lifestyle & Body Type', icon: Compass },
  { id: 'fuel', label: 'Fuel & Efficiency', icon: Fuel },
  { id: 'safety', label: 'Safety (5-Star NCAP)', icon: ShieldCheck },
];

export default function BuyerPreferencesSection({ onSelectCar, onOpenAIChatbot }) {
  const [activeCategory, setActiveCategory] = useState('budget');
  const [activeSubFilter, setActiveSubFilter] = useState('under_10');

  // Helper to get cars according to preference
  const getCarsForFilter = () => {
    if (activeCategory === 'budget') {
      if (activeSubFilter === 'under_10') {
        return INDIAN_MARKET_CARS.filter((c) => {
          const match = c.priceRange.match(/₹([\d.]+)/);
          return match ? parseFloat(match[1]) <= 10.5 : false;
        }).slice(0, 6);
      }
      if (activeSubFilter === '10_15') {
        return INDIAN_MARKET_CARS.filter((c) => {
          const match = c.priceRange.match(/₹([\d.]+)/);
          const p = match ? parseFloat(match[1]) : 0;
          return p > 8 && p <= 16;
        }).slice(0, 6);
      }
      if (activeSubFilter === '15_25') {
        return INDIAN_MARKET_CARS.filter((c) => {
          const match = c.priceRange.match(/₹([\d.]+)/);
          const p = match ? parseFloat(match[1]) : 0;
          return p >= 14 && p <= 26;
        }).slice(0, 6);
      }
      // 25+ Luxury
      return INDIAN_MARKET_CARS.filter((c) => {
        const match = c.priceRange.match(/₹([\d.]+)/);
        const p = match ? parseFloat(match[1]) : 0;
        return p >= 25 || c.priceRange.includes('30') || c.priceRange.includes('35');
      }).slice(0, 6);
    }

    if (activeCategory === 'lifestyle') {
      if (activeSubFilter === 'suv') {
        return INDIAN_MARKET_CARS.filter((c) => c.bodyType.includes('SUV')).slice(0, 6);
      }
      if (activeSubFilter === '7seater') {
        return INDIAN_MARKET_CARS.filter(
          (c) => c.specs?.seating?.includes('7') || c.bodyType.includes('MPV')
        ).slice(0, 6);
      }
      if (activeSubFilter === 'sedan') {
        return INDIAN_MARKET_CARS.filter((c) => c.bodyType.includes('Sedan')).slice(0, 6);
      }
      // Off-road
      return INDIAN_MARKET_CARS.filter(
        (c) => c.id.includes('thar') || c.id.includes('scorpio') || c.id.includes('fortuner')
      ).slice(0, 6);
    }

    if (activeCategory === 'fuel') {
      if (activeSubFilter === 'electric') {
        return INDIAN_MARKET_CARS.filter(
          (c) => c.fuelTypes.includes('Electric') || c.id.includes('ev')
        ).slice(0, 6);
      }
      if (activeSubFilter === 'hybrid') {
        return INDIAN_MARKET_CARS.filter(
          (c) => c.fuelTypes.includes('Hybrid') || c.id.includes('hycross') || c.id.includes('vitara')
        ).slice(0, 6);
      }
      if (activeSubFilter === 'cng') {
        return INDIAN_MARKET_CARS.filter(
          (c) => c.fuelTypes.includes('CNG') || c.id.includes('punch') || c.id.includes('dzire')
        ).slice(0, 6);
      }
      // Diesel Highway
      return INDIAN_MARKET_CARS.filter((c) => c.fuelTypes.includes('Diesel')).slice(0, 6);
    }

    // Safety
    return INDIAN_MARKET_CARS.filter((c) => c.specs?.safety?.includes('5-Star')).slice(0, 6);
  };

  const currentCars = getCarsForFilter();

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden">
      {/* Subtle Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(30, 165, 153, 0.25) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-white"
                style={{ background: 'var(--color-teal)' }}
              >
                Smart Matchmaker
              </span>
              <span className="text-xs font-semibold text-neutral-400">
                Personalized Vehicle Discovery
              </span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-black tracking-tight"
              style={{ color: 'var(--color-text)' }}
            >
              Explore Vehicles by Buyer Preference
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
              Whether optimizing for monthly budget, family passenger capacity, 5-Star crash safety, or zero-emission electric mobility, evaluate top-ranked contenders verified by our automotive intelligence suite.
            </p>
          </div>

          <button
            onClick={() => onOpenAIChatbot && onOpenAIChatbot()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all cursor-pointer shadow-lg shrink-0 self-start md:self-auto hover:opacity-95 hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, var(--color-teal) 0%, #0d8a80 100%)',
              boxShadow: '0 4px 20px rgba(30, 165, 153, 0.3)',
            }}
          >
            <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
            <span>Consult AI for Custom Requirements</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ── Category Tabs ── */}
        <div className="flex items-center gap-2.5 border-b pb-3 mb-6 overflow-x-auto no-scrollbar" style={{ borderColor: 'var(--color-border)' }}>
          {PREFERENCE_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  if (cat.id === 'budget') setActiveSubFilter('under_10');
                  else if (cat.id === 'lifestyle') setActiveSubFilter('suv');
                  else if (cat.id === 'fuel') setActiveSubFilter('electric');
                  else setActiveSubFilter('all');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[var(--color-teal)] text-white shadow-md'
                    : 'bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.06] border border-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Sub-filters (Pills) ── */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 shrink-0">
            Select Criteria:
          </span>

          {activeCategory === 'budget' && (
            <>
              {[
                { id: 'under_10', label: 'Under ₹10 Lakh (Accessible Entry)' },
                { id: '10_15', label: '₹10 - 15 Lakh (Midsize Sweet Spot)' },
                { id: '15_25', label: '₹15 - 25 Lakh (Executive & ADAS)' },
                { id: '25_plus', label: '₹25+ Lakh (Premium & Luxury)' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubFilter(sub.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeSubFilter === sub.id
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold'
                      : 'bg-white/[0.02] text-neutral-400 border border-white/5 hover:border-white/10'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </>
          )}

          {activeCategory === 'lifestyle' && (
            <>
              {[
                { id: 'suv', label: 'Compact & Mid-size SUVs (High Ground Clearance)' },
                { id: '7seater', label: '7-Seater / MPVs (Large Families)' },
                { id: 'sedan', label: 'Executive Sedans (High-Speed Touring)' },
                { id: 'offroad', label: 'Authentic 4x4 Off-Road Trail' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubFilter(sub.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeSubFilter === sub.id
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold'
                      : 'bg-white/[0.02] text-neutral-400 border border-white/5 hover:border-white/10'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </>
          )}

          {activeCategory === 'fuel' && (
            <>
              {[
                { id: 'electric', label: '⚡ Pure Electric (Zero Emission)' },
                { id: 'hybrid', label: '🌿 Self-Charging Strong Hybrid (25+ kmpl)' },
                { id: 'cng', label: '⛽ Dual-Cylinder Factory CNG' },
                { id: 'diesel', label: '🚀 Heavy-Torque Diesel Highway Cruisers' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubFilter(sub.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeSubFilter === sub.id
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold'
                      : 'bg-white/[0.02] text-neutral-400 border border-white/5 hover:border-white/10'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </>
          )}

          {activeCategory === 'safety' && (
            <div className="text-xs font-bold text-emerald-400 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              Verified 5-Star Bharat NCAP &amp; Global NCAP Safety Cage Validated
            </div>
          )}
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentCars.map((car) => {
            return (
              <div
                key={car.id}
                className="rounded-2xl p-5 border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between group"
                style={{
                  background: 'var(--color-card)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider text-white"
                        style={{ background: 'var(--color-teal)' }}
                      >
                        {car.brand}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold text-neutral-400 bg-white/5">
                        {car.bodyType}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                      {car.fuelTypes.split('/')[0]}
                    </span>
                  </div>

                  {/* Car Title */}
                  <h3
                    className="text-lg font-black tracking-tight mb-2 group-hover:text-[var(--color-teal)] transition-colors"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {car.name}
                  </h3>

                  {/* Price & Mileage Pill */}
                  <div
                    className="p-3 rounded-xl grid grid-cols-2 gap-2 mb-3.5 text-xs"
                    style={{
                      background: 'rgba(0, 0, 0, 0.03)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                        Ex-Showroom Price
                      </span>
                      <span className="text-sm font-black text-[var(--color-teal)]">
                        {car.priceRange}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                        Certified Efficiency
                      </span>
                      <span className="text-xs font-bold text-neutral-200 mt-0.5 block truncate">
                        {car.specs?.mileage}
                      </span>
                    </div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-1.5 text-xs text-neutral-400 mb-4">
                    <div className="flex items-center justify-between py-1 border-b border-white/5">
                      <span>Safety Certification:</span>
                      <span className="font-semibold text-emerald-400">
                        {car.specs?.safety?.split(',')[0]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span>Luggage Capacity:</span>
                      <span className="font-semibold text-neutral-200">
                        {car.specs?.bootSpace}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t flex items-center justify-between gap-2" style={{ borderColor: 'var(--color-border)' }}>
                  <button
                    onClick={() => onSelectCar && onSelectCar(car)}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white bg-[var(--color-teal)] hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>Inspect Specs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenAIChatbot && onOpenAIChatbot()}
                    className="p-2 rounded-xl text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    title="Ask AI Chatbot about this car"
                  >
                    <Sparkles className="w-4 h-4 text-[var(--color-teal)]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
