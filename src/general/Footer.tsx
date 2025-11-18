import React from "react";

const Footer: React.FC = () => (
  <footer className="mt-16 border-t bg-slate-50">
    <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-slate-600 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-medium">Homemade Snacks – Subscription Service</p>
        <p>• Fresh homemade small-batch snacks</p>
      </div>
      <div className="flex gap-4 items-center">
        {/* <button
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
          onClick={() => {
            const phone = "+35600000000"; // replace with real number
            window.open(`https://wa.me/${phone}`, "_blank");
          }}
        >
          <span className="text-lg">💬</span> WhatsApp
        </button> */}
        {/* <div className="flex gap-3 text-lg">
          <a href="#" className="hover:text-slate-800" aria-label="Instagram">
            Add a review
          </a>
          <a href="#" className="hover:text-slate-800" aria-label="Facebook">
            👍
          </a>
        </div> */}
      </div>
    </div>
  </footer>
);

export default Footer;
