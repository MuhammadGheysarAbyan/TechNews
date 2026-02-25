// components/article/PopularTags.tsx
import Link from "next/link";
import type { Tag } from "@prisma/client";

export function PopularTags({ tags }: { tags: Tag[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link key={tag.id} href={`/tag/${tag.slug}`}
          className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs hover:border-emerald-500/40 hover:text-emerald-400 transition-all">
          #{tag.name}
        </Link>
      ))}
    </div>
  );
}
