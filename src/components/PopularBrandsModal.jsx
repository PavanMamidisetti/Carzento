import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Award,
  ChevronRight,
  ShieldCheck,
  Building2,
  Wrench,
  Car,
  Sparkles,
} from 'lucide-react';
import { INDIAN_MARKET_CARS } from '../data/indianMarketCars';

const BRANDS_DATABASE = [
  {
    name: 'Tata Motors',
    tagline: 'Connecting Aspirations & Safety Pioneers',
    country: 'India',
    established: '1945',
    serviceOutlets: '1,400+ Authorized Service Centers',
    warranty: '3 Years / 1,00,000 km Standard',
    priceBracket: '₹6.13 - 27.34 Lakh',
    keyFocus: '5-Star Bharat NCAP Safety, Advanced EV Tech, Rugged D8 OMEGA Architecture',
    highlightCars: ['Tata Curvv', 'Tata Nexon', 'Tata Harrier', 'Tata Safari', 'Tata Punch'],
    badgeColor: 'var(--color-teal)',
  },
  {
    name: 'Maruti Suzuki',
    tagline: 'Way of Life! & India’s Leading Mobility Provider',
    country: 'India / Japan',
    established: '1981',
    serviceOutlets: '4,000+ Workshops Across 1,989 Cities',
    warranty: '3 Years / 1,00,000 km Standard',
    priceBracket: '₹6.49 - 20.09 Lakh',
    keyFocus: 'Unbeatable Fuel Efficiency, Massive Resale Retention, Low Ownership Cost',
    highlightCars: ['Maruti Suzuki Dzire', 'Maruti Suzuki Swift', 'Maruti Suzuki Brezza', 'Maruti Suzuki Grand Vitara', 'Maruti Suzuki Fronx'],
    badgeColor: '#0284c7',
  },
  {
    name: 'Hyundai',
    tagline: 'New Thinking. New Possibilities.',
    country: 'South Korea',
    established: '1996 (India)',
    serviceOutlets: '1,500+ Dealerships Across India',
    warranty: '3 Years / Unlimited km',
    priceBracket: '₹6.13 - 21.55 Lakh',
    keyFocus: 'Futuristic Parametric Styling, Connected Technology, SmartSense Level 2 ADAS',
    highlightCars: ['Hyundai Creta', 'Hyundai Venue', 'Hyundai Verna', 'Hyundai i20', 'Hyundai Exter'],
    badgeColor: '#2563eb',
  },
  {
    name: 'Mahindra',
    tagline: 'Rise & The Authentic Indian SUV Maker',
    country: 'India',
    established: '1945',
    serviceOutlets: '1,200+ Sales & Service Touchpoints',
    warranty: '3 Years / 1,00,000 km',
    priceBracket: '₹7.49 - 26.99 Lakh',
    keyFocus: 'Commanding High Seating, Authentic 4x4 Off-Road Capabilities, mHawk & mStallion Engines',
    highlightCars: ['Mahindra Thar', 'Mahindra Scorpio-N', 'Mahindra XUV700', 'Mahindra XUV 3XO'],
    badgeColor: '#dc2626',
  },
  {
    name: 'Toyota',
    tagline: 'Quality. Durability. Reliability. (QDR)',
    country: 'Japan',
    established: '1997 (India)',
    serviceOutlets: '600+ Outlets in India',
    warranty: '3 Years / 1,00,000 km (Extendable to 5 Yrs)',
    priceBracket: '₹6.86 - 51.44 Lakh',
    keyFocus: 'Indestructible Engineering, Self-Charging Hybrid Powertrains, Bulletproof Resale Value',
    highlightCars: ['Toyota Fortuner', 'Toyota Innova Hycross', 'Toyota Innova Crysta', 'Toyota Urban Cruiser Hyryder'],
    badgeColor: '#b91c1c',
  },
  {
    name: 'Kia',
    tagline: 'Movement that Inspires',
    country: 'South Korea',
    established: '2019 (India)',
    serviceOutlets: '500+ Touchpoints in 250+ Cities',
    warranty: '3 Years / Unlimited km',
    priceBracket: '₹7.99 - 65.95 Lakh',
    keyFocus: 'Bold Design Architecture, Panoramic Curved Screens, Turbo Powertrains',
    highlightCars: ['Kia Seltos', 'Kia Sonet', 'Kia Carens', 'Kia EV6'],
    badgeColor: '#171717',
  },
  {
    name: 'Honda',
    tagline: 'The Power of Dreams',
    country: 'Japan',
    established: '1995 (India)',
    serviceOutlets: '350+ Facilities in 240+ Cities',
    warranty: '3 Years / Unlimited km',
    priceBracket: '₹7.20 - 20.50 Lakh',
    keyFocus: 'Legendary i-VTEC High Revving Engines, Sofa Rear Seat Comfort, Honda Sensing ADAS',
    highlightCars: ['Honda City', 'Honda Elevate', 'Honda Amaze'],
    badgeColor: '#ea580c',
  },
  {
    name: 'Volkswagen',
    tagline: 'German Engineering Made for India',
    country: 'Germany',
    established: '2007 (India)',
    serviceOutlets: '160+ Dealerships Across India',
    warranty: '4 Years / 1,00,000 km Comprehensive',
    priceBracket: '₹11.56 - 38.00 Lakh',
    keyFocus: 'MQB-A0-IN Precision Handling, 5-Star NCAP Safety, TSI Turbo Engines & DSG Transmissions',
    highlightCars: ['Volkswagen Virtus', 'Volkswagen Taigun', 'Volkswagen Tiguan'],
    badgeColor: '#1e40af',
  },
  {
    name: 'MG Motor',
    tagline: 'Since 1924 & The Internet Inside Pioneer',
    country: 'United Kingdom / SAIC',
    established: '2017 (India)',
    serviceOutlets: '330+ Touchpoints Nationwide',
    warranty: '3 Years / Unlimited km with MG Shield',
    priceBracket: '₹6.99 - 25.44 Lakh',
    keyFocus: 'Giant Infotainment Touchscreens, AI Personal Assistants, Living-Room Interior Volume',
    highlightCars: ['MG Hector', 'MG Astor', 'MG Windsor EV', 'MG ZS EV', 'MG Comet EV'],
    badgeColor: '#7c3aed',
  },
];

