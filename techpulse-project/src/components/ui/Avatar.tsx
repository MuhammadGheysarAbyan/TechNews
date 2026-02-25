'use client';

import { Author } from '@/lib/data';

interface AvatarProps {
    author: Author;
    size?: 'sm' | 'md' | 'lg';
}

export default function Avatar({ author, size = 'sm' }: AvatarProps) {
    const sizes = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-14 h-14 text-base',
    };

    return (
        <div
            className={`${sizes[size]} rounded-full bg-accent-500 flex items-center justify-center font-bold text-white flex-shrink-0 shadow-sm`}
        >
            {author.avatar}
        </div>
    );
}
