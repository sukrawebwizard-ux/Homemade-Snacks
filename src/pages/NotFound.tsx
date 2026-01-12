import React from 'react';

interface NotFoundProps {
    onNavigate: (path: string) => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onNavigate }) => {
    return (
        <main className="min-h-[70vh] flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8 animate-fade-in-up">

                {/* Visual 404 element */}
                <div className="relative mx-auto w-48 h-48 select-none">
                    <div className="absolute inset-0 flex items-center justify-center text-[10rem] font-bold text-slate-100 dark:text-slate-800 leading-none">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-8xl filter drop-shadow-xl animate-bounce-slow">🍪</span>
                    </div>
                    {/* Crumbs decoration */}
                    <div className="absolute bottom-10 right-10 w-3 h-3 bg-amber-400 rounded-full opacity-60 animate-pulse"></div>
                    <div className="absolute top-10 left-8 w-2 h-2 bg-orange-400 rounded-full opacity-60"></div>
                    <div className="absolute bottom-6 left-12 w-2 h-2 bg-yellow-500 rounded-full opacity-60"></div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Oh no! We ate that page.
                    </h1>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        The snack you're looking for seems to be missing from our pantry.
                        It might have been delicious, but it's gone now.
                    </p>
                </div>

                <div className="pt-4">
                    <button
                        onClick={() => onNavigate('/')}
                        className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-lg shadow-amber-200 hover:shadow-orange-200 hover:scale-[1.02] active:scale-[0.98] ring-offset-2 focus:ring-2 ring-amber-400 outline-none"
                    >
                        <span>Return to Kitchen</span>
                        <svg
                            className="w-5 h-5 transition-transform group-hover:-translate-x-1 rotate-180"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>

            </div>
        </main>
    );
};

export default NotFound;
