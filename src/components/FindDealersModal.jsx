import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MapPin,
  Phone,
  Clock,
  Star,
  CheckCircle2,
  Calendar,
  Building2,
  Search,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Send,
} from 'lucide-react';
import {
  INDIAN_CITIES,
  CAR_BRANDS,
  AUTHORIZED_DEALERS,
} from '../data/dealersData';

/**
 * FindDealersModal — Comprehensive Authorized Dealerships Explorer for Indian Car Market.
 */
export default function FindDealersModal({ isOpen, onClose }) {
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingDealer, setBookingDealer] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    carModel: 'Tata Curvv',
    date: '',
    timeSlot: 'Morning (10 AM - 1 PM)',
  });

  // Body scroll lock
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

  // Filter Dealers
  const filteredDealers = AUTHORIZED_DEALERS.filter((dealer) => {
    const matchesCity = selectedCity === 'All Cities' || dealer.city === selectedCity;
    const matchesBrand = selectedBrand === 'All Brands' || dealer.brand === selectedBrand;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      dealer.name.toLowerCase().includes(q) ||
      dealer.locality.toLowerCase().includes(q) ||
      dealer.address.toLowerCase().includes(q) ||
      dealer.brand.toLowerCase().includes(q);

    return matchesCity && matchesBrand && matchesSearch;
  });

  const handleBookTestDrive = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingDealer(null);
      setBookingForm({
        name: '',
        phone: '',
        carModel: 'Tata Curvv',
        date: '',
        timeSlot: 'Morning (10 AM - 1 PM)',
      });
    }, 2800);
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
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6)',
          }}
        >
          {/* ─── Header ─── */}
          <div
            className="p-4 sm:p-6 border-b shrink-0 flex items-center justify-between gap-4"
            style={{
              background: 'linear-gradient(180deg, rgba(30, 165, 153, 0.12) 0%, transparent 100%)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl flex items-center justify-center shadow-md shrink-0"
                style={{
                  background: 'linear-gradient(135deg, var(--color-teal) 0%, #0d8a80 100%)',
                  color: '#ffffff',
                }}
              >
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-black tracking-tight" style={{ color: 'var(--color-text)' }}>
                    Find Authorized Dealerships
                  </h2>
                  <span
                    className="hidden sm:inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full"
                    style={{
                      background: 'rgba(30, 165, 153, 0.15)',
                      color: 'var(--color-teal)',
                      border: '1px solid rgba(30, 165, 153, 0.3)',
                    }}
                  >
                    <ShieldCheck className="h-3 w-3" />
                    <span>OEM Verified</span>
                  </span>
                </div>
                <p className="text-xs sm:text-[13px]" style={{ color: 'var(--color-text-secondary)' }}>
                  Locate certified showrooms across India &bull; Book doorstep test drives &bull; Direct contact &amp; pricing
                </p>
              </div>
            </div>

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
              title="Close Dealerships Explorer"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>

          {/* ─── Filter Bar: City, Brand & Search ─── */}
          <div
            className="p-3 sm:p-4 border-b shrink-0 space-y-3"
            style={{
              borderColor: 'var(--color-border)',
              background: 'rgba(0, 0, 0, 0.02)',
            }}
          >
            {/* Search Input & City Dropdown */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div
                className="flex-1 flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all"
                style={{
                  background: 'var(--color-input)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <Search className="h-4 w-4 shrink-0 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search dealership name, locality, landmark (e.g. Chembur, Bandra, Noida, Koramangala)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm outline-none placeholder:text-neutral-500"
                  style={{ color: 'var(--color-text)' }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-neutral-400 hover:text-neutral-200 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* City Selector */}
              <div className="shrink-0 flex items-center gap-1.5">
                <span className="text-xs font-bold text-neutral-400 hidden md:inline">City:</span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold outline-none cursor-pointer transition-all"
                  style={{
                    background: 'var(--color-input)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                >
                  {INDIAN_CITIES.map((city) => (
                    <option key={city} value={city} className="bg-slate-900 text-white">
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Brand Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider shrink-0 mr-1">
                Brand:
              </span>
              {CAR_BRANDS.map((brand) => {
                const isSelected = selectedBrand === brand;
                return (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => setSelectedBrand(brand)}
                    className="shrink-0 text-xs px-3 py-1 rounded-full font-bold transition-all cursor-pointer"
                    style={{
                      background: isSelected ? 'var(--color-teal)' : 'var(--color-input)',
                      color: isSelected ? '#ffffff' : 'var(--color-text-secondary)',
                      border: isSelected ? '1px solid var(--color-teal)' : '1px solid var(--color-border)',
                      boxShadow: isSelected ? '0 2px 8px rgba(30, 165, 153, 0.25)' : 'none',
                    }}
                  >
                    {brand}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── Dealers Feed ─── */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between text-xs text-neutral-400 pb-1">
              <span>
                Found <strong className="text-[var(--color-teal)]">{filteredDealers.length}</strong> certified dealerships
                {selectedCity !== 'All Cities' && ` in ${selectedCity}`}
                {selectedBrand !== 'All Brands' && ` for ${selectedBrand}`}
              </span>
              <span className="text-[11px] hidden sm:inline">Official Authorized Partner Network</span>
            </div>

            {filteredDealers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDealers.map((dealer) => (
                  <div
                    key={dealer.id}
                    className="rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-md transition-all hover:border-[var(--color-teal)]"
                    style={{
                      background: 'var(--color-base)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider text-white"
                          style={{ background: 'var(--color-teal)' }}
                        >
                          {dealer.brand}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                          <Star className="h-3.5 w-3.5 fill-amber-400" />
                          <span>{dealer.rating}</span>
                          <span className="text-[11px] text-neutral-400 font-normal">
                            ({dealer.reviewsCount})
                          </span>
                        </div>
                      </div>

                      {/* Name */}
                      <h3 className="text-base font-extrabold tracking-tight mb-2" style={{ color: 'var(--color-text)' }}>
                        {dealer.name}
                      </h3>

                      {/* Address */}
                      <div className="flex items-start gap-2 text-xs leading-relaxed mb-2.5" style={{ color: 'var(--color-text-secondary)' }}>
                        <MapPin className="h-4 w-4 shrink-0 text-[var(--color-teal)] mt-0.5" />
                        <span>{dealer.address}</span>
                      </div>

                      {/* Timings */}
                      <div className="flex items-center gap-2 text-xs mb-3 text-neutral-400">
                        <Clock className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                        <span>{dealer.timing}</span>
                      </div>

                      {/* Services Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {dealer.services.map((srv, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                            style={{
                              background: 'rgba(30, 165, 153, 0.08)',
                              color: 'var(--color-teal)',
                              border: '1px solid rgba(30, 165, 153, 0.2)',
                            }}
                          >
                            {srv}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="pt-3 border-t flex items-center justify-between gap-2" style={{ borderColor: 'var(--color-border)' }}>
                      <a
                        href={`tel:${dealer.phone.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: 'var(--color-text)',
                          border: '1px solid var(--color-border)',
                        }}
                        title={`Call ${dealer.phone}`}
                      >
                        <Phone className="h-3.5 w-3.5 text-[var(--color-teal)]" />
                        <span>{dealer.phone}</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setBookingDealer(dealer);
                          setBookingSuccess(false);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold px-3.5 py-1.5 rounded-xl shadow-sm transition-all cursor-pointer hover:scale-105"
                        style={{
                          background: 'linear-gradient(135deg, var(--color-teal) 0%, #0d8a80 100%)',
                          color: '#ffffff',
                        }}
                      >
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Book Test Drive</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="p-10 rounded-2xl text-center space-y-3"
                style={{
                  background: 'var(--color-base)',
                  border: '1px dashed var(--color-border)',
                }}
              >
                <Building2 className="h-10 w-10 text-neutral-500 mx-auto" />
                <h4 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>
                  No Dealerships Found
                </h4>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  No authorized dealerships matched your current search filters for &ldquo;{searchQuery}&rdquo;. Try selecting &ldquo;All Cities&rdquo; or clearing your brand filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCity('All Cities');
                    setSelectedBrand('All Brands');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-all cursor-pointer"
                  style={{ background: 'var(--color-teal)' }}
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

          {/* ─── Test Drive Booking Modal / Overlay ─── */}
          {bookingDealer && (
            <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg rounded-2xl p-6 shadow-2xl relative"
                style={{
                  background: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setBookingDealer(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                {bookingSuccess ? (
                  <div className="text-center py-6 space-y-3">
                    <div className="h-14 w-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-black text-white">Test Drive Confirmed!</h3>
                    <p className="text-xs text-neutral-300 max-w-sm mx-auto">
                      Your test drive request for <strong className="text-[var(--color-teal)]">{bookingForm.carModel}</strong> has been assigned to <strong className="text-white">{bookingDealer.name}</strong>. An advisor will contact you at <strong className="text-white">{bookingForm.phone}</strong>.
                    </p>
                    <span className="inline-block text-[11px] text-emerald-400 font-bold uppercase tracking-wider bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                      Booking ID: TD-{Math.floor(100000 + Math.random() * 900000)}
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded text-white bg-[var(--color-teal)]">
                        {bookingDealer.brand}
                      </span>
                      <h3 className="text-lg font-black mt-1" style={{ color: 'var(--color-text)' }}>
                        Book Test Drive
                      </h3>
                      <p className="text-xs text-neutral-400">{bookingDealer.name} &bull; {bookingDealer.locality}</p>
                    </div>

                    <form onSubmit={handleBookTestDrive} className="space-y-3">
                      <div>
                        <label className="text-[11px] font-bold text-neutral-400 block mb-1">Your Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl text-xs outline-none"
                          style={{
                            background: 'var(--color-input)',
                            border: '1px solid var(--color-border)',
                            color: 'var(--color-text)',
                          }}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-neutral-400 block mb-1">Mobile Number</label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={bookingForm.phone}
                            onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl text-xs outline-none"
                            style={{
                              background: 'var(--color-input)',
                              border: '1px solid var(--color-border)',
                              color: 'var(--color-text)',
                            }}
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-neutral-400 block mb-1">Car Model</label>
                          <select
                            value={bookingForm.carModel}
                            onChange={(e) => setBookingForm({ ...bookingForm, carModel: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl text-xs outline-none cursor-pointer bg-slate-900 text-white"
                            style={{ border: '1px solid var(--color-border)' }}
                          >
                            <option value="Tata Curvv">Tata Curvv</option>
                            <option value="Tata Nexon">Tata Nexon</option>
                            <option value="Tata Harrier">Tata Harrier</option>
                            <option value="Tata Safari">Tata Safari</option>
                            <option value="Maruti Dzire">Maruti Dzire</option>
                            <option value="Maruti Swift">Maruti Swift</option>
                            <option value="Maruti Brezza">Maruti Brezza</option>
                            <option value="Hyundai Creta">Hyundai Creta</option>
                            <option value="Hyundai Venue">Hyundai Venue</option>
                            <option value="Mahindra Thar">Mahindra Thar</option>
                            <option value="Mahindra Scorpio-N">Mahindra Scorpio-N</option>
                            <option value="Mahindra XUV700">Mahindra XUV700</option>
                            <option value="Toyota Fortuner">Toyota Fortuner</option>
                            <option value="Toyota Innova Hycross">Toyota Innova Hycross</option>
                            <option value="Volkswagen Virtus">Volkswagen Virtus</option>
                            <option value="Kia Seltos">Kia Seltos</option>
                            <option value="Honda City">Honda City</option>
                            <option value="MG Windsor EV">MG Windsor EV</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-neutral-400 block mb-1">Preferred Date</label>
                          <input
                            type="date"
                            required
                            value={bookingForm.date}
                            onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl text-xs outline-none bg-slate-900 text-white"
                            style={{ border: '1px solid var(--color-border)' }}
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-neutral-400 block mb-1">Preferred Slot</label>
                          <select
                            value={bookingForm.timeSlot}
                            onChange={(e) => setBookingForm({ ...bookingForm, timeSlot: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl text-xs outline-none cursor-pointer bg-slate-900 text-white"
                            style={{ border: '1px solid var(--color-border)' }}
                          >
                            <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
                            <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                            <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-xl font-bold text-xs text-white shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                          style={{
                            background: 'linear-gradient(135deg, var(--color-teal) 0%, #0d8a80 100%)',
                          }}
                        >
                          <Send className="h-3.5 w-3.5" />
                          <span>Confirm Test Drive Request</span>
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
