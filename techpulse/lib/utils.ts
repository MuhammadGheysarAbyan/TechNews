// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createSlug(text: string): string {
  return slugify(text, { lower: true, strict: true, locale: "id" });
}

export function estimateReadTime(content: string): number {
  const wpm  = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wpm));
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

export function formatDate(date: Date | string, locale = "id-ID"): string {
  return new Date(date).toLocaleDateString(locale, {
    day: "numeric", month: "long", year: "numeric",
  });
}

export function formatRelative(date: Date | string): string {
  const diff = Date.now() - new Date(date).getTime();
  const mins  = Math.floor(diff / 60_000);
  if (mins < 1)   return "Baru saja";
  if (mins < 60)  return `${mins} menit lalu`;
  const hrs = Math.floor(mins / 60);
  if (hrs  < 24)  return `${hrs} jam lalu`;
  const days = Math.floor(hrs / 24);
  if (days < 7)   return `${days} hari lalu`;
  return formatDate(date);
}

export function truncate(str: string, len: number): string {
  return str.length <= len ? str : `${str.slice(0, len)}...`;
}

export function generateOgImageUrl(title: string, category: string): string {
  const encoded = encodeURIComponent(`${title} | ${category}`);
  return `https://og.techpulse.id/api/og?title=${encoded}`;
}

export const CATEGORY_LABELS: Record<string, string> = {
  AI:             "Artificial Intelligence",
  PROGRAMMING:    "Programming",
  GADGET:         "Gadget",
  STARTUP:        "Startup",
  CYBER_SECURITY: "Cyber Security",
};

export const CATEGORY_COLORS: Record<string, string> = {
  AI:             "emerald",
  PROGRAMMING:    "blue",
  GADGET:         "purple",
  STARTUP:        "orange",
  CYBER_SECURITY: "red",
};
