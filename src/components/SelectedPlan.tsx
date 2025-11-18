import React from "react";
import type { Plan } from "../subscriptionData";
import { capitalize } from "../utils";

interface SelectedPlanProps {
  plan: Plan;
}

const SelectedPlan: React.FC<SelectedPlanProps> = ({ plan }) => {
  const isSampleBox = String(plan.id) === "3";

  const frequencyLabel = isSampleBox
    ? "Sample box (one-time, no subscription)"
    : plan.default_frequency === "bi-weekly"
    ? "Bi-weekly delivery "
    : "Monthly delivery";

  return (
    <div className="mb-4 rounded-xl border border-dashed bg-amber-50/60 px-4 py-3 text-[11px] text-slate-700">
      <p className="font-semibold text-amber-800 text-xs mb-1">
        Selected plan: {plan.name}
      </p>
      <p className="mb-1">
        {frequencyLabel} • Delivery days:{" "}
        {plan.delivery_days_available.map((d) => capitalize(d)).join(", ")}
      </p>
      <p className="text-[11px] text-slate-500">
        {isSampleBox
          ? "This is a one-time sample box. You can choose a recurring plan later."
          : "You can still adjust frequency and day below."}
      </p>
    </div>
  );
};

export default SelectedPlan;
