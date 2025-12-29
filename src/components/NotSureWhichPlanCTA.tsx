import React from "react";
import { useLanguage } from "../lib/LanguageContext";

interface Props {
  onNavigate: (to: string) => void;
}

const NotSureWhichPlanCTA: React.FC<Props> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const handleSampleClick = () => {
    onNavigate("/subscribe?plan_id=3");
  };

  return (
    <section className="rounded-2xl border border-amber-100 bg-amber-50/80 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-amber-900 mb-1">
          {t('cta_title')}
        </p>
        <p className="text-xs text-amber-800 mb-2">
          {t('cta_desc_start')}
          <span className="font-semibold">{t('cta_sample_box')}</span>
          {t('cta_desc_end')}
        </p>
        <ul className="text-[11px] text-amber-900/90 list-disc pl-4 space-y-0.5">
          <li>{t('cta_feature_1')}</li>
          <li>{t('cta_feature_2')}</li>
          <li>{t('cta_feature_3')}</li>
        </ul>
      </div>

      <div className="flex md:flex-col items-start md:items-end gap-2 md:gap-3">
        <p className="text-[11px] text-amber-900/80 md:text-right">
          {t('cta_price_from')} <span className="font-semibold">€10.00</span>{" "}
          <br className="hidden md:block" />
          {t('cta_price_note')}
        </p>
        <button
          className="inline-flex items-center gap-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 text-xs font-semibold shadow-sm"
          onClick={handleSampleClick}
        >
          <span className="text-base">✨</span>
          {t('cta_btn_try')}
        </button>
      </div>
    </section>
  );
};

export default NotSureWhichPlanCTA;
