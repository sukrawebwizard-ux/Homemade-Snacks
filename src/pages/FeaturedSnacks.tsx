import React from "react";
import { SNACKS } from "../subscriptionData";

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
  return (
    <section>
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
            className="bg-white rounded-3xl shadow-md border border-slate-100 px-4 py-3 flex items-center justify-between gap-3"
          >
            {/* LEFT TEXT */}
            <div className="flex flex-col gap-1 min-w-0">
              <h3 className="font-semibold text-slate-900 text-sm truncate">
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
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 shadow-inner flex items-center justify-center overflow-hidden">
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
