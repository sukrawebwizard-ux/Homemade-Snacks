import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface HeroSectionProps {
  onNavigate: (to: string) => void;
}

interface Testimonial {
  id: string;
  avatar: string;
  name: string;
  rating: number;
  message: string;
  photo: string | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('id, avatar, name, rating, message, photo')
        .gte('rating', 4)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setTestimonials(data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (testimonials.length === 0) return;

    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(id);
  }, [testimonials]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? "text-yellow-400 text-sm" : "text-gray-300 text-sm"}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (loading || testimonials.length === 0) {
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
      </section>
    );
  }

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

        <div className="flex items-center gap-2 text-[10px] md:text-xs text-slate-500 pt-1">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-600">
            🛡️
          </span>
          <span>
            <strong>No card required.</strong> Pay via Cash or Revolut on delivery.
          </span>
        </div>
      </div>

      {/* RIGHT SIDE: Testimonial + Photo */}
      <div className="relative">
        <div className="aspect-[4/3] w-full rounded-3xl p-5 bg-gradient-to-tr from-amber-100 via-rose-50 to-orange-100 shadow-inner border border-amber-100 flex items-center justify-center">
          <div className="w-[92%] h-[92%] bg-white/80 backdrop-blur rounded-2xl p-5 shadow-md border border-amber-100 flex flex-col gap-4">

            {/* Profile + name + avatar */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center text-3xl border border-amber-200 shadow">
                {active.avatar}
              </div>
              <div>
                <p className="font-semibold text-slate-900">{active.name}</p>
                <div>{renderStars(active.rating)}</div>
              </div>
            </div>

            {/* Message/Quote */}
            <p className="text-sm text-slate-800 leading-relaxed">
              "{active.message}"
            </p>

            {/* Photo if uploaded */}
            {active.photo && (
              <img
                src={active.photo}
                alt="review"
                className="w-full h-32 md:h-40 object-cover rounded-xl shadow border border-amber-100"
              />
            )}

            {/* Dots */}
            <div className="flex items-center gap-2 pt-2 self-center">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all ${idx === activeIndex ? "w-4 bg-amber-600" : "w-2 bg-amber-300"
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
