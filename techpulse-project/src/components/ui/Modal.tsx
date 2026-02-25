'use client';

import { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center p-4 animate-fadeIn">
            <div className="absolute inset-0" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl animate-scaleIn max-w-lg w-full">
                {children}
            </div>
        </div>
    );
}
