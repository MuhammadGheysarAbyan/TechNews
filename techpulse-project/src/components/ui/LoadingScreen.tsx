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
                    setTimeout(() => setShow(false), 300);
                    return 100;
                }
                return prev + Math.random() * 18 + 6;
            });
        }, 100);
        return () => clearInterval(timer);
    }, []);

    if (!show) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center transition-opacity duration-400 ${progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
        >
            <div className="mb-6">
                <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-accent-500 flex items-center justify-center text-white font-black text-lg shadow-md">
                        T
                    </div>
                    <span className="text-gray-900 font-black text-2xl tracking-tight">
                        Tech<span className="text-accent-500">Pulse</span>
                    </span>
                </div>
            </div>
            <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-accent-500 rounded-full transition-all duration-200 ease-out"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                />
            </div>
            <p className="text-gray-400 text-xs mt-3 font-mono">{Math.min(Math.round(progress), 100)}%</p>
        </div>
    );
}
