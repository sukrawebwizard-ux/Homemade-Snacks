import React, { useEffect, useState } from "react";

interface HeroSectionProps {
  onNavigate: (to: string) => void;
}

interface Testimonial {
  quote: string;
  name: string;
  area: string;
  boxType: string;
  photo: string;      
  reviewImage: string; 
}

const testimonials: Testimonial[] = [
  {
    quote:
      "The unniyappam tastes exactly like Kerala. My kids wait excitedly for the snack box every time!",
    name: "Anu S.",
    area: "Birkirkara",
    boxType: "Monthly Snack Box",
    photo: "/testimonials/anu.png",
    reviewImage: "/testimonials/c1.jpg"
  },
  {
    quote:
      "Perfect for our busy weeks. The bi-weekly box is fresh, delicious and always on time.",
    name: "Jithin & Maria",
    area: "Mosta",
    boxType: "Bi-weekly Family Box",
    photo: "/testimonials/jithin.png",
    reviewImage: "/testimonials/c1.jpg"
  },
  {
    quote:
      "I tried the sample box first and instantly subscribed. Great taste and great service.",
    name: "Rahul K.",
    area: "Msida",
    boxType: "Sample Snack Box",
    photo: "/testimonials/jithin.png",
    reviewImage: "/testimonials/jibin.png"
  }
];

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const active = testimonials[activeIndex];

  return (
    <section className="grid md:grid-cols-2 gap-10 items-center mb-16">

      {/* LEFT SIDE */}
      <div className="space-y-5">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 bg-amber-50 rounded-full px-3 py-1">
          <span className="text-base">🥰</span> Homemade Snack Subscription
        </p>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Fresh Homemade Snacks,
          <br /> Delivered to Your Door.
        </h1>

        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
          Bi-weekly or monthly snack boxes filled with Kerala-style homemade goodies.
        </p>

        <ul className="space-y-1 text-sm text-slate-700">
          <li className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> Small-batch homemade snacks
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> Bi-weekly / Monthly delivery options
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> WhatsApp confirmation included
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
            View Plans
          </button>
        </div>
      </div>

      {/* RIGHT SIDE: Testimonial + EXTRA IMAGE */}
      <div className="relative">
        <div className="aspect-[4/3] w-full rounded-3xl p-5 bg-gradient-to-tr from-amber-100 via-rose-50 to-orange-100 shadow-inner border border-amber-100 flex items-center justify-center">
          <div className="w-[92%] h-[92%] bg-white/80 backdrop-blur rounded-2xl p-5 shadow-md border border-amber-100 flex flex-col gap-4">

            {/* Profile + name */}
            <div className="flex items-center gap-3">
              <img
                src={active.photo}
                className="w-14 h-14 rounded-full object-cover border border-amber-200 shadow"
                alt={active.name}
              />
              <div>
                <p className="font-semibold text-slate-900">{active.name}</p>
                <p className="text-xs text-slate-500">
                  {active.area} • {active.boxType}
                </p>
              </div>
            </div>

            {/* Quote */}
            <p className="text-sm text-slate-800 leading-relaxed">
              “{active.quote}”
            </p>

            {/* NEW IMAGE BELOW QUOTE */}
            <img
              src={active.reviewImage}
              alt="review"
              className="w-full h-32 md:h-40 object-cover rounded-xl shadow border border-amber-100"
            />

            {/* Dots */}
            <div className="flex items-center gap-2 pt-2 self-center">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === activeIndex ? "w-4 bg-amber-600" : "w-2 bg-amber-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
