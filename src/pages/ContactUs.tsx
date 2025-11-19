import React from "react";

const ContactUs: React.FC = () => {
  return (
    <aside className="rounded-2xl border bg-white p-5 shadow-sm">
      <h1 className="text-2xl font-semibold text-slate-900 mb-2">
        Contact Us
      </h1>
      <p className="text-sm text-slate-600 mb-4">
        Have a question about our homemade snack subscription, delivery areas or plans? Send us
        a message and we’ll get back to you via WhatsApp or email.
      </p>
      <div className="space-y-2 text-sm text-slate-700">
        <ul className="space-y-2 text-sm text-slate-700 list-disc pl-4">
          <li>Ask anything about our weekly, bi-weekly or monthly snack plans</li>
          <li>Check if we deliver to your area</li>
          <li>Request details about bulk orders or special occasions</li>
          <li>Share feedback or suggestions — we love hearing from you!</li>
        </ul>
      </div>
    </aside>
  );
};

export default ContactUs;
