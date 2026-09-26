import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Zap,
  BatteryCharging,
  Gauge,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  TrendingDown,
  Info,
} from 'lucide-react';
import { INDIAN_MARKET_CARS } from '../data/indianMarketCars';

export default function ElectricCarsModal({ isOpen, onClose, onSelectCar }) {
  const [rangeFilter, setRangeFilter] = useState('ALL');
  const [budgetFilter, setBudgetFilter] = useState('ALL');

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

  // Filter all Electric cars from database
  const evCars = INDIAN_MARKET_CARS.filter(
    (c) =>
      c.fuelTypes.toLowerCase().includes('electric') ||
      c.id.includes('ev') ||
      c.name.toLowerCase().includes('ev')
  );

  const filteredEVs = evCars.filter((car) => {
    // Range filter
    const mileageNum = parseInt(car.specs?.mileage?.match(/\d+/)?.[0] || '300', 10);
    let rangeMatch = true;
    if (rangeFilter === '200-350') rangeMatch = mileageNum >= 200 && mileageNum <= 350;
    else if (rangeFilter === '350-450') rangeMatch = mileageNum > 350 && mileageNum <= 450;
    else if (rangeFilter === '450+') rangeMatch = mileageNum > 450;

    // Budget filter
    let budgetMatch = true;
    const priceNum = parseFloat(car.priceRange.match(/₹([\d.]+)/)?.[1] || '10');
    if (budgetFilter === 'UNDER_10') budgetMatch = priceNum < 10;
    else if (budgetFilter === '10_20') budgetMatch = priceNum >= 10 && priceNum <= 20;
    else if (budgetFilter === 'ABOVE_20') budgetMatch = priceNum > 20;

    return rangeMatch && budgetMatch;
  });

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
              background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.12) 0%, transparent 100%)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#fff',
                }}
              >
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-black tracking-tight" style={{ color: 'var(--color-text)' }}>
                    Electric Cars (EVs) in India
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Zero Emission
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Verified electric portfolio evaluated for real-world driving range, battery capacity, fast charging, and running economy
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

          {/* Running Cost Savings Strip */}
          <div
            className="px-6 py-2.5 border-b text-xs flex flex-wrap items-center justify-between gap-3"
            style={{
              background: 'rgba(16, 185, 129, 0.06)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <TrendingDown className="w-4 h-4" />
              <span>EV Operational Advantage: Average ₹1.10 - 1.40 per km vs ₹7.50 - 9.00 per km for Petrol</span>
            </div>
            <span className="text-neutral-400 text-[11px]">8-Year Battery Warranty Standard</span>
          </div>

          {/* Filters Bar */}
          <div
            className="p-3.5 sm:px-6 border-b shrink-0 flex flex-wrap items-center justify-between gap-3 text-xs"
            style={{
              background: 'rgba(0, 0, 0, 0.02)',
              borderColor: 'var(--color-border)',
            }}
          >
            {/* Driving Range Filter */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-[11px] uppercase tracking-wider text-neutral-400">
                Range:
              </span>
              {[
                { id: 'ALL', label: 'All Range' },
                { id: '200-350', label: '200 - 350 km' },
                { id: '350-450', label: '350 - 450 km' },
                { id: '450+', label: '450+ km Flagships' },
              ].map((rf) => (
                <button
                  key={rf.id}
                  onClick={() => setRangeFilter(rf.id)}
                  className="px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer"
                  style={{
                    background: rangeFilter === rf.id ? '#10b981' : 'rgba(255, 255, 255, 0.05)',
                    color: rangeFilter === rf.id ? '#fff' : 'var(--color-text-secondary)',
                    border: rangeFilter === rf.id ? 'none' : '1px solid var(--color-border)',
                  }}
                >
                  {rf.label}
                </button>
              ))}
            </div>

            {/* Budget Filter */}
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[11px] uppercase tracking-wider text-neutral-400 mr-1">
                Budget:
              </span>
              {[
                { id: 'ALL', label: 'All Budgets' },
                { id: 'UNDER_10', label: 'Under ₹10L' },
                { id: '10_20', label: '₹10L - ₹20L' },
                { id: 'ABOVE_20', label: 'Above ₹20L' },
              ].map((bf) => (
                <button
                  key={bf.id}
                  onClick={() => setBudgetFilter(bf.id)}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  style={{
                    background: budgetFilter === bf.id ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                    color: budgetFilter === bf.id ? '#10b981' : 'var(--color-text-secondary)',
                    border: budgetFilter === bf.id ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent',
                  }}
                >
                  {bf.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEVs.map((car) => {
                return (
                  <div
                    key={car.id}
                    className="rounded-2xl p-5 border flex flex-col justify-between transition-all duration-200 hover:shadow-xl"
                    style={{
                      background: 'var(--color-base)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider text-white"
                            style={{ background: '#10b981' }}
                          >
                            {car.brand}
                          </span>
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-bold text-neutral-400"
                            style={{ background: 'rgba(255, 255, 255, 0.06)' }}
                          >
                            {car.bodyType}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20">
                          {car.variants?.length || 3} EV Trims
                        </span>
                      </div>

                      <h3
                        className="text-lg font-black tracking-tight mb-2"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {car.name}
                      </h3>

                      {/* Range & Price Highlight */}
                      <div
                        className="p-3 rounded-xl grid grid-cols-2 gap-3 mb-3.5 text-xs"
                        style={{
                          background: 'rgba(0, 0, 0, 0.03)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        <div>
                          <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                            Ex-Showroom Price
                          </span>
                          <span className="text-sm font-black text-emerald-400">
                            {car.priceRange}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                            ARAI Certified Range
                          </span>
                          <span className="text-xs font-bold text-[var(--color-teal)] flex items-center gap-1 mt-0.5">
                            <Gauge className="w-3.5 h-3.5 shrink-0" />
                            {car.specs?.mileage}
                          </span>
                        </div>
                      </div>

                      {/* Technical Specs Summary */}
                      <div className="space-y-2 mb-4 text-xs">
                        <div className="flex items-center justify-between py-1 border-b border-white/5">
                          <span className="text-neutral-400 flex items-center gap-1.5">
                            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                            Battery / Motor:
                          </span>
                          <span className="font-semibold text-neutral-200 text-right">
                            {car.specs?.engine}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-white/5">
                          <span className="text-neutral-400 flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                            Power &amp; Torque:
                          </span>
                          <span className="font-semibold text-neutral-200 text-right">
                            {car.specs?.power} • {car.specs?.torque}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-1">
                          <span className="text-neutral-400 flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-teal)]" />
                            Safety Standard:
                          </span>
                          <span className="font-semibold text-emerald-400 text-right">
                            {car.specs?.safety?.split(',')[0]}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* View Full Specs Action */}
                    <div className="mt-2 pt-3 border-t flex items-center justify-between gap-3" style={{ borderColor: 'var(--color-border)' }}>
                      <span className="text-[11px] text-neutral-400 font-medium">
                        Complete OEM Variants &amp; Benchmarks
                      </span>
                      <button
                        onClick={() => {
                          onClose();
                          if (onSelectCar) onSelectCar(car);
                        }}
                        className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[var(--color-teal)] hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                      >
                        <span>Inspect Specs</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
