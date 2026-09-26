import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Gauge,
  Fuel,
  Users,
  Cog,
  ShieldCheck,
  CheckCircle2,
  Tag,
  SlidersHorizontal,
  Layers,
  Sparkles,
  Info,
  ArrowLeft,
  ArrowRight,
  Check,
} from 'lucide-react';

/**
 * CarSpecsModal — Rollback to tabbed structure:
 * 1. "Specifications" tab displays full model technical specs.
 * 2. "Variants & Prices" tab lists all variants with prices.
 * 3. Selecting any variant model opens its specific full specifications & price.
 * Strictly image-free with background scroll lock.
 */
export default function CarSpecsModal({ car, onClose }) {
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'variants'
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [fuelFilter, setFuelFilter] = useState('All');

  // Prevent background page from sliding/scrolling while modal is open
  useEffect(() => {
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
  }, []);

  if (!car) return null;

  const variants = car.variants || [];
  const availableFuels = ['All', ...new Set(variants.map((v) => v.fuel) || [])];
  const filteredVariants =
    fuelFilter === 'All'
      ? variants
      : variants.filter((v) => v.fuel === fuelFilter);

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
          className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window — Strictly NO IMAGES */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col"
          style={{
            background: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* ─── Header: Brand & Model Overview + Tabs ─── */}
          <div
            className="p-5 sm:p-7 border-b shrink-0"
            style={{
              background: 'linear-gradient(180deg, rgba(30, 165, 153, 0.08) 0%, transparent 100%)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md"
                    style={{
                      background: 'rgba(30, 165, 153, 0.12)',
                      color: 'var(--color-teal)',
                    }}
                  >
                    {car.brand}
                  </span>
                  <span
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-md"
                    style={{
                      background: 'rgba(0, 0, 0, 0.05)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {car.bodyType}
                  </span>
                  <span
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-md"
                    style={{
                      background: 'rgba(0, 0, 0, 0.05)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {car.fuelTypes}
                  </span>
                </div>

                <h2
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                  style={{ color: 'var(--color-text)' }}
                >
                  {car.name}
                </h2>
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

            {/* Price Badge & Option Tabs */}
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-5 pt-3 border-t border-dashed"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div>
                <span
                  className="text-[11px] uppercase tracking-wider font-semibold block"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {car.priceLabel || 'Price Range'}
                </span>
                <div className="flex items-center gap-2 flex-wrap mt-0.5">
                  <span className="text-xl sm:text-2xl font-black" style={{ color: 'var(--color-teal)' }}>
                    {car.priceRange || car.price}
                  </span>
                  {car.originalPrice && (
                    <span
                      className="text-xs px-2 py-0.5 rounded font-medium line-through"
                      style={{ color: 'var(--color-text-secondary)', background: 'rgba(255, 255, 255, 0.06)' }}
                      title="Original Price when New"
                    >
                      {car.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Navigation Options Tabs */}
              <div
                className="flex items-center gap-1.5 p-1 rounded-xl"
                style={{
                  background: 'rgba(0, 0, 0, 0.06)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('specs');
                    setSelectedVariant(null);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  style={{
                    background: activeTab === 'specs' ? 'var(--color-teal)' : 'transparent',
                    color: activeTab === 'specs' ? '#ffffff' : 'var(--color-text-secondary)',
                    boxShadow: activeTab === 'specs' ? '0 2px 8px rgba(30, 165, 153, 0.3)' : 'none',
                  }}
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>Specifications</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('variants')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  style={{
                    background: activeTab === 'variants' ? 'var(--color-teal)' : 'transparent',
                    color: activeTab === 'variants' ? '#ffffff' : 'var(--color-text-secondary)',
                    boxShadow: activeTab === 'variants' ? '0 2px 8px rgba(30, 165, 153, 0.3)' : 'none',
                  }}
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>Variants &amp; Prices ({variants.length})</span>
                </button>
              </div>
            </div>
          </div>

          {/* ─── Body Content (Scrollable, strictly NO images) ─── */}
          <div
            className="p-5 sm:p-7 overflow-y-auto flex-1 overscroll-contain"
            style={{ overscrollBehavior: 'contain' }}
          >
            {activeTab === 'specs' ? (
              /* ─── 1. General Model Specifications View ─── */
              <div className="space-y-6">
                {/* Engine & Transmission */}
                <div>
                  <h3
                    className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                    style={{ color: 'var(--color-teal)' }}
                  >
                    <Cog className="h-4 w-4" />
                    <span>Engine &amp; Transmission</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(0, 0, 0, 0.02)', border: '1px solid var(--color-border)' }}
                    >
                      <span
                        className="text-[11px] font-semibold uppercase tracking-wider block mb-1"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        Engine Displacement
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                        {car.specs?.engine}
                      </span>
                    </div>

                    <div
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(0, 0, 0, 0.02)', border: '1px solid var(--color-border)' }}
                    >
                      <span
                        className="text-[11px] font-semibold uppercase tracking-wider block mb-1"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        Max Power (BHP)
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                        {car.specs?.power}
                      </span>
                    </div>

                    <div
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(0, 0, 0, 0.02)', border: '1px solid var(--color-border)' }}
                    >
                      <span
                        className="text-[11px] font-semibold uppercase tracking-wider block mb-1"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        Peak Torque
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                        {car.specs?.torque}
                      </span>
                    </div>

                    <div
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(0, 0, 0, 0.02)', border: '1px solid var(--color-border)' }}
                    >
                      <span
                        className="text-[11px] font-semibold uppercase tracking-wider block mb-1"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        Transmission Options
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                        {car.specs?.transmission}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Fuel Economy & Capacity */}
                <div>
                  <h3
                    className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                    style={{ color: 'var(--color-teal)' }}
                  >
                    <Gauge className="h-4 w-4" />
                    <span>Fuel Economy &amp; Dimensions</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(0, 0, 0, 0.02)', border: '1px solid var(--color-border)' }}
                    >
                      <span
                        className="text-[11px] font-semibold uppercase tracking-wider block mb-1"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        ARAI Mileage
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-teal)' }}>
                        {car.specs?.mileage}
                      </span>
                    </div>

                    <div
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(0, 0, 0, 0.02)', border: '1px solid var(--color-border)' }}
                    >
                      <span
                        className="text-[11px] font-semibold uppercase tracking-wider block mb-1"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        Fuel Tank Capacity
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                        {car.specs?.fuelTank}
                      </span>
                    </div>

                    <div
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(0, 0, 0, 0.02)', border: '1px solid var(--color-border)' }}
                    >
                      <span
                        className="text-[11px] font-semibold uppercase tracking-wider block mb-1"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        Seating Capacity
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                        {car.specs?.seating}
                      </span>
                    </div>

                    <div
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(0, 0, 0, 0.02)', border: '1px solid var(--color-border)' }}
                    >
                      <span
                        className="text-[11px] font-semibold uppercase tracking-wider block mb-1"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        Boot Space
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                        {car.specs?.bootSpace}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Safety & Ground Clearance */}
                <div>
                  <h3
                    className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                    style={{ color: 'var(--color-teal)' }}
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Safety &amp; Ground Clearance</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(0, 0, 0, 0.02)', border: '1px solid var(--color-border)' }}
                    >
                      <span
                        className="text-[11px] font-semibold uppercase tracking-wider block mb-1"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        Ground Clearance
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                        {car.specs?.groundClearance}
                      </span>
                    </div>

                    <div
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(0, 0, 0, 0.02)', border: '1px solid var(--color-border)' }}
                    >
                      <span
                        className="text-[11px] font-semibold uppercase tracking-wider block mb-1"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        Safety Rating &amp; Equipment
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                        {car.specs?.safety}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedVariant ? (
              /* ─── 2. After Selecting a Variant Model: Show Their Specifications ─── */
              <div className="space-y-6">
                {/* Back Button & Breadcrumb */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b"
                     style={{ borderColor: 'var(--color-border)' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedVariant(null)}
                    className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    style={{
                      background: 'rgba(30, 165, 153, 0.1)',
                      color: 'var(--color-teal)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--color-teal)';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(30, 165, 153, 0.1)';
                      e.currentTarget.style.color = 'var(--color-teal)';
                    }}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>&larr; Back to All Variants</span>
                  </button>

                  <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    Viewing specifications for <strong>{selectedVariant.name}</strong>
                  </span>
                </div>

                {/* Selected Variant Price & Overview Spotlight */}
                <div
                  className="p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  style={{
                    background: 'rgba(30, 165, 153, 0.07)',
                    border: '1.5px solid rgba(30, 165, 153, 0.35)',
                  }}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs uppercase font-extrabold text-[var(--color-teal)] tracking-wider">
                        Selected Variant
                      </span>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded"
                        style={{ background: 'var(--color-teal)', color: '#ffffff' }}
                      >
                        {selectedVariant.transmission}
                      </span>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded"
                        style={{ background: 'rgba(0, 0, 0, 0.06)', color: 'var(--color-text-secondary)' }}
                      >
                        {selectedVariant.fuel}
                      </span>
                    </div>

                    <h3
                      className="text-xl sm:text-2xl font-black"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {selectedVariant.name}
                    </h3>

                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                      Engine: <strong style={{ color: 'var(--color-text)' }}>{selectedVariant.engine}</strong>
                    </p>
                  </div>

                  {/* Selected Variant Ex-Showroom Price */}
                  <div className="text-left sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0"
                       style={{ borderColor: 'rgba(30, 165, 153, 0.2)' }}>
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider block"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      Ex-Showroom Price
                    </span>
                    <span
                      className="text-2xl sm:text-3xl font-black"
                      style={{ color: 'var(--color-teal)' }}
                    >
                      {selectedVariant.price}
                    </span>
                  </div>
                </div>

                {/* Key Features for this Variant Model */}
                {selectedVariant.keyFeatures && (
                  <div>
                    <h4
                      className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5"
                      style={{ color: 'var(--color-teal)' }}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Standard Equipment &amp; Features in {selectedVariant.name}:</span>
                    </h4>
                    <div
                      className="p-4 rounded-xl flex items-start gap-3"
                      style={{ background: 'rgba(0, 0, 0, 0.02)', border: '1px solid var(--color-border)' }}
                    >
                      <CheckCircle2 className="h-4 w-4 text-[var(--color-teal)] shrink-0 mt-0.5" />
                      <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--color-text)' }}>
                        {selectedVariant.keyFeatures}
                      </p>
                    </div>
                  </div>
                )}

                {/* Detailed Technical Specifications for Selected Variant */}
                <div>
                  <h4
                    className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5"
                    style={{ color: 'var(--color-teal)' }}
                  >
                    <Cog className="h-3.5 w-3.5" />
                    <span>Specifications for this Variant:</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(0, 0, 0, 0.02)', border: '1px solid var(--color-border)' }}
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-wider block mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                        Engine
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                        {selectedVariant.engine}
                      </span>
                    </div>

                    <div
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(0, 0, 0, 0.02)', border: '1px solid var(--color-border)' }}
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-wider block mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                        Transmission
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                        {selectedVariant.transmission}
                      </span>
                    </div>

                    <div
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(0, 0, 0, 0.02)', border: '1px solid var(--color-border)' }}
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-wider block mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                        Fuel Type
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                        {selectedVariant.fuel}
                      </span>
                    </div>

                    <div
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(0, 0, 0, 0.02)', border: '1px solid var(--color-border)' }}
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-wider block mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                        ARAI Mileage
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-teal)' }}>
                        {car.specs?.mileage}
                      </span>
                    </div>

                    <div
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(0, 0, 0, 0.02)', border: '1px solid var(--color-border)' }}
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-wider block mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                        Max Power
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                        {car.specs?.power}
                      </span>
                    </div>

                    <div
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(0, 0, 0, 0.02)', border: '1px solid var(--color-border)' }}
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-wider block mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                        Peak Torque
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                        {car.specs?.torque}
                      </span>
                    </div>

                    <div
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(0, 0, 0, 0.02)', border: '1px solid var(--color-border)' }}
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-wider block mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                        Seating Capacity
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                        {car.specs?.seating}
                      </span>
                    </div>

                    <div
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(0, 0, 0, 0.02)', border: '1px solid var(--color-border)' }}
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-wider block mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                        Boot Space
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                        {car.specs?.bootSpace}
                      </span>
                    </div>

                    <div
                      className="p-3.5 rounded-xl"
                      style={{ background: 'rgba(0, 0, 0, 0.02)', border: '1px solid var(--color-border)' }}
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-wider block mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                        Ground Clearance
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                        {car.specs?.groundClearance}
                      </span>
                    </div>

                    <div
                      className="p-3.5 rounded-xl sm:col-span-3"
                      style={{ background: 'rgba(0, 0, 0, 0.02)', border: '1px solid var(--color-border)' }}
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-wider block mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                        Safety Equipment &amp; Standards
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                        {car.specs?.safety}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* ─── 3. Selecting Variants Option Shows All Variants ─── */
              <div>
                {/* Fuel Filter Pills */}
                {availableFuels.length > 2 && (
                  <div
                    className="flex items-center gap-2 mb-4 pb-3 border-b"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <span className="text-xs font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                      Filter by Fuel:
                    </span>
                    {availableFuels.map((fuel) => (
                      <button
                        key={fuel}
                        type="button"
                        onClick={() => setFuelFilter(fuel)}
                        className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer"
                        style={{
                          background:
                            fuelFilter === fuel ? 'var(--color-teal)' : 'rgba(0,0,0,0.05)',
                          color: fuelFilter === fuel ? '#ffffff' : 'var(--color-text-secondary)',
                        }}
                      >
                        {fuel}
                      </button>
                    ))}
                  </div>
                )}

                {/* Variants List — Click on variant to view specifications */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold px-1" style={{ color: 'var(--color-text-secondary)' }}>
                    Click any variant model below to view its full specifications and pricing:
                  </div>

                  {filteredVariants.map((variant, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedVariant(variant)}
                      className="p-4 sm:p-5 rounded-2xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group hover:scale-[1.01]"
                      style={{
                        background: 'rgba(0, 0, 0, 0.02)',
                        border: '1px solid var(--color-border)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-teal)';
                        e.currentTarget.style.boxShadow = '0 6px 20px -2px rgba(30, 165, 153, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-border)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                          <h4
                            className="text-base sm:text-lg font-extrabold group-hover:text-[var(--color-teal)] transition-colors"
                            style={{ color: 'var(--color-text)' }}
                          >
                            {variant.name}
                          </h4>
                          <span
                            className="text-[11px] font-bold px-2 py-0.5 rounded"
                            style={{
                              background: 'rgba(30, 165, 153, 0.1)',
                              color: 'var(--color-teal)',
                            }}
                          >
                            {variant.transmission}
                          </span>
                          <span
                            className="text-[11px] font-medium px-2 py-0.5 rounded"
                            style={{
                              background: 'rgba(0, 0, 0, 0.05)',
                              color: 'var(--color-text-secondary)',
                            }}
                          >
                            {variant.fuel}
                          </span>
                        </div>

                        <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                          Engine: <strong style={{ color: 'var(--color-text)' }}>{variant.engine}</strong>
                        </p>

                        <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                          <span className="font-semibold text-neutral-400">Highlights: </span>
                          {variant.keyFeatures}
                        </div>
                      </div>

                      {/* Variant Price & Select Button */}
                      <div
                        className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0"
                        style={{ borderColor: 'var(--color-border)' }}
                      >
                        <div className="text-left sm:text-right">
                          <span
                            className="text-[10px] uppercase font-bold tracking-wider block"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            Ex-Showroom Price
                          </span>
                          <span
                            className="text-lg sm:text-xl font-black"
                            style={{ color: 'var(--color-teal)' }}
                          >
                            {variant.price}
                          </span>
                        </div>

                        <button
                          type="button"
                          className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg text-white shadow-sm transition-all pointer-events-none"
                          style={{ background: 'var(--color-teal)' }}
                        >
                          <span>View Specs</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ─── Footer ─── */}
          <div
            className="p-4 sm:p-5 border-t flex items-center justify-between gap-3 shrink-0"
            style={{
              background: 'var(--color-card)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              <Info className="h-3.5 w-3.5" />
              <span>Prices shown are ex-showroom. Click any variant to see its specifications.</span>
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
