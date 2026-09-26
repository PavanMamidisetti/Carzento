import { getAssetUrl } from '../utils/assetHelper';

/**
 * HeroBanner — Full-width edge-to-edge scenic hero image.
 */
export default function HeroBanner() {
  return (
    <section>
      <div className="relative w-full overflow-hidden">
        {/* ─── Hero Image ──────────────────────────────── */}
        <div className="relative w-full aspect-[2.35/1] min-h-[320px] max-h-[520px]">
          <img
            src={getAssetUrl('hero-banner.jpg?v=2')}
            alt="White SUV on a beach with a family"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}

