import React from "react";
import { Snack } from "../subscriptionData";

type Variant = "minimal" | "colorful" | "glass";

interface ProductModalProps {
    snack: Snack;
    isOpen: boolean;
    onClose: () => void;
    variant?: Variant;
}

const getCategoryIcon = (category: string) => {
    switch (category) {
        case "sweets": return "🍩";
        case "spicy": return "🔥";
        case "salt": return "🥨";
        default: return "🍘";
    }
};

const ProductModal: React.FC<ProductModalProps> = ({ snack, isOpen, onClose, variant = "colorful" }) => {
    if (!isOpen) return null;

    // --- VARIATION 1: MINIMAL ---
    if (variant === "minimal") {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
                <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                    <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors">
                        <svg className="w-5 h-5 text-slate-400 hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-32 h-32 mb-6 rounded-full bg-slate-50 flex items-center justify-center p-4">
                            <img src={snack.image} alt={snack.name} className="w-full h-full object-contain drop-shadow-md" />
                        </div>

                        <span className="text-xs font-semibold tracking-wider text-amber-500 uppercase mb-2">{snack.category}</span>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">{snack.name}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">{snack.description}</p>

                        <div className="w-full flex items-center justify-between pt-6 border-t border-slate-100">
                            <span className="text-2xl font-bold text-slate-900">€{snack.price.toFixed(2)}</span>
                            <span className="text-sm font-medium text-slate-400">{snack.unit}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- VARIATION 2: COLORFUL / BURST ---
    if (variant === "colorful") {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
                <div className="bg-white rounded-3xl overflow-hidden max-w-sm w-full shadow-2xl relative animate-in slide-in-from-bottom-4 duration-300" onClick={(e) => e.stopPropagation()}>

                    {/* Header Image Section */}
                    <div className="relative h-48 bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-sm transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <img src={snack.image} alt={snack.name} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 h-10 bg-white rounded-t-[2rem] z-10"></div>
                    </div>

                    <div className="px-8 pb-8 text-center -mt-4 relative z-10">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-widest mb-3">
                            <span>{getCategoryIcon(snack.category)}</span> {snack.category}
                        </div>

                        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{snack.name}</h3>
                        <p className="text-slate-600 text-sm mb-6 leading-relaxed">{snack.description}</p>

                        <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-4 border border-slate-100">
                            <div className="text-left">
                                <p className="text-[10px] text-slate-400 uppercase font-bold">Price</p>
                                <p className="text-xl font-bold text-slate-900">€{snack.price.toFixed(2)}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-slate-400 uppercase font-bold">Unit</p>
                                <p className="text-sm font-bold text-slate-700">{snack.unit}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    // --- VARIATION 3: GLASS / PREMIUM DARK ---
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>

                <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="flex flex-col gap-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-1">Featured Snack</h3>
                            <h2 className="text-3xl font-bold text-white">{snack.name}</h2>
                        </div>
                        <div className="text-2xl">{getCategoryIcon(snack.category)}</div>
                    </div>

                    <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-amber-500/10 blur-3xl rounded-full transform translate-y-12"></div>
                        <img src={snack.image} alt={snack.name} className="w-32 h-32 object-contain drop-shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    <div>
                        <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-slate-700 pl-4">
                            {snack.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                        <div className="flex-1 bg-slate-800 rounded-xl p-3 flex items-center justify-between border border-slate-700">
                            <span className="text-slate-400 text-xs">Unit</span>
                            <span className="text-white font-medium">{snack.unit}</span>
                        </div>
                        <div className="flex-1 bg-amber-500 rounded-xl p-3 flex items-center justify-between shadow-lg shadow-amber-500/20">
                            <span className="text-amber-900 text-xs font-bold uppercase">Price</span>
                            <span className="text-white font-bold text-lg">€{snack.price.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductModal;
