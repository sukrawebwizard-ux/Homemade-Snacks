import React from "react";

const NotSureWhichPlanCTA: React.FC = () => {
  return (
    <section className="rounded-2xl border bg-emerald-50 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-emerald-900 mb-1">
          Not sure which plan suits you?
        </p>
        <p className="text-xs text-emerald-800">
          Message us on WhatsApp and we’ll recommend the perfect box for your
          family.
        </p>
      </div>
      <button
        className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 text-xs font-semibold shadow-sm"
        onClick={() => {
          const phone = "+35600000000"; // replace with your real WhatsApp number
          window.open(`https://wa.me/${phone}`, "_blank");
        }}
      >
        <span className="text-base">💬</span> Chat on WhatsApp
      </button>
    </section>
  );
};

export default NotSureWhichPlanCTA;
