import React from "react";

const FAQ: React.FC = () => {
  return (
    <section className="mt-4 rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900 mb-3">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3 text-sm text-slate-700">
        <details className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2">
          <summary className="cursor-pointer font-medium">
            Which areas do you deliver to?
          </summary>
          <p className="mt-1 text-xs text-slate-600">
            We currently deliver in and around Birkirkara and nearby
            localities in Malta. Send us a message with your area and we’ll
            confirm.
          </p>
        </details>
        <details className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2">
          <summary className="cursor-pointer font-medium">
            Can I change my delivery day after subscribing?
          </summary>
          <p className="mt-1 text-xs text-slate-600">
            Yes, you can message us on WhatsApp to request a change. We’ll
            try our best to adjust based on our cooking schedule.
          </p>
        </details>
        <details className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2">
          <summary className="cursor-pointer font-medium">
            Do you offer one-time orders, or only subscriptions?
          </summary>
          <p className="mt-1 text-xs text-slate-600">
            For now we focus on weekly and bi-weekly subscriptions, but you
            can contact us if you need a one-time batch for a special
            occasion.
          </p>
        </details>
      </div>
    </section>
  );
};

export default FAQ;
