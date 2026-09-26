import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Camera,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

const GALLERY_CARS = [
  {
    id: 'tata-curvv',
    name: 'Tata Curvv',
    brand: 'Tata Motors',
    category: 'SUV Coupe',
    image: '/tata-curvv.jpg',
    views: [
      { name: 'Dynamic Exterior Profile', tag: 'Fastback Coupe Stance', img: '/tata-curvv.jpg' },
      { name: 'Front Parametric Fascia', tag: 'Connected DRLs & Split LEDs', img: '/tata-curvv.jpg' },
      { name: 'Dual-Screen Cockpit', tag: '12.3-inch Cinematic Display', img: '/hero-banner.jpg' },
    ],
  },
  {
    id: 'maruti-dzire',
    name: 'Maruti Suzuki Dzire',
    brand: 'Maruti Suzuki',
    category: 'Compact Sedan',
    image: '/maruti-dzire.jpg',
    views: [
      { name: 'Front Chrome Grille & LEDs', tag: '5-Star NCAP Architecture', img: '/maruti-dzire.jpg' },
      { name: 'Executive Interior Layout', tag: 'Sunroof & Dual-Tone Cabin', img: '/hero-banner.jpg' },
    ],
  },
  {
    id: 'vw-virtus',
    name: 'Volkswagen Virtus',
    brand: 'Volkswagen',
    category: 'Performance Sedan',
    image: '/vw-virtus.jpg',
    views: [
      { name: 'Laser-Welded GT Stance', tag: 'MQB-A0-IN German Silhouette', img: '/vw-virtus.jpg' },
      { name: 'Driver Cockpit with Digital Cockpit', tag: '10-inch Infotainment & Red Ambient Moods', img: '/hero-banner.jpg' },
    ],
  },
  {
    id: 'hyundai-creta',
    name: 'Hyundai Creta',
    brand: 'Hyundai',
    category: 'Mid-size SUV',
    image: '/hyundai-creta.jpg',
    views: [
      { name: 'Parametric Black Chrome Fascia', tag: 'Quad-Beam Horizon LEDs', img: '/hyundai-creta.jpg' },
      { name: 'Panoramic Dual Screen Cockpit', tag: 'Bose Acoustics & Cooled Seats', img: '/hero-banner.jpg' },
    ],
  },
  {
    id: 'mahindra-thar',
    name: 'Mahindra Thar',
    brand: 'Mahindra',
    category: '4x4 Off-roader',
    image: '/mahindra-thar.jpg',
    views: [
      { name: 'Aggressive 4x4 Stance', tag: '226mm High Clearance & 18-inch Alloys', img: '/mahindra-thar.jpg' },
      { name: 'Adventure Ready Cabin', tag: 'Washable Interior with Roof Speakers', img: '/hero-banner.jpg' },
    ],
  },
  {
    id: 'toyota-fortuner',
    name: 'Toyota Fortuner',
    brand: 'Toyota',
    category: 'Full-size 4x4 SUV',
    image: '/toyota-fortuner.jpg',
    views: [
      { name: 'Commanding Road Presence', tag: 'Ladder-frame 500 Nm Torque Beast', img: '/toyota-fortuner.jpg' },
    ],
  },
  {
    id: 'kia-seltos',
    name: 'Kia Seltos',
    brand: 'Kia',
    category: 'Connected Tech SUV',
    image: '/kia-seltos.jpg',
    views: [
      { name: 'Signature Tiger Nose Grille', tag: 'Full Width LED Lightbar', img: '/kia-seltos.jpg' },
    ],
  },
  {
    id: 'honda-city',
    name: 'Honda City',
    brand: 'Honda',
    category: 'Executive Sedan',
    image: '/honda-city.jpg',
    views: [
      { name: 'Timeless Elegant Silhouette', tag: 'Full LED Jewel Eye Headlamps', img: '/honda-city.jpg' },
    ],
  },
  {
    id: 'mg-hector',
    name: 'MG Hector',
    brand: 'MG Motor',
    category: 'Internet Mid-size SUV',
    image: '/mg-hector.jpg',
    views: [
      { name: 'Argyle Inspired Chrome Diamond Grille', tag: 'Argyle Grille with Floating Lightbar', img: '/mg-hector.jpg' },
    ],
  },
];

