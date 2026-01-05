import React from "react";
import { useLanguage } from "../lib/LanguageContext";

const ContactUs: React.FC = () => {
  const { t } = useLanguage();

  return (
    <aside className="rounded-2xl border bg-white p-5 shadow-sm">
      <h1 className="text-2xl font-semibold text-slate-900 mb-2">
        {t('contact_title')}
      </h1>
      <p className="text-sm text-slate-600 mb-4">
        {t('contact_description')}
      </p>
      <div className="space-y-2 text-sm text-slate-700">
        <ul className="space-y-2 text-sm text-slate-700 list-disc pl-4">
          <li>{t('contact_point_1')}</li>
          <li>{t('contact_point_2')}</li>
          <li>{t('contact_point_3')}</li>
          <li>{t('contact_point_4')}</li>
        </ul>
      </div>
    </aside>
  );
};

export default ContactUs;
