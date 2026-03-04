'use client';

import { TAGS } from '@/lib/data';

interface PopularTagsProps {
    onTagClick: (tag: string) => void;
}

export default function PopularTags({ onTagClick }: PopularTagsProps) {
    return (
        <section className="mb-8">
            <h3 className="text-gray-900 font-bold text-lg mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                </div>
                Tag Populer
            </h3>
            <div className="flex flex-wrap gap-2">
                {TAGS.map((tag, i) => (
                    <button
                        key={tag}
                        onClick={() => onTagClick(tag)}
                        className="px-3.5 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 text-xs font-medium hover:border-accent-300 hover:text-accent-600 hover:bg-accent-50 hover:shadow-sm transition-all duration-300 hover:-translate-y-0.5"
                        style={{ animationDelay: `${i * 30}ms` }}
                    >
                        #{tag}
                    </button>
                ))}
            </div>
        </section>
    );
}