export default function CarImagesGalleryModal({ isOpen, onClose }) {
  const [selectedCar, setSelectedCar] = useState(GALLERY_CARS[0]);
  const [activeViewIdx, setActiveViewIdx] = useState(0);
  const [isLightbox, setIsLightbox] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        if (isLightbox) setIsLightbox(false);
        else onClose();
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isLightbox, onClose]);

  if (!isOpen) return null;

  const currentView = selectedCar.views[activeViewIdx] || selectedCar.views[0];

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
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
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
              background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.12) 0%, transparent 100%)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  color: '#fff',
                }}
              >
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-black tracking-tight" style={{ color: 'var(--color-text)' }}>
                    High-Definition Car Gallery &amp; Studio Images
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    HD Studio
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Explore official studio angles, exterior silhouettes, cabin cockpits, and wheel styling across top Indian vehicles
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

          {/* Car Selector Strip */}
          <div
            className="p-3 sm:px-6 border-b shrink-0 flex items-center gap-2 overflow-x-auto no-scrollbar"
            style={{
              background: 'rgba(0, 0, 0, 0.02)',
              borderColor: 'var(--color-border)',
            }}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 shrink-0">
              Select Car:
            </span>
            {GALLERY_CARS.map((car) => {
              const isSelected = selectedCar.id === car.id;
              return (
                <button
                  key={car.id}
                  onClick={() => {
                    setSelectedCar(car);
                    setActiveViewIdx(0);
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                  style={{
                    background: isSelected ? 'var(--color-teal)' : 'rgba(255, 255, 255, 0.05)',
                    color: isSelected ? '#fff' : 'var(--color-text-secondary)',
                    border: isSelected ? 'none' : '1px solid var(--color-border)',
                  }}
                >
                  <span>{car.name}</span>
                </button>
              );
            })}
          </div>

          {/* Main Gallery Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-5">
            {/* Featured Image Display */}
            <div
              className="relative w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden border flex items-center justify-center group"
              style={{
                background: '#090d16',
                borderColor: 'var(--color-border)',
              }}
            >
              <img
                src={getAssetUrl(currentView.img)}
                alt={selectedCar.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient Overlay & Info Pill */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 pointer-events-auto">
                <div className="bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 max-w-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-[var(--color-teal)] text-white">
                      {selectedCar.brand}
                    </span>
                    <span className="text-xs font-bold text-white">
                      {selectedCar.name}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-neutral-100">
                    {currentView.name}
                  </h4>
                  <span className="text-xs text-indigo-300 font-medium">
                    {currentView.tag}
                  </span>
                </div>

                <button
                  onClick={() => setIsLightbox(true)}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg"
                  title="Expand to Fullscreen Lightbox"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnail Perspective Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Available Camera Perspectives ({selectedCar.views.length})</span>
                </span>
                <span className="text-[11px] text-neutral-500">
                  Click any perspective to preview
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {selectedCar.views.map((v, vIdx) => {
                  const isActive = activeViewIdx === vIdx;
                  return (
                    <button
                      key={vIdx}
                      onClick={() => setActiveViewIdx(vIdx)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        isActive
                          ? 'border-indigo-500 bg-indigo-500/10 shadow-md'
                          : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-neutral-900 border border-white/10">
                        <img src={getAssetUrl(v.img)} alt={v.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold text-neutral-200 truncate">
                          {v.name}
                        </div>
                        <div className="text-[10px] text-indigo-300/80 truncate">
                          {v.tag}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
