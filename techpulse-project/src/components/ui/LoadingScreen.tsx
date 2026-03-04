'use client';

import { useState, useEffect } from 'react';

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setShow(false), 500);
                    return 100;
                }
                return prev + Math.random() * 15 + 5;
            });
        }, 120);
        return () => clearInterval(timer);
    }, []);

    if (!show) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-700 ${progress >= 100 ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
                }`}
            style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f0f9ff 100%)',
            }}
        >
            {/* Animated gradient mesh background */}
            <div className="absolute inset-0 gradient-mesh opacity-60" />

            {/* Floating dots */}
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full animate-float"
                    style={{
                        width: `${6 + i * 3}px`,
                        height: `${6 + i * 3}px`,
                        background: `rgba(0, 102, 255, ${0.06 + i * 0.02})`,
                        top: `${15 + i * 12}%`,
                        left: `${10 + i * 15}%`,
                        animationDelay: `${i * 0.8}s`,
                        animationDuration: `${5 + i}s`,
                    }}
                />
            ))}

            {/* Logo + Brand */}
            <div className="relative mb-8 z-10">
                {/* Pulse rings behind logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-accent-500/10 animate-breathe" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-3xl bg-accent-500/5 animate-breathe" style={{ animationDelay: '1s' }} />
                </div>

                <div className="relative flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center text-white font-black text-xl shadow-glow-blue transition-all duration-300">
                        T
                    </div>
                    <span className="text-gray-900 font-black text-3xl tracking-tight">
                        Tech<span className="gradient-text">Pulse</span>
                    </span>
                </div>
            </div>

            {/* Progress bar */}
            <div className="relative w-56 h-1.5 bg-gray-200/60 rounded-full overflow-hidden z-10">
                <div
                    className="h-full rounded-full transition-all duration-300 ease-out"
                    style={{
                        width: `${Math.min(progress, 100)}%`,
                        background: 'linear-gradient(90deg, #0066ff, #00ccff, #0066ff)',
                        backgroundSize: '200% 100%',
                        animation: 'gradientShift 2s ease infinite',
                    }}
                />
            </div>

            {/* Percentage + Loading text */}
            <div className="flex items-center gap-2 mt-4 z-10">
                <p className="text-gray-400 text-xs font-mono tracking-wider">
                    {Math.min(Math.round(progress), 100)}%
                </p>
                <span className="text-gray-300">·</span>
                <p className="text-gray-400 text-xs">
                    Memuat konten terbaru...
                </p>
            </div>
        </div>
    );
}
