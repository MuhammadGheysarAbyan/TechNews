'use client';

import { useState, useEffect, createContext, useContext } from 'react';

// Toast types
interface Toast {
    id: number;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
}

const ICONS: Record<string, string> = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
};

const COLORS: Record<string, string> = {
    success: 'bg-emerald-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-blue-600 text-white',
    warning: 'bg-amber-500 text-white',
};

// Context
interface ToastContextType {
    showToast: (type: Toast['type'], message: string) => void;
}
const ToastContext = createContext<ToastContextType>({ showToast: () => { } });
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (type: Toast['type'], message: string) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, type, message }]);
        setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-[200] space-y-2 pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`${COLORS[toast.type]} pointer-events-auto px-4 py-3 rounded-lg shadow-lg flex items-center gap-2.5 min-w-[280px] max-w-sm animate-slideDown`}
                    >
                        <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px] font-bold flex-shrink-0">
                            {ICONS[toast.type]}
                        </span>
                        <p className="text-[13px] font-medium leading-tight">{toast.message}</p>
                        <button
                            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                            className="ml-auto text-white/60 hover:text-white text-sm flex-shrink-0"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
