import React from "react";

interface HeaderProps {
  onNavigate: (to: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="w-full border-b bg-white/80 backdrop-blur sticky top-0 z-20">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate("/")}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white font-bold text-lg">
            HS
          </span>
          <span className="font-semibold text-lg tracking-tight">
            Homemade Snacks
          </span>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-700">
          <button
            className="hover:text-amber-600 transition-colors"
            onClick={() => onNavigate("/")}
          >
            Home
          </button>
          <button
            className="hover:text-amber-600 transition-colors"
            onClick={() => onNavigate("/plans")}
          >
            Subscription Plans
          </button>
          <button
            className="hover:text-amber-600 transition-colors"
            onClick={() => onNavigate("/contact")}
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
