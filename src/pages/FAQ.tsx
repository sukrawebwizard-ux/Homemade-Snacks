import React from "react";
import { useLanguage } from "../lib/LanguageContext";

const FAQ: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="mt-4 rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900 mb-3">
        {t('faq_title')}
      </h2>
      <div className="space-y-3 text-sm text-slate-700">
        <details className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2">
          <summary className="cursor-pointer font-medium">
            {t('faq_q1')}
          </summary>
          <p className="mt-1 text-xs text-slate-600">
            {t('faq_a1')}
          </p>
        </details>
        <details className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2">
          <summary className="cursor-pointer font-medium">
            {t('faq_q2')}
          </summary>
          <p className="mt-1 text-xs text-slate-600">
            {t('faq_a2')}
          </p>
        </details>
        <details className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2">
          <summary className="cursor-pointer font-medium">
            {t('faq_q3')}
          </summary>
          <p className="mt-1 text-xs text-slate-600">
            {t('faq_a3')}
          </p>
        </details>
        <details className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2">
          <summary className="cursor-pointer font-medium">
            {t('faq_q4')}
          </summary>
          <p className="mt-1 text-xs text-slate-600">
            {t('faq_a4')}
          </p>
        </details>
        <details className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2">
          <summary className="cursor-pointer font-medium">
            {t('faq_q5')}
          </summary>
          <p className="mt-1 text-xs text-slate-600">
            {t('faq_a5')}
          </p>
        </details>
      </div>
    </section>
  );
};

export default FAQ;
