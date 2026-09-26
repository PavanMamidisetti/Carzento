import { useState, useRef, useEffect } from 'react';
import {
  Search,
  Sun,
  Moon,
  User,
  Car,
  ChevronDown,
  ChevronRight,
  X,
  ExternalLink,
  Sparkles,
  Bot,
  Clock,
  Zap,
  Camera,
  Award,
  Compass,
  Flame,
  MapPin,
  Video,
  Calculator,
  Scale,
  Tag,
  Star,
  Menu,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ThemeContext';
import AuthModal from './AuthModal';
import { INDIAN_MARKET_CARS } from '../data/indianMarketCars';

/**
 * Executive Sub-link data for each nav category with icons, subtitles and badges.
 */
const subLinks = {
  'NEW CARS': [
    {
      id: 'find-new-cars',
      label: 'Find New Cars',
      subtitle: 'Filter by budget, brand & fuel types',
      icon: Compass,
      badge: 'Explore',
      badgeColor: 'rgba(30, 165, 153, 0.15)',
      badgeTextColor: 'var(--color-teal)',
    },
    {
      id: 'new-launches',
      label: 'New Launches',
      subtitle: 'Recently arrived models in Indian market',
      icon: Flame,
      badge: 'AI Curated',
      badgeColor: 'rgba(239, 68, 68, 0.15)',
      badgeTextColor: '#ef4444',
    },
    {
      id: 'find-dealer',
      label: 'Find Dealer',
      subtitle: 'Authorized OEM showrooms near you',
      icon: MapPin,
      badge: 'Pan-India',
      badgeColor: 'rgba(59, 130, 246, 0.15)',
      badgeTextColor: '#3b82f6',
    },
    {
      id: 'videos',
      label: 'Videos & Reviews',
      subtitle: 'Expert road tests & walkarounds',
      icon: Video,
      badge: 'HD Video',
      badgeColor: 'rgba(168, 85, 247, 0.15)',
      badgeTextColor: '#a855f7',
    },
  ],
  'USED CARS': [
    {
      id: 'upcoming-cars',
      label: 'Upcoming Cars',
      subtitle: '2024-2025 expected launches & spy specs',
      icon: Clock,
      badge: 'Anticipated',
      badgeColor: 'rgba(245, 158, 11, 0.18)',
      badgeTextColor: '#f59e0b',
    },
    {
      id: 'electric-cars',
      label: 'Electric Cars',
      subtitle: 'Zero emission EVs, range & charging',
      icon: Zap,
      badge: 'Green Fleet',
      badgeColor: 'rgba(16, 185, 129, 0.18)',
      badgeTextColor: '#10b981',
    },
    {
      id: 'images',
      label: 'Images & Gallery',
      subtitle: 'HD exterior studio, cockpit & 360° views',
      icon: Camera,
      badge: 'HD Studio',
      badgeColor: 'rgba(99, 102, 241, 0.18)',
      badgeTextColor: '#6366f1',
    },
    {
      id: 'popular-brands',
      label: 'Popular Brands',
      subtitle: 'Tata, Maruti, Hyundai, Mahindra & more',
      icon: Award,
      badge: 'Top 9 OEMs',
      badgeColor: 'rgba(30, 165, 153, 0.18)',
      badgeTextColor: 'var(--color-teal)',
      hasDropdown: true,
    },
  ],
  'REVIEWS & NEWS': [
    {
      id: 'new-car-loan',
      label: 'New Car Loan',
      subtitle: 'EMI calculators & instant bank approvals',
      icon: Calculator,
      badge: 'Lowest Interest',
      badgeColor: 'rgba(16, 185, 129, 0.15)',
      badgeTextColor: '#10b981',
    },
    {
      id: 'compare-cars',
      label: 'Compare Cars',
      subtitle: 'Side-by-side technical specs & price matchup',
      icon: Scale,
      badge: 'Matchup',
      badgeColor: 'rgba(59, 130, 246, 0.15)',
      badgeTextColor: '#3b82f6',
    },
    {
      id: 'new-car-offers',
      label: 'New Car Offers',
      subtitle: 'Festive discounts, cash benefits & exchange',
      icon: Tag,
      badge: 'Savings',
      badgeColor: 'rgba(245, 158, 11, 0.15)',
      badgeTextColor: '#f59e0b',
    },
    {
      id: 'popular-cars',
      label: 'Popular Cars',
      subtitle: 'Top-selling passenger cars in India',
      icon: Star,
      badge: 'Trending',
      badgeColor: 'rgba(239, 68, 68, 0.15)',
      badgeTextColor: '#ef4444',
      hasDropdown: true,
    },
  ],
};

const POPULAR_BRANDS_QUICK = [
  'Tata Motors',
  'Maruti Suzuki',
  'Hyundai',
  'Mahindra',
  'Toyota',
  'Kia',
  'Honda',
  'Volkswagen',
  'MG Motor',
];

/**
 * TopNav — Navigation bar with dark/light theme toggle.
 */
export default function TopNav({
  onSelectCar,
  onOpenNewLaunches,
  onOpenAIChatbot,
  onOpenFindDealers,
  onOpenUpcomingCars,
  onOpenElectricCars,
  onOpenCarImages,
  onOpenPopularBrands,
}) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchHighlighted, setIsSearchHighlighted] = useState(false);
  const [activeNav, setActiveNav] = useState(null);
  const [hoveredBrandSubmenu, setHoveredBrandSubmenu] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navRef = useRef(null);
  const searchInputRef = useRef(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState('NEW CARS');

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  /**
   * Navigates directly to the 'Search new cars' bar, focuses the input,
   * and triggers an animated highlight glow effect.
   */
  const handleGoToSearch = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveNav(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsSearchHighlighted(true);
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
        setIsSearchFocused(true);
      }
    }, 150);
    setTimeout(() => {
      setIsSearchHighlighted(false);
    }, 2000);
  };

  const searchResults = searchValue.trim()
    ? INDIAN_MARKET_CARS.filter((c) => {
        const q = searchValue.toLowerCase().trim();
        return (
          c.name.toLowerCase().includes(q) ||
          c.brand.toLowerCase().includes(q) ||
          c.bodyType.toLowerCase().includes(q) ||
          c.fuelTypes.toLowerCase().includes(q) ||
          (c.aliases && c.aliases.some((a) => a.toLowerCase().includes(q))) ||
          (q === 'suzuki' && c.brand.toLowerCase().includes('maruti')) ||
          (q === 'maruti' && c.brand.toLowerCase().includes('suzuki')) ||
          (q === 'vw' && c.brand.toLowerCase().includes('volkswagen')) ||
          (q === 'volkswagen' && c.brand.toLowerCase().includes('vw')) ||
          (q === 'mg' && c.brand.toLowerCase().includes('mg')) ||
          (c.variants && c.variants.some((v) => v.name.toLowerCase().includes(q)))
        );
      })
    : [];

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveNav(null);
        setHoveredBrandSubmenu(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navLinks = ['NEW CARS', 'USED CARS', 'REVIEWS & NEWS'];

  return (
    <div ref={navRef} className="sticky top-0 z-50">
      {/* ─── Primary Nav Bar ─────────────────────────── */}
      <nav
        className="transition-colors duration-300"
        style={{
          background: 'var(--color-base)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="max-w-[1360px] mx-auto flex items-center justify-between h-14 px-5">
          {/* ─── Left: Logo + Nav ─────────────────────────── */}
          <div className="flex items-center gap-8">
            {/* Brand Logo */}
            <a href={import.meta.env.BASE_URL || '/'} className="flex items-center gap-2 shrink-0 group">
              <div
                className="h-7 w-7 rounded-[5px] flex items-center justify-center
                            group-hover:opacity-90 transition-colors"
                style={{ background: isDark ? 'rgba(255,255,255,0.9)' : 'var(--color-teal)' }}
              >
                <Car
                  className="h-4 w-4"
                  style={{ color: isDark ? 'var(--color-base)' : '#fff' }}
                  strokeWidth={2.5}
                />
              </div>
              <span
                className="text-[18px] font-bold tracking-tight leading-none"
                style={{ color: 'var(--color-text)' }}
              >
                Car<span className="text-[var(--color-teal)]">zen</span>to
              </span>
            </a>

            {/* Nav Links */}
            <ul className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <li
                  key={link}
                  className="relative"
                  onMouseEnter={() => setActiveNav(link)}
                  onMouseLeave={() => {
                    setActiveNav(null);
                    setHoveredBrandSubmenu(false);
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveNav(activeNav === link ? null : link);
                    }}
                    className="text-[11.5px] font-bold tracking-[0.06em] transition-colors
                               whitespace-nowrap cursor-pointer relative pb-1"
                    style={{
                      color: activeNav === link
                        ? 'var(--color-text)'
                        : 'var(--color-text-secondary)',
                    }}
                  >
                    {link}
                    {activeNav === link && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full
                                       bg-[var(--color-teal)]" />
                    )}
                  </button>

                  {/* Executive Dropdown Card below this link */}
                  {activeNav === link && (
                    <div
                      className="absolute left-0 top-full pt-2 z-50
                                 animate-[slideDown_180ms_ease-out_forwards]"
                    >
                      <div
                        className="backdrop-blur-xl rounded-2xl shadow-2xl p-2 min-w-[320px] max-w-[340px]"
                        style={{
                          background: 'var(--color-card)',
                          border: '1px solid var(--color-border)',
                          boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.55)',
                        }}
                      >
                        {/* Section Header Hint */}
                        <div className="px-3 py-1.5 border-b mb-1 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-neutral-400" style={{ borderColor: 'var(--color-border)' }}>
                          <span>{link} Category Hub</span>
                          <span className="text-[var(--color-teal)]">{subLinks[link]?.length || 4} Features</span>
                        </div>

                        <div className="space-y-1">
                          {subLinks[link].map((item) => {
                            const IconComponent = item.icon || Car;

                            return (
                              <div
                                key={item.id}
                                className="relative"
                                onMouseEnter={() => {
                                  if (item.id === 'popular-brands') setHoveredBrandSubmenu(true);
                                  else setHoveredBrandSubmenu(false);
                                }}
                              >
                                <a
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setActiveNav(null);
                                    setHoveredBrandSubmenu(false);

                                    if (item.id === 'find-new-cars') {
                                      handleGoToSearch(e);
                                    } else if (item.id === 'new-launches') {
                                      if (onOpenNewLaunches) onOpenNewLaunches();
                                    } else if (item.id === 'find-dealer') {
                                      if (onOpenFindDealers) onOpenFindDealers();
                                    } else if (item.id === 'upcoming-cars') {
                                      if (onOpenUpcomingCars) onOpenUpcomingCars();
                                    } else if (item.id === 'electric-cars') {
                                      if (onOpenElectricCars) onOpenElectricCars();
                                    } else if (item.id === 'images') {
                                      if (onOpenCarImages) onOpenCarImages();
                                    } else if (item.id === 'popular-brands') {
                                      if (onOpenPopularBrands) onOpenPopularBrands();
                                    } else if (item.id === 'compare-cars') {
                                      if (onOpenAIChatbot) onOpenAIChatbot();
                                    } else if (item.id === 'videos') {
                                      if (onOpenCarImages) onOpenCarImages();
                                    } else if (item.id === 'new-car-loan' || item.id === 'new-car-offers') {
                                      if (onOpenFindDealers) onOpenFindDealers();
                                    } else if (item.id === 'popular-cars') {
                                      if (onSelectCar) onSelectCar(INDIAN_MARKET_CARS[0]);
                                    }
                                  }}
                                  className="flex items-center justify-between gap-3 p-2.5 rounded-xl transition-all cursor-pointer group"
                                  style={{
                                    background: 'transparent',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--color-hover-bg)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                  }}
                                >
                                  <div className="flex items-center gap-3">
                                    {/* Icon Container */}
                                    <div
                                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                                      style={{
                                        background: item.badgeColor,
                                        color: item.badgeTextColor,
                                      }}
                                    >
                                      <IconComponent className="w-4 h-4" />
                                    </div>

                                    {/* Titles */}
                                    <div className="text-left">
                                      <div className="text-xs font-bold leading-tight" style={{ color: 'var(--color-text)' }}>
                                        {item.label}
                                      </div>
                                      <div className="text-[10.5px] leading-tight text-neutral-400 mt-0.5 line-clamp-1">
                                        {item.subtitle}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Right side: Badge or Arrow */}
                                  <div className="flex items-center gap-1 shrink-0">
                                    <span
                                      className="px-1.5 py-0.5 rounded text-[9.5px] font-bold"
                                      style={{
                                        background: item.badgeColor,
                                        color: item.badgeTextColor,
                                      }}
                                    >
                                      {item.badge}
                                    </span>
                                    {item.hasDropdown && (
                                      <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                                    )}
                                  </div>
                                </a>

                                {/* Flyout Sub-menu for Popular Brands */}
                                {item.id === 'popular-brands' && hoveredBrandSubmenu && (
                                  <div
                                    className="absolute left-full top-0 pl-2 z-50 animate-[fadeIn_150ms_ease-out_forwards]"
                                    onMouseEnter={() => setHoveredBrandSubmenu(true)}
                                    onMouseLeave={() => setHoveredBrandSubmenu(false)}
                                  >
                                    <div
                                      className="backdrop-blur-xl rounded-2xl shadow-2xl p-2.5 min-w-[200px]"
                                      style={{
                                        background: 'var(--color-card)',
                                        border: '1px solid var(--color-border)',
                                        boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.65)',
                                      }}
                                    >
                                      <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[var(--color-teal)] border-b mb-1" style={{ borderColor: 'var(--color-border)' }}>
                                        Top 9 Indian Manufacturers
                                      </div>
                                      <div className="space-y-0.5">
                                        {POPULAR_BRANDS_QUICK.map((brandName) => (
                                          <button
                                            key={brandName}
                                            onClick={(e) => {
                                              e.preventDefault();
                                              setActiveNav(null);
                                              setHoveredBrandSubmenu(false);
                                              if (onOpenPopularBrands) onOpenPopularBrands();
                                            }}
                                            className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer"
                                          >
                                            <span>{brandName}</span>
                                            <ChevronRight className="w-3 h-3 opacity-50" />
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}

              {/* AI Chatbot Option (Beside REVIEWS & NEWS) */}
              <li className="relative">
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenAIChatbot) onOpenAIChatbot();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11.5px] font-bold tracking-[0.06em] transition-all duration-200 cursor-pointer shadow-sm hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(30, 165, 153, 0.22) 0%, rgba(13, 138, 128, 0.35) 100%)',
                    color: 'var(--color-teal)',
                    border: '1px solid rgba(30, 165, 153, 0.45)',
                    boxShadow: '0 2px 10px rgba(30, 165, 153, 0.15)',
                  }}
                  title="Ask AI Car Chatbot"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[var(--color-teal)] animate-pulse" />
                  <span>AI CHATBOT</span>
                </button>
              </li>
            </ul>
          </div>

          {/* ─── Right: Search + Icons ───────────────────── */}
          <div className="flex items-center gap-3">
            {/* Search Input — Extended length with highlighted glowing border */}
            <div className="relative hidden sm:block">
              <div
                className="flex items-center rounded-full pl-3.5 pr-2 py-1.5 transition-all duration-300
                           w-72 sm:w-80 md:w-96 lg:w-[420px]"
                style={{
                  background: 'var(--color-input)',
                  border: isSearchFocused || isSearchHighlighted
                    ? '2px solid var(--color-teal)'
                    : '1.5px solid rgba(30, 165, 153, 0.45)',
                  boxShadow: isSearchFocused || isSearchHighlighted
                    ? '0 0 24px rgba(30, 165, 153, 0.45)'
                    : '0 2px 8px rgba(0, 0, 0, 0.05)',
                  transform: isSearchHighlighted ? 'scale(1.03)' : 'scale(1)',
                }}
              >
                <Search
                  className="h-4 w-4 shrink-0 mr-2.5 transition-colors"
                  style={{ color: isSearchFocused || isSearchHighlighted ? 'var(--color-teal)' : 'var(--color-text-secondary)' }}
                  strokeWidth={2.2}
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search new cars"
                  value={searchValue}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchResults.length > 0 && onSelectCar) {
                      onSelectCar(searchResults[0]);
                      setIsSearchFocused(false);
                      setSearchValue('');
                    }
                  }}
                  className="bg-transparent text-sm placeholder-neutral-400
                             border-none outline-none w-full"
                  style={{ color: 'var(--color-text)' }}
                />
                {searchValue && (
                  <button
                    type="button"
                    onClick={() => setSearchValue('')}
                    className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer mr-1"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Instant Search Suggestions Dropdown — Strictly Text Only, No Images */}
              {isSearchFocused && searchValue.trim() && (
                <div
                  className="absolute left-0 right-0 top-full mt-2 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden backdrop-blur-xl animate-[slideDown_150ms_ease-out_forwards]"
                  style={{
                    background: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {searchResults.length > 0 ? (
                    <div className="max-h-[340px] overflow-y-auto">
                      <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-teal)] flex items-center justify-between">
                        <span>Matching Indian Market Cars</span>
                        <span>{searchResults.length} found</span>
                      </div>
                      {searchResults.map((car) => (
                        <div
                          key={car.id}
                          onMouseDown={(e) => {
                            e.preventDefault(); // prevent input blur before click
                            if (onSelectCar) {
                              onSelectCar(car);
                            }
                            setIsSearchFocused(false);
                            setSearchValue('');
                          }}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--color-hover-bg)] transition-colors group cursor-pointer border-b last:border-b-0"
                          style={{ borderColor: 'var(--color-border)' }}
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span
                                className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                                style={{
                                  background: 'rgba(30, 165, 153, 0.1)',
                                  color: 'var(--color-teal)',
                                }}
                              >
                                {car.brand}
                              </span>
                              <span
                                className="text-sm font-bold group-hover:text-[var(--color-teal)] transition-colors"
                                style={{ color: 'var(--color-text)' }}
                              >
                                {car.name}
                              </span>
                            </div>
                            <div className="text-xs flex items-center gap-1.5 flex-wrap" style={{ color: 'var(--color-text-secondary)' }}>
                              <span>{car.bodyType} • {car.fuelTypes}</span>
                              {car.variants?.length > 0 && (
                                <span
                                  className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                                  style={{ background: 'rgba(255, 255, 255, 0.06)', color: 'var(--color-text-secondary)' }}
                                >
                                  {car.variants.length} Variants
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="text-xs font-black" style={{ color: 'var(--color-teal)' }}>
                              {car.priceRange}
                            </div>
                            <span
                              className="text-[10px] font-semibold text-neutral-400 group-hover:text-[var(--color-teal)] transition-colors flex items-center gap-1 justify-end"
                            >
                              Specs &amp; Variants &rarr;
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      No cars matching &ldquo;{searchValue}&rdquo; in Indian Market
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Utility Icons */}
            <div className="flex items-center gap-1">
              {/* AI Chatbot Icon */}
              <button
                type="button"
                onClick={() => {
                  if (onOpenAIChatbot) onOpenAIChatbot();
                }}
                className="p-2 rounded-full transition-colors cursor-pointer hover:bg-[var(--color-hover-bg)] flex items-center justify-center text-[var(--color-teal)]"
                title="AI Car Chatbot"
              >
                <Sparkles className="h-[18px] w-[18px]" strokeWidth={2} />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full transition-colors cursor-pointer"
                style={{ color: 'var(--color-text-secondary)' }}
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark
                  ? <Sun className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  : <Moon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                }
              </button>


              {/* User Profile / Avatar */}
              {loggedInUser ? (
                <button
                  onClick={() => setLoggedInUser(null)}
                  className="h-8 w-8 rounded-full flex items-center justify-center
                             text-sm font-bold text-white cursor-pointer transition-transform
                             hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-teal) 0%, #0d8a80 100%)',
                    boxShadow: '0 2px 10px rgba(30, 165, 153, 0.4)',
                  }}
                  title={`Signed in as ${loggedInUser} — click to sign out`}
                >
                  {loggedInUser.charAt(0).toUpperCase()}
                </button>
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="p-2 rounded-full transition-colors cursor-pointer"
                  style={{ color: 'var(--color-text-secondary)' }}
                  title="Sign in"
                >
                  <User className="h-[18px] w-[18px]" strokeWidth={1.8} />
                </button>
              )}

              {/* Mobile Hamburger Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center"
                style={{
                  color: 'var(--color-text)',
                  background: mobileMenuOpen ? 'var(--color-hover-bg)' : 'transparent',
                }}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-[var(--color-teal)]" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Horizontal Quick Category Bar ─────── */}
      <div
        className="md:hidden sticky top-14 z-30 flex items-center gap-2 overflow-x-auto px-4 py-2 border-b hide-scrollbar"
        style={{
          background: 'var(--color-card)',
          borderColor: 'var(--color-border)',
        }}
      >
        {navLinks.map((link) => (
          <button
            key={link}
            type="button"
            onClick={() => {
              if (mobileMenuOpen && mobileExpandedCategory === link) {
                setMobileMenuOpen(false);
              } else {
                setMobileExpandedCategory(link);
                setMobileMenuOpen(true);
              }
            }}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            style={{
              background:
                mobileMenuOpen && mobileExpandedCategory === link
                  ? 'rgba(30, 165, 153, 0.22)'
                  : 'rgba(255, 255, 255, 0.05)',
              color:
                mobileMenuOpen && mobileExpandedCategory === link
                  ? 'var(--color-teal)'
                  : 'var(--color-text)',
              border: '1.5px solid',
              borderColor:
                mobileMenuOpen && mobileExpandedCategory === link
                  ? 'var(--color-teal)'
                  : 'var(--color-border)',
            }}
          >
            <span>{link}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${
                mobileMenuOpen && mobileExpandedCategory === link
                  ? 'rotate-180 text-[var(--color-teal)]'
                  : 'opacity-70'
              }`}
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            if (onOpenAIChatbot) onOpenAIChatbot();
          }}
          className="px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer text-[var(--color-teal)] shadow-sm"
          style={{
            background: 'rgba(30, 165, 153, 0.15)',
            border: '1.5px solid rgba(30, 165, 153, 0.4)',
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-[var(--color-teal)]" />
          <span>AI Chatbot</span>
        </button>
      </div>

      {/* ─── Mobile Navigation Drawer ────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Mobile Drawer Panel */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[102px] left-0 right-0 z-40 max-h-[calc(100vh-6.5rem)] overflow-y-auto md:hidden border-b shadow-2xl p-4 space-y-4"
              style={{
                background: 'var(--color-card)',
                borderColor: 'var(--color-border)',
              }}
            >
              {/* Mobile Search Bar */}
              <div className="relative">
                <div
                  className="flex items-center rounded-xl px-3 py-2 border transition-all"
                  style={{
                    background: 'var(--color-input)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <Search className="h-4 w-4 mr-2 text-neutral-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search new cars, models, brands..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="bg-transparent text-xs placeholder-neutral-400 border-none outline-none w-full"
                    style={{ color: 'var(--color-text)' }}
                  />
                  {searchValue && (
                    <button
                      type="button"
                      onClick={() => setSearchValue('')}
                      className="text-neutral-400 hover:text-white"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Mobile Search Results */}
                {searchValue.trim() && (
                  <div
                    className="mt-2 rounded-xl border p-2 max-h-56 overflow-y-auto space-y-1"
                    style={{
                      background: 'var(--color-base)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    {searchResults.slice(0, 5).map((car) => (
                      <div
                        key={car.id}
                        onClick={() => {
                          if (onSelectCar) onSelectCar(car);
                          setMobileMenuOpen(false);
                          setSearchValue('');
                        }}
                        className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-white/5"
                      >
                        <div>
                          <div className="text-xs font-bold text-white">{car.name}</div>
                          <div className="text-[10px] text-neutral-400">{car.bodyType} • {car.fuelTypes}</div>
                        </div>
                        <div className="text-xs font-bold text-[var(--color-teal)]">{car.priceRange}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Categories with Expandable Inside Features */}
              <div className="space-y-2">
                {navLinks.map((category) => {
                  const isExpanded = mobileExpandedCategory === category;
                  const items = subLinks[category] || [];

                  return (
                    <div
                      key={category}
                      className="rounded-2xl border overflow-hidden transition-colors"
                      style={{
                        background: 'var(--color-base)',
                        borderColor: isExpanded ? 'rgba(30, 165, 153, 0.4)' : 'var(--color-border)',
                      }}
                    >
                      {/* Category Header Button */}
                      <button
                        type="button"
                        onClick={() =>
                          setMobileExpandedCategory(isExpanded ? null : category)
                        }
                        className="w-full flex items-center justify-between p-3.5 text-left font-bold text-xs tracking-wider transition-colors cursor-pointer"
                        style={{
                          color: isExpanded ? 'var(--color-teal)' : 'var(--color-text)',
                        }}
                      >
                        <span className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-[var(--color-teal)]" />
                          <span>{category}</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                            style={{
                              background: isExpanded ? 'rgba(30, 165, 153, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                              color: isExpanded ? 'var(--color-teal)' : 'var(--color-text-secondary)',
                            }}
                          >
                            {items.length} Features
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-[var(--color-teal)]' : 'text-neutral-400'
                            }`}
                          />
                        </div>
                      </button>

                      {/* Inside Features Accordion Body */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden border-t px-2 py-2 space-y-1"
                            style={{ borderColor: 'var(--color-border)' }}
                          >
                            {items.map((item) => {
                              const ItemIcon = item.icon || Car;
                              return (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setMobileMenuOpen(false);

                                    if (item.id === 'find-new-cars') {
                                      handleGoToSearch(e);
                                    } else if (item.id === 'new-launches') {
                                      if (onOpenNewLaunches) onOpenNewLaunches();
                                    } else if (item.id === 'find-dealer') {
                                      if (onOpenFindDealers) onOpenFindDealers();
                                    } else if (item.id === 'upcoming-cars') {
                                      if (onOpenUpcomingCars) onOpenUpcomingCars();
                                    } else if (item.id === 'electric-cars') {
                                      if (onOpenElectricCars) onOpenElectricCars();
                                    } else if (item.id === 'images') {
                                      if (onOpenCarImages) onOpenCarImages();
                                    } else if (item.id === 'popular-brands') {
                                      if (onOpenPopularBrands) onOpenPopularBrands();
                                    } else if (item.id === 'compare-cars') {
                                      if (onOpenAIChatbot) onOpenAIChatbot();
                                    } else if (item.id === 'videos') {
                                      if (onOpenCarImages) onOpenCarImages();
                                    } else if (item.id === 'new-car-loan' || item.id === 'new-car-offers') {
                                      if (onOpenFindDealers) onOpenFindDealers();
                                    } else if (item.id === 'popular-cars') {
                                      if (onSelectCar) onSelectCar(INDIAN_MARKET_CARS[0]);
                                    }
                                  }}
                                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors hover:bg-white/5 cursor-pointer"
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                      style={{
                                        background: item.badgeColor,
                                        color: item.badgeTextColor,
                                      }}
                                    >
                                      <ItemIcon className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <div
                                        className="text-xs font-bold leading-tight"
                                        style={{ color: 'var(--color-text)' }}
                                      >
                                        {item.label}
                                      </div>
                                      <div className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1">
                                        {item.subtitle}
                                      </div>
                                    </div>
                                  </div>

                                  <span
                                    className="px-2 py-0.5 rounded text-[9.5px] font-bold shrink-0"
                                    style={{
                                      background: item.badgeColor,
                                      color: item.badgeTextColor,
                                    }}
                                  >
                                    {item.badge}
                                  </span>
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Mobile AI Chatbot Banner CTA */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAIChatbot) onOpenAIChatbot();
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all shadow-md"
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 165, 153, 0.25) 0%, rgba(13, 138, 128, 0.4) 100%)',
                  border: '1px solid rgba(30, 165, 153, 0.5)',
                }}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-[var(--color-teal)] animate-pulse" />
                  <div className="text-left">
                    <div className="text-xs font-black text-white">Carzento AI Assistant</div>
                    <div className="text-[10px] text-neutral-300">Ask any automotive question instantly</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-[var(--color-teal)]">&rarr;</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onLoginSuccess={(userName) => setLoggedInUser(userName)}
      />
    </div>
  );
}
