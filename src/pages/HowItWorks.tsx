import React from "react";
import { useLanguage } from "../lib/LanguageContext";

interface HowItWorksProps {
  onNavigate: (to: string) => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-[1.075rem] leading-[1.55rem] md:text-[1.65rem] md:leading-[2rem] font-semibold text-slate-900">{t('how_it_works_title')}</h2>
        <p className="text-[0.775rem] leading-[1.25rem] md:text-base text-slate-600 mt-1">
          {t('how_it_works_desc')}
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl border bg-white p-5 shadow-sm flex flex-col gap-2">
          <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
            1
          </div>
          <h3 className="font-semibold text-slate-900 text-[0.775rem] leading-[1.25rem]">{t('step_1_title')}</h3>
          <p className="text-[0.775rem] leading-[1.25rem] text-slate-600">
            {t('step_1_desc')}
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm flex flex-col gap-2">
          <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
            2
          </div>
          <h3 className="font-semibold text-slate-900 text-[0.775rem] leading-[1.25rem]">{t('step_2_title')}</h3>
          <p className="text-[0.775rem] leading-[1.25rem] text-slate-600">
            {t('step_2_desc')}
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm flex flex-col gap-2">
          <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
            3
          </div>
          <h3 className="font-semibold text-slate-900 text-[0.775rem] leading-[1.25rem]">{t('step_3_title')}</h3>
          <p className="text-[0.775rem] leading-[1.25rem] text-slate-600">
            {t('step_3_desc')}
          </p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={() => onNavigate("/plans")}
          className="inline-flex items-center justify-center rounded-full bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 text-sm font-semibold shadow-sm"
        >
          View Subscription Plans
        </button>
      </div>
    </section>
  );
};

export default HowItWorks;
