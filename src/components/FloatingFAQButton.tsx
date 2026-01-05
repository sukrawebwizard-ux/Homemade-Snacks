import React, { useState, useEffect } from "react";
import { useLanguage } from "../lib/LanguageContext";

interface Props {
    onNavigate: (to: string) => void;
}

const FloatingFAQButton: React.FC<Props> = ({ onNavigate }) => {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const [textState, setTextState] = useState<'hidden' | 'expanding' | 'visible' | 'collapsing'>('hidden');

    useEffect(() => {
        // Show button after 60 seconds
        const showTimer = setTimeout(() => {
            setIsVisible(true);
            // Start text animation after button appears
            setTimeout(() => setTextState('expanding'), 500);
        }, 60000); // 60 seconds

        return () => clearTimeout(showTimer);
    }, []);

    useEffect(() => {
        if (textState === 'expanding') {
            // Show text - slower transition
            const visibleTimer = setTimeout(() => {
                setTextState('visible');
            }, 800);
            return () => clearTimeout(visibleTimer);
        } else if (textState === 'visible') {
            // Keep visible for 6 seconds then collapse
            const collapseTimer = setTimeout(() => {
                setTextState('collapsing');
            }, 6000);
            return () => clearTimeout(collapseTimer);
        } else if (textState === 'collapsing') {
            // After collapsing, hide for a moment then restart
            const hideTimer = setTimeout(() => {
                setTextState('hidden');
                // Restart animation after 4 seconds
                setTimeout(() => setTextState('expanding'), 4000);
            }, 800);
            return () => clearTimeout(hideTimer);
        }
    }, [textState]);

    useEffect(() => {
        if (isVisible) {
            // Hide button after 60 seconds of being visible
            const hideTimer = setTimeout(() => {
                setTextState('collapsing');
                setTimeout(() => {
                    setIsVisible(false);
                    setTextState('hidden');
                    // Show again after another 60 seconds
                    setTimeout(() => {
                        setIsVisible(true);
                        setTimeout(() => setTextState('expanding'), 500);
                    }, 60000);
                }, 800);
            }, 60000); // 60 seconds

            return () => clearTimeout(hideTimer);
        }
    }, [isVisible]);

    const handleClick = () => {
        onNavigate("/contact");
        setTextState('collapsing');
        setTimeout(() => setIsVisible(false), 300);

        // Scroll to FAQ section after navigation
        setTimeout(() => {
            const faqElement = document.getElementById("faq");
            if (faqElement) {
                faqElement.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 100);
    };

    if (!isVisible) return null;

    return (
        <div
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-0 transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
        >
            {/* Animated text bubble - directional reveal tooltip */}
            <div
                className={`bg-white rounded-2xl shadow-lg px-4 py-3 border border-slate-200 overflow-hidden ${textState === 'expanding' || textState === 'visible'
                        ? "opacity-100 translate-x-0 scale-100 mr-3 max-w-xs"
                        : "opacity-0 translate-x-8 scale-90 mr-0 max-w-0 px-0"
                    }`}
                style={{
                    transformOrigin: 'right center',
                    transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
            >
                <p className={`text-sm font-medium text-slate-900 whitespace-nowrap transition-all duration-300 ${textState === 'expanding' || textState === 'visible' ? 'opacity-100' : 'opacity-0'
                    }`}>
                    {t('faq_float_text')}
                </p>
            </div>

            {/* Question mark button */}
            <button
                onClick={handleClick}
                className="group relative bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce flex-shrink-0"
                aria-label="FAQ"
            >
                <span className="text-2xl font-bold">?</span>

                {/* Pulse ring animation */}
                <span className="absolute inset-0 rounded-full bg-amber-400 opacity-75 animate-ping"></span>
            </button>
        </div>
    );
};

export default FloatingFAQButton;
