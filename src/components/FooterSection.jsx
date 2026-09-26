import { useState } from 'react';
import {
  Car,
  Sparkles,
  ShieldCheck,
  Send,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Heart,
  ExternalLink,
} from 'lucide-react';

export default function FooterSection({
  onOpenAIChatbot,
  onOpenNewLaunches,
  onOpenFindDealers,
  onOpenUpcomingCars,
  onOpenElectricCars,
  onOpenPopularBrands,
}) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      className="border-t relative overflow-hidden"
      style={{
        background: '#04070e',
        borderColor: 'var(--color-border)',
        color: '#94a3b8',
      }}
    >
      {/* Background Lighting Accent */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(30, 165, 153, 0.3) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Top Banner: Instant Price Drop & Launch Alert */}
      <div className="border-b border-white/5 py-8 bg-white/[0.01]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[var(--color-teal)]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-teal)]">
                Automotive Newsletter
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Stay Ahead with Official Launch Dates &amp; Variant Price Cuts
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Receive verified notifications on upcoming SUV releases, Bharat NCAP test scores, and seasonal offers.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscription Confirmed! We'll keep you notified.</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="flex items-center gap-2.5 flex-1 sm:w-72 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus-within:border-[var(--color-teal)] transition-colors">
                  <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-0 p-0"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[var(--color-teal)] hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-md"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center shadow-md"
                style={{ background: 'var(--color-teal)' }}
              >
                <Car className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Car<span className="text-[var(--color-teal)]">zen</span>to
              </span>
            </div>

            <p className="text-xs leading-relaxed text-neutral-400 max-w-sm">
              India’s premier automotive advisory and vehicle discovery platform. Engineered with real-time official OEM pricing, comprehensive technical benchmarks, AI consultative intelligence, and authorized dealer networks across all 28 states.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] font-semibold text-neutral-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Bharat NCAP Grounded</span>
              </span>
              <span>•</span>
              <span>ARAI Certified Data</span>
              <span>•</span>
              <span>9 Leading OEMs</span>
            </div>
          </div>

          {/* Col 2: New Cars Hub */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              New Vehicles
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onOpenNewLaunches && onOpenNewLaunches()}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  New Launches (AI Curated)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenUpcomingCars && onOpenUpcomingCars()}
                  className="hover:text-white transition-colors cursor-pointer text-left text-amber-400"
                >
                  Upcoming Cars 2024-2025
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenElectricCars && onOpenElectricCars()}
                  className="hover:text-white transition-colors cursor-pointer text-left text-emerald-400"
                >
                  Electric Cars (EVs)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenFindDealers && onOpenFindDealers()}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Find Authorized Dealers
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Brands */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Top Manufacturers
            </h4>
            <ul className="space-y-2 text-xs">
              {['Tata Motors', 'Maruti Suzuki', 'Hyundai', 'Mahindra', 'Toyota', 'Kia', 'Volkswagen', 'MG Motor'].map((b) => (
                <li key={b}>
                  <button
                    onClick={() => onOpenPopularBrands && onOpenPopularBrands()}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {b} India
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Intelligence & Advisory */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Tools &amp; Advisory
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onOpenAIChatbot && onOpenAIChatbot()}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1 text-[var(--color-teal)] font-bold"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Advisory Chatbot</span>
                </button>
              </li>
              <li>
                <a href="#resources" className="hover:text-white transition-colors">
                  Car Loan EMI Calculator
                </a>
              </li>
              <li>
                <a href="#resources" className="hover:text-white transition-colors">
                  EV vs Petrol Savings Tool
                </a>
              </li>
              <li>
                <a href="#resources" className="hover:text-white transition-colors">
                  140-Point Pre-Owned Check
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip: Copyright & Disclaimers */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Carzento Automotive Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>OEM Disclaimers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
