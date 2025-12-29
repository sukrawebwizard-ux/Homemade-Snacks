import React, { useState } from "react";
import { SNACKS, Snack } from "../subscriptionData";

// Small category icon
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "sweets":
      return "🍩";
    case "spicy":
      return "🔥";
    case "salt":
      return "🥨";
    default:
      return "🍘"; 
  }
};

const FeaturedSnacks: React.FC = () => {
  const [selectedSnack, setSelectedSnack] = useState<Snack | null>(null);

  return (
    <section>
      {/* MODAL POPUP */}
      {selectedSnack && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all duration-300"
          onClick={() => setSelectedSnack(null)}
        >
          <div 
            className="bg-white rounded-[2rem] p-6 max-w-sm w-full shadow-2xl relative transform transition-all scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedSnack(null)}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>

            <div className="flex flex-col items-center text-center pt-2">
              {/* Image */}
              <div className="w-32 h-32 mb-5 rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 shadow-inner p-4 flex items-center justify-center">
                <img
                  src={selectedSnack.image}
                  alt={selectedSnack.name}
                  className="w-full h-full object-contain drop-shadow-sm"
                />
              </div>

              {/* Title & Category */}
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                {selectedSnack.name}
              </h3>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-4 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                <span>{getCategoryIcon(selectedSnack.category)}</span>
                <span className="capitalize">{selectedSnack.category}</span>
                <span className="text-slate-300">•</span>
                <span>{selectedSnack.unit}</span>
              </div>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed mb-6">
                {selectedSnack.description}
              </p>

              {/* Price & Action */}
              <div className="w-full bg-amber-50 rounded-2xl p-4 border border-amber-100 flex items-center justify-between">
                <div className="text-left">
                  <div className="text-xs text-amber-700 font-medium uppercase tracking-wider">Price</div>
                  <div className="text-xl font-bold text-amber-900">€{selectedSnack.price.toFixed(2)}</div>
                </div>
                <button 
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-xl transition shadow-lg shadow-amber-200"
                  onClick={() => setSelectedSnack(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Featured Snacks
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          A sneak peek at the homemade goodies that may appear in your box.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {SNACKS.map((snack) => (
          <div
            key={snack.id}
            onClick={() => setSelectedSnack(snack)}
            className="group cursor-pointer bg-white rounded-3xl shadow-md border border-slate-100 px-4 py-3 flex items-center justify-between gap-3 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-amber-100"
          >
            {/* LEFT TEXT */}
            <div className="flex flex-col gap-1 min-w-0">
              <h3 className="font-semibold text-slate-900 text-sm truncate group-hover:text-amber-700 transition-colors">
                {snack.name}
              </h3>

              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <span className="text-[13px]">{getCategoryIcon(snack.category)}</span>
                <span className="truncate">
                  {snack.unit} •{" "}
                  {snack.category === "sweets"
                    ? "Sweet"
                    : snack.category === "spicy"
                    ? "Spicy"
                    : "Savory"}
                </span>
              </p>

              <p className="text-xs font-semibold text-amber-600">
                €{snack.price.toFixed(2)}
              </p>
            </div>

            {/* RIGHT: Product Image */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 shadow-inner flex items-center justify-center overflow-hidden transition-transform group-hover:rotate-6">
                <img
                  src={snack.image}
                  alt={snack.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSnacks;
