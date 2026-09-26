import { ChevronDown } from 'lucide-react';

/**
 * NavMegaMenu — The dark mega-menu panel that slides below the nav bar.
 * It displays three columns of links corresponding to the nav categories.
 */

const menuData = {
  'NEW CARS': [
    'Find New Cars',
    'New Launches',
    'Find Dealer',
    'Videos',
  ],
  'USED CARS': [
    'Upcoming Cars',
    'Electric Cars',
    'Images',
    { label: 'Popular Brands', hasDropdown: true },
  ],
  'REVIEWS & NEWS': [
    'New Car Loan',
    'Compare Cars',
    'New Car Offers',
    { label: 'Popular Cars', hasDropdown: true },
  ],
};

const tabKeys = Object.keys(menuData);

export default function NavMegaMenu({ activeTab, onTabChange, visible }) {
  return (
    <div
      className={`absolute left-0 right-0 top-full z-40 transition-all duration-200 ease-out
        ${visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
    >
      {/* Glass-like dark card */}
      <div className="bg-[var(--color-dark-card)] border-t border-b border-white/[0.06]
                      shadow-2xl">
        <div className="max-w-[1360px] mx-auto px-5 py-6">
          {/* ── Tab Headers ─────────────────────────────── */}
          <div className="flex gap-14 mb-6">
            {tabKeys.map((tab) => (
              <button
                key={tab}
                onMouseEnter={() => onTabChange(tab)}
                onClick={() => onTabChange(tab)}
                className={`relative pb-2.5 text-[11.5px] font-bold tracking-[0.08em]
                            transition-colors cursor-pointer
                  ${activeTab === tab
                    ? 'text-white'
                    : 'text-neutral-500 hover:text-neutral-300'
                  }`}
              >
                {tab}
                {/* Teal underline indicator */}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full
                              transition-all duration-200
                    ${activeTab === tab
                      ? 'bg-[var(--color-teal)] scale-x-100'
                      : 'bg-transparent scale-x-0'
                    }`}
                />
              </button>
            ))}
          </div>

          {/* ── Link Columns ────────────────────────────── */}
          <div className="flex gap-14">
            {tabKeys.map((tab) => (
              <div key={tab} className="min-w-[160px]">
                <ul className="space-y-4">
                  {menuData[tab].map((item) => {
                    const label = typeof item === 'string' ? item : item.label;
                    const hasDropdown = typeof item === 'object' && item.hasDropdown;

                    return (
                      <li key={label}>
                        <a
                          href="#"
                          className={`flex items-center gap-1.5 text-[13px] transition-colors
                            ${activeTab === tab
                              ? 'text-neutral-300 hover:text-white'
                              : 'text-neutral-600 hover:text-neutral-400'
                            }`}
                        >
                          {label}
                          {hasDropdown && (
                            <ChevronDown className="h-3.5 w-3.5 opacity-60" strokeWidth={2} />
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
