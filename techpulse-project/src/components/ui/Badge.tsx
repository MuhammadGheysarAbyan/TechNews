'use client';

import { CATEGORY_BADGE_COLORS } from '@/lib/utils';

interface BadgeProps {
    category: string;
    size?: 'sm' | 'md';
}

const LIGHT_COLORS: Record<string, string> = {
    "AI": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Programming": "bg-blue-50 text-blue-700 border-blue-200",
    "Gadget": "bg-purple-50 text-purple-700 border-purple-200",
    "Startup": "bg-orange-50 text-orange-700 border-orange-200",
    "Cyber Security": "bg-red-50 text-red-700 border-red-200",
};

export default function Badge({ category, size = 'sm' }: BadgeProps) {
    const colorClass = LIGHT_COLORS[category] || 'bg-gray-100 text-gray-600 border-gray-200';
    const sizeClass = size === 'md' ? 'px-3 py-1 text-sm' : 'px-2.5 py-0.5 text-xs';

    return (
        <span className={`inline-flex items-center rounded-full font-semibold border ${colorClass} ${sizeClass}`}>
            {category}
        </span>
    );
}
