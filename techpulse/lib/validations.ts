// lib/validations.ts
import { z } from "zod";

export const loginSchema = z.object({
  email:    z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const registerSchema = z.object({
  name:     z.string().min(2, "Nama minimal 2 karakter").max(50),
  email:    z.string().email("Email tidak valid"),
  password: z.string()
    .min(8, "Password minimal 8 karakter")
    .regex(/[A-Z]/, "Harus ada huruf kapital")
    .regex(/[0-9]/, "Harus ada angka"),
});

export const articleSchema = z.object({
  title:        z.string().min(5,  "Judul minimal 5 karakter").max(200),
  excerpt:      z.string().min(10, "Ringkasan minimal 10 karakter").max(500),
  content:      z.string().min(50, "Konten minimal 50 karakter"),
  category:     z.enum(["AI", "PROGRAMMING", "GADGET", "STARTUP", "CYBER_SECURITY"]),
  status:       z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  featuredImage:z.string().url().optional().or(z.literal("")),
  isFeatured:   z.boolean().default(false),
  isTrending:   z.boolean().default(false),
  seoTitle:     z.string().max(70).optional(),
  seoDesc:      z.string().max(160).optional(),
  tags:         z.array(z.string()).max(10).default([]),
});

export const commentSchema = z.object({
  content:  z.string().min(3, "Komentar terlalu pendek").max(1000),
  parentId: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email("Email tidak valid"),
});

export const searchSchema = z.object({
  q:        z.string().optional(),
  category: z.string().optional(),
  tag:      z.string().optional(),
  page:     z.coerce.number().min(1).default(1),
  limit:    z.coerce.number().min(1).max(50).default(12),
});

export type LoginInput        = z.infer<typeof loginSchema>;
export type RegisterInput     = z.infer<typeof registerSchema>;
export type ArticleInput      = z.infer<typeof articleSchema>;
export type CommentInput      = z.infer<typeof commentSchema>;
export type NewsletterInput   = z.infer<typeof newsletterSchema>;
export type SearchInput       = z.infer<typeof searchSchema>;
