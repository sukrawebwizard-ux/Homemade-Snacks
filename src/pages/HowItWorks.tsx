import React from "react";

interface HowItWorksProps {
  onNavigate: (to: string) => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-slate-900">How It Works</h2>
        <p className="text-sm text-slate-600 mt-1">
          Simple, flexible subscription for fresh homemade snacks.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl border bg-white p-5 shadow-sm flex flex-col gap-2">
          <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
            1
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">Choose a plan</h3>
          <p className="text-xs text-slate-600">
            Pick a monthly or bi-weekly snack box that matches your cravings.
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm flex flex-col gap-2">
          <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
            2
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">Choose delivery day</h3>
          <p className="text-xs text-slate-600">
            Select the day that works best for you. We’ll plan our cooking around it.
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm flex flex-col gap-2">
          <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
            3
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">Enjoy fresh snacks</h3>
          <p className="text-xs text-slate-600">
            Receive freshly prepared homemade snacks at your doorstep.
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
