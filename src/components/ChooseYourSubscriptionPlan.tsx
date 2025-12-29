import React from "react";
import type { Plan } from "../subscriptionData";
import { capitalize } from "../utils";
import { useLanguage } from "../lib/LanguageContext";

interface Props {
  plans: Plan[];
  onNavigate: (to: string) => void;
}

const ChooseYourSubscriptionPlan: React.FC<Props> = ({ plans, onNavigate }) => {
  const { t } = useLanguage();

  const renderFrequencyLabel = (freq: Plan["default_frequency"]) => {
    if (freq === "bi-weekly") return t('val_biweekly');
    if (freq === "monthly") return t('val_monthly');
    return capitalize(freq);
  };

  return (
    <section className="mb-12">
      <section className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          {t('plans_title')}
        </h1>
        <p className="text-sm text-slate-600 mb-4">
          {t('plans_subtitle')}
        </p>

        {/* TRUST BANNER */}
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs px-4 py-2 rounded-xl">
          <span className="text-lg">💳</span>
          <span>
            <strong>{t('no_payment_banner')}</strong>
          </span>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        {plans
          .filter((plan) => plan.id !== 3) // 👈 hide Sample Box plan from the grid
          .map((plan) => {
            const isPopular = plan.default_frequency === "bi-weekly";

            // Fallback for plan name/desc if we only have translations for id=1 and id=2
            // We use plan.id to construct keys: plan_1_name, plan_2_name, etc.
            const nameKey = `plan_${plan.id}_name`;
            const descKey = `plan_${plan.id}_desc`;

            // If the key strictly doesn't exist in our dictionary logic (LanguageContext returns key if missing),
            // you might want a check. But here t() returns the key if missing.
            // For safety, let's trust we added 1 and 2.
            // If we have more plans later, we must add them to LanguageContext or fallback to plan.name

            // A small hack: check if t(key) === key. If so, use plan.name (english default from DB)
            // But t() defaults to English if key exists but lang missing.
            // If key is totally missing in 'translations' object, t() returns key.
            // Let's just use t(). We added plan_1 and plan_2.

            return (
              <article
                key={plan.id}
                className="relative rounded-2xl border bg-white p-5 pt-7 shadow-sm flex flex-col"
              >
                {isPopular && (
                  <div className="absolute inset-x-0 -top-3 flex justify-center">
                    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-md">
                      {t('label_most_popular')}
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {t(nameKey) !== nameKey ? t(nameKey) : plan.name}
                    </h2>
                    <p className="text-xs text-slate-600 mt-1">
                      {t(descKey) !== descKey ? t(descKey) : plan.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                      {t('label_frequency')}
                    </p>
                    <p className="text-sm font-semibold text-amber-700">
                      {renderFrequencyLabel(plan.default_frequency)}
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-[11px] font-semibold text-slate-700 mb-1">
                    {t('label_what_you_get')}
                  </p>
                  <ul className="text-[11px] text-slate-600 list-disc pl-4 space-y-0.5">
                    <li>{t('feature_1')}</li>
                    <li>{t('feature_2')}</li>
                    <li>{t('feature_3')}</li>
                  </ul>
                </div>

                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="text-[11px] text-slate-500">
                    <p className="font-semibold text-slate-700 mb-0.5">
                      {t('label_delivery_days')}
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
                    {t('btn_choose_plan')}
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
