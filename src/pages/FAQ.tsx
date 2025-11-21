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
            If I subscribe today, when will I receive my first delivery?
          </summary>
          <p className="mt-1 text-xs text-slate-600">
            Once you subscribe, we’ll add you to our upcoming delivery batch.
            We will be in touch via WhatsApp to confirm your order and delivery
            date. If you choose the bi-weekly plan you will receive your first box in
            1-2 weeks, and for the monthly plan within 3-4 weeks.
          </p>
        </details>
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
            Do you offer Sample Box orders, or only subscriptions?
          </summary>
          <p className="mt-1 text-xs text-slate-600">
            Yes, we do offer one-time orders. You can try our Sample Box, where you
            can choose your own customised snacks. Our main focus is on weekly and
            bi-weekly subscriptions, but if you need bulk quantities for events or
            special occasions, feel free to contact us — we’ll be happy to help.
          </p>
        </details>
        <details className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2">
          <summary className="cursor-pointer font-medium">
            Can I cancel my subscription anytime?
          </summary>
          <p className="mt-1 text-xs text-slate-600">
            Yes! You can cancel your subscription anytime with no charges or fees. Simply reach out via WhatsApp on the same number we contacted you, and we'll remove you from our subscription list. If you'd like to rejoin in the future, you're always welcome back.
          </p>
        </details>
      </div>
    </section>
  );
};

export default FAQ;
