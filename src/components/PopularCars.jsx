import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Fuel,
  Tag,
  CheckCircle2,
  Gauge,
  Users,
  Cog,
  ShieldCheck,
  X,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { NEW_CARS } from '../data/cars';
import { INDIAN_MARKET_CARS } from '../data/indianMarketCars';

const FILTER_TABS = ['All Cars', 'Under ₹15 Lakh', 'Diesel', 'Petrol'];

/**
 * PopularCars — Professional 3-in-a-row grid layout.
 * Clicking any car opens the technical specifications and variant pricing modal (no redirection).
 */
export default function PopularCars({ onSelectCar }) {
  const [activeTab, setActiveTab] = useState('All Cars');

  // Filter cars based on selected tab
  const filteredCars = NEW_CARS.filter((car) => {
    if (activeTab === 'All Cars') return true;
    if (activeTab === 'Under ₹15 Lakh') {
      const match = car.price.match(/₹([\d.]+)/);
      return match ? parseFloat(match[1]) < 12.0 : true;
    }
    if (activeTab === 'Diesel') return car.fuel.includes('Diesel');
    if (activeTab === 'Petrol') return car.fuel.includes('Petrol');
    return true;
  });

  const handleCarClick = (car, e) => {
    if (e) e.stopPropagation();
    const matched =
      INDIAN_MARKET_CARS.find(
        (c) =>
          c.name.toLowerCase().includes(car.name.toLowerCase()) ||
          car.name.toLowerCase().includes(c.name.toLowerCase())
      );

    const carData = matched
      ? {
          ...matched,
          name: car.name,
          priceRange: car.price,
          priceLabel: 'Ex-Showroom Price Range',
        }
      : {
          ...car,
          priceRange: car.price,
          priceLabel: 'Ex-Showroom Price Range',
        };

    if (onSelectCar) {
      onSelectCar(carData);
    }
  };

  return (
    <section
      className="w-full px-4 sm:px-6 lg:px-8"
      style={{ background: 'var(--color-base)', paddingTop: '48px', paddingBottom: '32px' }}
    >
      <div className="max-w-[1320px] mx-auto">
        {/* ─── Header ───────────────────────────────────────── */}
        <div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 md:mb-10 pb-5 border-b"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span
                className="w-1.5 h-7 rounded-full inline-block"
                style={{ background: 'var(--color-teal)' }}
              />
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight"
                style={{ color: 'var(--color-text)' }}
              >
                Popular <span style={{ color: 'var(--color-teal)' }}>Cars</span>
              </h2>
            </div>
            <p
              className="text-sm sm:text-base pl-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Click any car to explore full technical specifications, variant details &amp; pricing
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap pl-4 lg:pl-0">
            {FILTER_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer"
                  style={{
                    background: isActive ? 'var(--color-teal)' : 'var(--color-card)',
                    color: isActive ? '#ffffff' : 'var(--color-text-secondary)',
                    border: isActive
                      ? '1px solid var(--color-teal)'
                      : '1px solid var(--color-border)',
                    boxShadow: isActive ? '0 4px 14px rgba(30, 165, 153, 0.25)' : 'none',
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── 3-in-a-Row Professional Grid ─────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
          {filteredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.05,
                ease: 'easeOut',
              }}
              className="group flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
              style={{
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-teal)';
                e.currentTarget.style.boxShadow =
                  '0 14px 32px -4px rgba(30, 165, 153, 0.18)';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              onClick={() => handleCarClick(car)}
            >
              {/* Car Image with Badges */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                  draggable={false}
                />

                {/* Rating Badge */}
                <div
                  className="absolute top-3.5 right-3.5 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shadow-md backdrop-blur-md"
                  style={{
                    background: 'rgba(15, 23, 42, 0.78)',
                    color: '#fbbf24',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                  }}
                >
                  <Star className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                  <span>{car.rating}</span>
                </div>

                {/* Body Type Badge */}
                <div
                  className="absolute bottom-3.5 left-3.5 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase backdrop-blur-md shadow-sm"
                  style={{
                    background: 'rgba(30, 165, 153, 0.92)',
                    color: '#ffffff',
                  }}
                >
                  {car.type}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide text-white bg-black/70 backdrop-blur-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <SlidersHorizontal className="h-3.5 w-3.5 text-[var(--color-teal)]" />
                    <span>View Specifications &amp; Price</span>
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
                <div>
                  {/* Title & Brand */}
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <span
                        className="text-[11px] font-semibold uppercase tracking-wider block"
                        style={{ color: 'var(--color-teal)' }}
                      >
                        {car.brand}
                      </span>
                      <h3
                        className="text-lg sm:text-xl font-bold transition-colors group-hover:text-[var(--color-teal)]"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {car.name}
                      </h3>
                    </div>
                    <CheckCircle2
                      className="h-4 w-4 shrink-0 mt-1"
                      style={{ color: 'var(--color-teal)' }}
                    />
                  </div>

                  {/* Key Specifications Grid */}
                  <div className="grid grid-cols-2 gap-2 my-3 p-2.5 rounded-xl text-xs"
                       style={{ background: 'rgba(0, 0, 0, 0.03)', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
                      <Gauge className="h-3.5 w-3.5 text-[var(--color-teal)] shrink-0" />
                      <span className="truncate">{car.specs?.mileage}</span>
                    </div>
                    <div className="flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
                      <Fuel className="h-3.5 w-3.5 text-[var(--color-teal)] shrink-0" />
                      <span className="truncate">{car.specs?.engine}</span>
                    </div>
                    <div className="flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
                      <Users className="h-3.5 w-3.5 text-[var(--color-teal)] shrink-0" />
                      <span className="truncate">{car.specs?.seating}</span>
                    </div>
                    <div className="flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
                      <Cog className="h-3.5 w-3.5 text-[var(--color-teal)] shrink-0" />
                      <span className="truncate">{car.specs?.transmission}</span>
                    </div>
                  </div>
                </div>

                {/* Card Divider */}
                <div
                  className="w-full h-px mb-4"
                  style={{ background: 'var(--color-border)' }}
                />

                {/* Price and Action Buttons */}
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span
                      className="block text-[11px] font-medium uppercase tracking-wide"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      Ex-Showroom Price
                    </span>
                    <span
                      className="text-base sm:text-lg font-extrabold flex items-center gap-1 mt-0.5"
                      style={{ color: 'var(--color-teal)' }}
                    >
                      <Tag className="h-4 w-4" strokeWidth={2.2} />
                      <span>{car.price}</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleCarClick(car, e)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer shadow-sm hover:brightness-110"
                    style={{
                      background: 'var(--color-teal)',
                      color: '#ffffff',
                    }}
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    <span>View Specs &amp; Price</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
