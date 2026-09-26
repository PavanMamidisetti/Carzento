import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Sparkles,
  Zap,
  Gauge,
  Fuel,
  Bell,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  Shield,
  Clock,
} from 'lucide-react';
import { UPCOMING_CARS_DATA } from '../data/upcomingCarsData';

export default function UpcomingCarsModal({ isOpen, onClose }) {
  const [filterBrand, setFilterBrand] = useState('ALL');
  const [filterPowertrain, setFilterPowertrain] = useState('ALL');
  const [notifiedCars, setNotifiedCars] = useState({});
  const [activeCarModal, setActiveCarModal] = useState(null);

  // Close on Escape key
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

  const brands = ['ALL', 'Maruti Suzuki', 'Tata Motors', 'Hyundai', 'Mahindra', 'Honda', 'Kia', 'Volkswagen / Skoda'];

  const filteredCars = UPCOMING_CARS_DATA.filter((car) => {
    const brandMatch = filterBrand === 'ALL' || car.brand.toLowerCase().includes(filterBrand.toLowerCase());
    const ptMatch =
      filterPowertrain === 'ALL' ||
      (filterPowertrain === 'EV' && car.powertrain.toLowerCase().includes('electric')) ||
      (filterPowertrain === 'PETROL' && (car.powertrain.toLowerCase().includes('petrol') || car.powertrain.toLowerCase().includes('tsi')));
    return brandMatch && ptMatch;
  });

  const toggleNotify = (carId) => {
    setNotifiedCars((prev) => ({
      ...prev,
      [carId]: !prev[carId],
    }));
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overscroll-contain"
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

        {/* Modal Container */}
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
              background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.12) 0%, transparent 100%)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: '#fff',
                }}
              >
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-black tracking-tight" style={{ color: 'var(--color-text)' }}>
                    Upcoming Cars in India
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-500 border border-amber-500/30">
                    2024 - 2025 Horizon
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Verified roadmap of next-generation SUVs, EVs, and sedans arriving in the Indian automotive market
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

          {/* Filters Bar */}
          <div
            className="p-3.5 sm:px-6 border-b shrink-0 flex flex-wrap items-center justify-between gap-3 text-xs"
            style={{
              background: 'rgba(0, 0, 0, 0.02)',
              borderColor: 'var(--color-border)',
            }}
          >
            {/* Brand Filter */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <span className="font-bold text-[11px] uppercase tracking-wider text-neutral-400 shrink-0">
                Brand:
              </span>
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => setFilterBrand(b)}
                  className="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer"
                  style={{
                    background: filterBrand === b ? 'var(--color-teal)' : 'rgba(255, 255, 255, 0.05)',
                    color: filterBrand === b ? '#fff' : 'var(--color-text-secondary)',
                    border: filterBrand === b ? 'none' : '1px solid var(--color-border)',
                  }}
                >
                  {b}
                </button>
              ))}
            </div>

            {/* Powertrain Filter */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="font-bold text-[11px] uppercase tracking-wider text-neutral-400 mr-1">
                Fuel:
              </span>
              {['ALL', 'EV', 'PETROL'].map((pt) => (
                <button
                  key={pt}
                  onClick={() => setFilterPowertrain(pt)}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  style={{
                    background: filterPowertrain === pt ? 'rgba(245, 158, 11, 0.18)' : 'transparent',
                    color: filterPowertrain === pt ? '#f59e0b' : 'var(--color-text-secondary)',
                    border: filterPowertrain === pt ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid transparent',
                  }}
                >
                  {pt === 'ALL' ? 'All Powertrains' : pt === 'EV' ? '⚡ Electric' : '⛽ Petrol / Turbo'}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCars.map((car) => {
                const isNotified = !!notifiedCars[car.id];

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
                            style={{ background: 'var(--color-teal)' }}
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
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20">
                          {car.status}
                        </span>
                      </div>

                      {/* Car Name */}
                      <h3
                        className="text-lg font-black tracking-tight mb-2"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {car.name}
                      </h3>

                      {/* Price & Launch Timeline Box */}
                      <div
                        className="p-3 rounded-xl grid grid-cols-2 gap-3 mb-3.5 text-xs"
                        style={{
                          background: 'rgba(0, 0, 0, 0.03)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        <div>
                          <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                            Expected Price
                          </span>
                          <span className="text-sm font-black text-amber-500">
                            {car.expectedPrice}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                            Expected Launch
                          </span>
                          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                            {car.expectedLaunch}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs leading-relaxed text-neutral-400 mb-3.5">
                        {car.description}
                      </p>

                      {/* Core Specs Highlights */}
                      <div className="space-y-1.5 mb-4">
                        <div className="flex items-center gap-2 text-xs">
                          <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="text-neutral-400">Powertrain:</span>
                          <span className="font-semibold text-neutral-200">{car.powertrain}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Gauge className="w-3.5 h-3.5 text-[var(--color-teal)] shrink-0" />
                          <span className="text-neutral-400">Range / Mileage:</span>
                          <span className="font-semibold text-neutral-200">{car.range}</span>
                        </div>
                      </div>

                      {/* Key Anticipated Highlights */}
                      <div
                        className="p-3 rounded-xl text-xs space-y-1"
                        style={{
                          background: 'rgba(30, 165, 153, 0.04)',
                          border: '1px dashed rgba(30, 165, 153, 0.25)',
                        }}
                      >
                        <span className="text-[10px] uppercase font-bold text-[var(--color-teal)] block mb-1">
                          Key Expected Highlights
                        </span>
                        {car.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-1.5 text-[11px] text-neutral-300">
                            <CheckCircle2 className="w-3 h-3 text-[var(--color-teal)] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action: Alert Me on Launch */}
                    <div className="mt-4 pt-3.5 border-t flex items-center justify-between gap-3" style={{ borderColor: 'var(--color-border)' }}>
                      <span className="text-[11px] text-neutral-400 font-medium">
                        Instant SMS &amp; WhatsApp Alert
                      </span>
                      <button
                        onClick={() => toggleNotify(car.id)}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
                          isNotified
                            ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                            : 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                        }`}
                      >
                        <Bell className="w-3.5 h-3.5" />
                        <span>{isNotified ? 'Subscribed ✓' : 'Notify Me on Launch'}</span>
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
