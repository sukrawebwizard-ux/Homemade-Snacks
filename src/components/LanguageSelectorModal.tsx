import React from 'react';
import { useLanguage, Language } from '../lib/LanguageContext';

interface LanguageOption {
    code: Language;
    nativeName: string;
    englishName: string;
    flag?: string; // Optional emoji flag if we want
}

const languages: LanguageOption[] = [
    { code: 'en', nativeName: 'English', englishName: 'English' },
    { code: 'ml', nativeName: 'മലയാളം', englishName: 'Malayalam' },
    { code: 'hi', nativeName: 'हिंदी', englishName: 'Hindi' },
    { code: 'ta', nativeName: 'தமிழ்', englishName: 'Tamil' },
    { code: 'te', nativeName: 'తెలుగు', englishName: 'Telugu' },
    { code: 'kn', nativeName: 'ಕನ್ನಡ', englishName: 'Kannada' },
    { code: 'mt', nativeName: 'Malti', englishName: 'Maltese' },
];

interface LanguageSelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({ isOpen, onClose }) => {
    const { setLanguage, language: currentLanguage } = useLanguage();

    if (!isOpen) return null;

    const handleSelect = (lang: Language) => {
        setLanguage(lang);
        onClose(); // Close after selection
    };

    return (
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
                <div
                    className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300 relative text-left"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Decorative Header */}
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-6 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-white/10 skew-y-3 transform origin-bottom-left"></div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white relative z-10">
                            Choose Your Language
                        </h2>
                        <p className="text-amber-50 relative z-10 mt-1 font-medium">
                            Select your preferred language to continue
                        </p>
                        {/* Close button just in case user wants to dismiss without choosing (though we encourage choosing) */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors z-20"
                            aria-label="Close"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Language Grid */}
                    <div className="p-6 md:p-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleSelect(lang.code)}
                                className={`
                                    group relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200
                                    ${currentLanguage === lang.code
                                        ? 'border-amber-500 bg-amber-50'
                                        : 'border-slate-100 bg-white hover:border-amber-200 hover:shadow-lg hover:-translate-y-0.5'
                                    }
                                `}
                            >
                                <span className={`text-xl font-bold mb-1 ${currentLanguage === lang.code ? 'text-amber-600' : 'text-slate-800 group-hover:text-amber-600'}`}>
                                    {lang.nativeName}
                                </span>
                                <span className="text-xs font-medium text-slate-400 uppercase tracking-wide group-hover:text-amber-500/80">
                                    {lang.englishName}
                                </span>

                                {/* Selected Indicator */}
                                {currentLanguage === lang.code && (
                                    <div className="absolute top-3 right-3 text-amber-500">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Footer / Context */}
                    <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                        <p className="text-xs text-slate-400">
                            You can always change this later in the application settings.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LanguageSelectorModal;
