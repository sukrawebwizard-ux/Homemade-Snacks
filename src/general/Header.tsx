import React, { useState } from "react";

interface HeaderProps {
  onNavigate: (to: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [open, setOpen] = useState(false);

  const handleNav = (to: string) => {
    onNavigate(to);
    setOpen(false); // close mobile menu after navigation
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-amber-600 text-white text-[10px] md:text-xs font-semibold text-center py-2 px-4 shadow-sm relative z-30">
        ✨ No credit card required! Pay via Cash or Revolut only when you receive your order.
      </div>

      <header className="sticky top-0 z-20 w-full border-b border-amber-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:py-4">
          {/* Logo + Brand */}
          <button
            onClick={() => handleNav("/")}
            className="flex items-center gap-2 focus:outline-none"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-400 text-white text-lg font-bold shadow-sm">
              HS
            </span>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-base font-semibold tracking-tight md:text-lg">
                Homemade Snacks
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-amber-700/70 md:text-xs">
                Fresh · Crispy · Daily
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
            <button
              className="hover:text-amber-600 transition-colors"
              onClick={() => handleNav("/")}
            >
              Home
            </button>
            <button
              className="hover:text-amber-600 transition-colors"
              onClick={() => handleNav("/plans")}
            >
              Subscription Plans
            </button>
            <button
              className="hover:text-amber-600 transition-colors"
              onClick={() => handleNav("/contact")}
            >
              Contact
            </button>

            <button
              onClick={() => handleNav("/plans")}
              className="rounded-full bg-amber-500 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
            >
              Subscribe Now
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-800 md:hidden focus:outline-none focus:ring-2 focus:ring-amber-500/70"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Open main menu</span>
            <div className="flex h-5 w-6 flex-col justify-between">
              <span
                className={`h-0.5 w-full rounded-full bg-slate-900 transition-transform ${open ? "translate-y-2 rotate-45" : ""
                  }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-slate-900 transition-opacity ${open ? "opacity-0" : "opacity-100"
                  }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-slate-900 transition-transform ${open ? "-translate-y-2 -rotate-45" : ""
                  }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="border-t border-amber-100 bg-white md:hidden">
            <div className="mx-auto flex max-w-5xl flex-col px-4 py-2 text-sm font-medium text-slate-800">
              <button
                className="w-full rounded-md px-2 py-2 text-left hover:bg-amber-50"
                onClick={() => handleNav("/")}
              >
                Home
              </button>
              <button
                className="w-full rounded-md px-2 py-2 text-left hover:bg-amber-50"
                onClick={() => handleNav("/plans")}
              >
                Subscription Plans
              </button>
              <button
                className="w-full rounded-md px-2 py-2 text-left hover:bg-amber-50"
                onClick={() => handleNav("/contact")}
              >
                Contact
              </button>
              <button
                className="mt-2 w-full rounded-full bg-amber-500 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-amber-600"
                onClick={() => handleNav("/plans")}
              >
                Subscribe Now
              </button>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
