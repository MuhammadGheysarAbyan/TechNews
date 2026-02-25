// types/index.ts
import { Article, User, Comment, Tag, Category, Status, Role } from "@prisma/client";

export type { Category, Status, Role };

export type ArticleWithRelations = Article & {
  author: Pick<User, "id" | "name" | "avatar" | "bio" | "role">;
  tags:   { tag: Tag }[];
  _count: { comments: number; likes: number; bookmarks: number };
};

export type CommentWithAuthor = Comment & {
  author:  Pick<User, "id" | "name" | "avatar">;
  replies: (Comment & { author: Pick<User, "id" | "name" | "avatar"> })[];
};

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?:   T;
  error?:  string;
  meta?:   PaginationMeta;
};

export type PaginationMeta = {
  page:       number;
  limit:      number;
  total:      number;
  totalPages: number;
  hasNext:    boolean;
  hasPrev:    boolean;
};

export type DashboardStats = {
  totalArticles:    number;
  totalUsers:       number;
  totalViews:       number;
  totalComments:    number;
  totalNewsletters: number;
  viewsByMonth:     { month: string; views: number }[];
  topArticles:      Pick<Article, "id" | "title" | "views" | "slug">[];
  categoryDist:     { category: Category; count: number }[];
};

export interface NavItem {
  label: string;
  href:  string;
  icon?: string;
}