export default function PopularBrandsModal({ isOpen, onClose, onSelectCar }) {
  const [selectedBrand, setSelectedBrand] = useState(BRANDS_DATABASE[0]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Find all cars for selected brand from database
  const brandCars = INDIAN_MARKET_CARS.filter((c) =>
    c.brand.toLowerCase().includes(selectedBrand.name.toLowerCase()) ||
    (selectedBrand.name === 'Tata Motors' && c.brand.toLowerCase().includes('tata')) ||
    (selectedBrand.name === 'Maruti Suzuki' && c.brand.toLowerCase().includes('maruti'))
  );

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overscroll-contain"
        onWheel={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-5xl h-[92vh] max-h-[880px] rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col"
          style={{
            background: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
          }}
        >
          {/* Header */}
          <div
            className="p-4 sm:p-6 border-b shrink-0 flex items-center justify-between gap-4"
            style={{
              background: 'linear-gradient(180deg, rgba(30, 165, 153, 0.12) 0%, transparent 100%)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md"
                style={{
                  background: 'linear-gradient(135deg, var(--color-teal) 0%, #0d8a80 100%)',
                  color: '#fff',
                }}
              >
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-black tracking-tight" style={{ color: 'var(--color-text)' }}>
                    Popular Automotive Brands in India
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-500/20 text-[var(--color-teal)] border border-teal-500/30">
                    Top 9 OEMs
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Explore flagship manufacturer portfolios, safety engineering, warranty coverage, and authorized model pricing
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white transition-colors cursor-pointer"
              style={{ background: 'rgba(255, 255, 255, 0.05)' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Brands Horizontal Selector Bar */}
          <div
            className="p-3 sm:px-6 border-b shrink-0 flex items-center gap-2 overflow-x-auto no-scrollbar"
            style={{
              background: 'rgba(0, 0, 0, 0.02)',
              borderColor: 'var(--color-border)',
            }}
          >
            {BRANDS_DATABASE.map((b) => {
              const isSelected = selectedBrand.name === b.name;
              return (
                <button
                  key={b.name}
                  onClick={() => setSelectedBrand(b)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2"
                  style={{
                    background: isSelected ? 'var(--color-teal)' : 'rgba(255, 255, 255, 0.05)',
                    color: isSelected ? '#fff' : 'var(--color-text-secondary)',
                    border: isSelected ? 'none' : '1px solid var(--color-border)',
                  }}
                >
                  <span>{b.name}</span>
                </button>
              );
            })}
          </div>

          {/* Brand Detail & Models Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Selected Brand Overview Card */}
            <div
              className="rounded-2xl p-5 sm:p-6 border"
              style={{
                background: 'var(--color-base)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase text-white bg-[var(--color-teal)]">
                      {selectedBrand.country} Origin
                    </span>
                    <span className="text-xs text-neutral-400">
                      Est. {selectedBrand.established}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {selectedBrand.name}
                  </h3>
                  <p className="text-xs text-[var(--color-teal)] font-medium mt-0.5">
                    "{selectedBrand.tagline}"
                  </p>
                </div>

                <div className="sm:text-right">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                    Portfolio Price Span
                  </span>
                  <span className="text-lg font-black text-[var(--color-teal)]">
                    {selectedBrand.priceBracket}
                  </span>
                </div>
              </div>

              {/* Badges / Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-1.5 text-neutral-400 font-semibold mb-1">
                    <Building2 className="w-3.5 h-3.5 text-[var(--color-teal)]" />
                    <span>Nationwide Network</span>
                  </div>
                  <div className="font-bold text-neutral-200">
                    {selectedBrand.serviceOutlets}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-1.5 text-neutral-400 font-semibold mb-1">
                    <Wrench className="w-3.5 h-3.5 text-amber-400" />
                    <span>OEM Warranty</span>
                  </div>
                  <div className="font-bold text-neutral-200">
                    {selectedBrand.warranty}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-1.5 text-neutral-400 font-semibold mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Core Focus</span>
                  </div>
                  <div className="font-bold text-neutral-200">
                    {selectedBrand.keyFocus.split(',')[0]}
                  </div>
                </div>
              </div>
            </div>

            {/* Active Models in Lineup */}
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-[var(--color-teal)]" />
                  <span>Official {selectedBrand.name} Models Available in India ({brandCars.length})</span>
                </span>
                <span className="text-[11px] text-neutral-500">
                  Click any model to inspect full variants &amp; specs
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {brandCars.map((car) => (
                  <div
                    key={car.id}
                    onClick={() => {
                      onClose();
                      if (onSelectCar) onSelectCar(car);
                    }}
                    className="p-4 rounded-xl border border-white/10 hover:border-teal-500/50 bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer flex items-center justify-between gap-4 group"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold text-neutral-400 bg-white/5">
                          {car.bodyType}
                        </span>
                        <span className="text-[10px] font-semibold text-teal-400">
                          {car.fuelTypes}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-white group-hover:text-[var(--color-teal)] transition-colors">
                        {car.name}
                      </h4>
                      <span className="text-xs font-bold text-neutral-300 mt-1 block">
                        {car.priceRange}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-[var(--color-teal)] opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      <span>View Specs</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
