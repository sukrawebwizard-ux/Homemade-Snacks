import React, { useState } from "react";
import { useLanguage } from "../lib/LanguageContext";

interface HeaderProps {
  onNavigate: (to: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const handleNav = (to: string) => {
    onNavigate(to);
    setOpen(false); // close mobile menu after navigation
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ml', label: 'മലയാളം' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'mt', label: 'Malti' },
  ] as const;

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

            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="appearance-none cursor-pointer hover:text-amber-600 transition-colors font-semibold text-amber-800 bg-amber-50 pl-3 pr-8 py-1 rounded-full text-xs shadow-sm border border-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-amber-800">
                <svg className="h-3 w-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
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
              <div className="w-full rounded-md px-2 py-2 flex items-center justify-between hover:bg-amber-50">
                <span>Language</span>
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                    className="appearance-none cursor-pointer font-bold text-amber-600 bg-transparent pr-6 text-right focus:outline-none"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-amber-600">
                    <svg className="h-3 w-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
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
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
