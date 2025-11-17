import React, { useEffect, useState } from "react";

interface HeroSectionProps {
  onNavigate: (to: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const gallery = [
    "Fresh Unniyappam batch",
    "Golden Banana Chips",
    "Family snack box",
    "Mixture & savouries",
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setGalleryIndex((i) => (i + 1) % gallery.length);
    }, 3000);
    return () => clearInterval(id);
  }, [gallery.length]);

  return (
    <section className="grid md:grid-cols-2 gap-10 items-center mb-16">
      <div className="space-y-5">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 bg-amber-50 rounded-full px-3 py-1">
          <span className="text-base">🥰</span> Homemade Snack Subscription
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Fresh Homemade Snacks,
          <br /> Delivered to Your Door.
        </h1>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
          Weekly or bi-weekly snack boxes filled with Kerala-style homemade goodies. Small
          batches, made with care, and delivered fresh to your home.
        </p>
        <ul className="space-y-1 text-sm text-slate-700">
          <li className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> Homemade in small, limited batches
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> Flexible weekly / bi-weekly plans
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> Free WhatsApp confirmation for every order
          </li>
        </ul>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => onNavigate("/plans")}
            className="inline-flex items-center justify-center rounded-full bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 text-sm font-semibold shadow-sm transition-colors"
          >
            Subscribe Now
          </button>
          <button
            onClick={() => onNavigate("/plans")}
            className="inline-flex items-center justify-center rounded-full border border-amber-200 text-amber-700 hover:bg-amber-50 px-5 py-2 text-xs font-medium"
          >
            View Subscription Plans
          </button>
        </div>
      </div>
      {/* Right: rotating gallery */}
      <div className="relative">
        <div className="aspect-[4/3] w-full rounded-3xl bg-gradient-to-tr from-amber-100 via-rose-50 to-orange-100 flex items-center justify-center shadow-inner border border-amber-100">
          <div className="w-[80%] h-[80%] rounded-2xl bg-white/70 backdrop-blur flex flex-col items-center justify-center p-4 shadow-md border border-amber-100">
            <span className="text-5xl mb-3">🥨</span>
            <p className="text-sm font-semibold text-slate-800 mb-1">
              {gallery[galleryIndex]}
            </p>
            <p className="text-xs text-slate-500 text-center">
              Snack photos will rotate here – perfect place for your real product images.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
