import React from "react";

interface Props {
  onNavigate: (to: string) => void;
}

const NotSureWhichPlanCTA: React.FC<Props> = ({ onNavigate }) => {
  const handleSampleClick = () => {
    onNavigate("/subscribe?plan_id=3");
  };

  return (
    <section className="rounded-2xl border border-amber-100 bg-amber-50/80 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-amber-900 mb-1">
          Unsure which subscription works best?
        </p>
        <p className="text-xs text-amber-800 mb-2">
          Start with our one-time{" "}
          <span className="font-semibold">Sample Snack Box</span>. Taste a mix
          of our sweet, spicy and salted Kerala snacks before you commit to a
          subscription.
        </p>
        <ul className="text-[11px] text-amber-900/90 list-disc pl-4 space-y-0.5">
          <li>No subscription, one-time order only</li>
          <li>Curated mix of our most-loved snacks</li>
          <li>Perfect to decide which plan fits your family</li>
        </ul>
      </div>

      <div className="flex md:flex-col items-start md:items-end gap-2 md:gap-3">
        <p className="text-[11px] text-amber-900/80 md:text-right">
          From <span className="font-semibold">€10.00</span>{" "}
          <br className="hidden md:block" />
          (introductory sample box)
        </p>
        <button
          className="inline-flex items-center gap-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 text-xs font-semibold shadow-sm"
          onClick={handleSampleClick}
        >
          <span className="text-base">✨</span>
          Try Sample Snack Box
        </button>
      </div>
    </section>
  );
};

export default NotSureWhichPlanCTA;
