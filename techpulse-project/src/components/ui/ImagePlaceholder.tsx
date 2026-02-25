'use client';

import Image from 'next/image';
import { IMAGE_CONFIGS } from '@/lib/data';

interface ImagePlaceholderProps {
    type: string;
    className?: string;
}

export default function ImagePlaceholder({ type, className = '' }: ImagePlaceholderProps) {
    const config = IMAGE_CONFIGS[type] || IMAGE_CONFIGS.ai;
    const imagePath = `/images/articles/${type}.png`;

    return (
        <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
            <Image
                src={imagePath}
                alt={config.label}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={type === 'ai' || type === 'gadget' || type === 'security'}
            />
        </div>
    );
}
