import React from "react";
import type { Plan } from "../subscriptionData";
import { capitalize } from "../utils";

interface Props {
  plans: Plan[];
  onNavigate: (to: string) => void;
}

const ChooseYourSubscriptionPlan: React.FC<Props> = ({ plans, onNavigate }) => {
  const renderFrequencyLabel = (freq: Plan["default_frequency"]) => {
    if (freq === "bi-weekly") return "Bi-weekly delivery ";
    if (freq === "monthly") return "Monthly delivery";
    // Fallback, in case you add more types later
    return capitalize(freq);
  };

  return (
    <section className="mb-12">
      <section className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          Choose Your Subscription Plan
        </h1>
        <p className="text-sm text-slate-600">
          Select bi-weekly or monthly delivery, and we’ll handle the rest.
          Bi-weekly plans are delivered every 2 weeks.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        {plans
          .filter((plan) => plan.id !== 3) // 👈 hide Sample Box plan from the grid
          .map((plan) => {
            const isPopular = plan.default_frequency === "bi-weekly";

            return (
              <article
                key={plan.id}
                className="relative rounded-2xl border bg-white p-5 pt-7 shadow-sm flex flex-col"
              >
                {isPopular && (
                  <div className="absolute inset-x-0 -top-3 flex justify-center">
                    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-md">
                       Most popular
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {plan.name}
                    </h2>
                    <p className="text-xs text-slate-600 mt-1">
                      {plan.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                      Frequency
                    </p>
                    <p className="text-sm font-semibold text-amber-700">
                      {renderFrequencyLabel(plan.default_frequency)}
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-[11px] font-semibold text-slate-700 mb-1">
                    What you get
                  </p>
                  <ul className="text-[11px] text-slate-600 list-disc pl-4 space-y-0.5">
                    <li>Mix of sweet, spicy and savoury Kerala-style snacks</li>
                    <li>
                      Freshly prepared in small batches for your delivery day
                    </li>
                    <li>
                      Room to customise what you like more (sweets, spicy,
                      salt)
                    </li>
                  </ul>
                </div>

                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="text-[11px] text-slate-500">
                    <p className="font-semibold text-slate-700 mb-0.5">
                      Delivery days available
                    </p>
                    <p>
                      {plan.delivery_days_available
                        .map((d) => capitalize(d))
                        .join(", ")}
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate(`/subscribe?plan_id=${plan.id}`)}
                    className="inline-flex items-center justify-center rounded-full bg-amber-500 hover:bg-amber-600 text-white px-4 py-1.5 text-xs font-semibold shadow-sm"
                  >
                    Choose Plan
                  </button>
                </div>
              </article>
            );
          })}
      </section>
    </section>
  );
};

export default ChooseYourSubscriptionPlan;
