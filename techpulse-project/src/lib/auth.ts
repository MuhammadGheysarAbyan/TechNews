// src/lib/auth.ts — Admin authentication with role-based access

export type UserRole = 'super_admin' | 'editor' | 'writer';

export interface AdminUser {
  email: string;
  password: string;
  name: string;
  role: string;
  roleKey: UserRole;
  avatar: string;
}

// Role permissions matrix
export interface RolePermissions {
  canViewOverview: boolean;
  canViewArticles: boolean;
  canCreateArticle: boolean;
  canEditAnyArticle: boolean;
  canEditOwnArticle: boolean;
  canDeleteArticle: boolean;
  canPublish: boolean;        // can set status to "published"
  canViewUsers: boolean;
  canManageUsers: boolean;
  canViewAnalytics: boolean;
  canViewSettings: boolean;
  canEditSettings: boolean;
  canViewMedia: boolean;
  canManageMedia: boolean;
  visibleTabs: string[];
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  super_admin: {
    canViewOverview: true,
    canViewArticles: true,
    canCreateArticle: true,
    canEditAnyArticle: true,
    canEditOwnArticle: true,
    canDeleteArticle: true,
    canPublish: true,
    canViewUsers: true,
    canManageUsers: true,
    canViewAnalytics: true,
    canViewSettings: true,
    canEditSettings: true,
    canViewMedia: true,
    canManageMedia: true,
    visibleTabs: ['overview', 'articles', 'editor', 'media', 'users', 'analytics', 'settings'],
  },
  editor: {
    canViewOverview: true,
    canViewArticles: true,
    canCreateArticle: true,
    canEditAnyArticle: true,
    canEditOwnArticle: true,
    canDeleteArticle: false,   // editors can't delete
    canPublish: true,
    canViewUsers: false,
    canManageUsers: false,
    canViewAnalytics: true,
    canViewSettings: false,
    canEditSettings: false,
    canViewMedia: true,
    canManageMedia: true,
    visibleTabs: ['overview', 'articles', 'editor', 'media', 'analytics'],
  },
  writer: {
    canViewOverview: false,
    canViewArticles: true,     // can see list, but only own articles
    canCreateArticle: true,
    canEditAnyArticle: false,
    canEditOwnArticle: true,
    canDeleteArticle: false,
    canPublish: false,         // writers submit for review, can't publish directly
    canViewUsers: false,
    canManageUsers: false,
    canViewAnalytics: false,
    canViewSettings: false,
    canEditSettings: false,
    canViewMedia: true,
    canManageMedia: false,
    visibleTabs: ['articles', 'editor', 'media'],
  },
};

export function getPermissions(roleKey: UserRole): RolePermissions {
  return ROLE_PERMISSIONS[roleKey];
}

// Hardcoded admin accounts
export const ADMIN_ACCOUNTS: AdminUser[] = [
  { email: 'admin@techpulse.id', password: 'admin123', name: 'Admin Utama', role: 'Super Admin', roleKey: 'super_admin', avatar: 'AU' },
  { email: 'editor@techpulse.id', password: 'editor123', name: 'Rina Hartanto', role: 'Editor', roleKey: 'editor', avatar: 'RH' },
  { email: 'writer@techpulse.id', password: 'writer123', name: 'Dimas Pratama', role: 'Writer', roleKey: 'writer', avatar: 'DP' },
];

export function authenticateAdmin(email: string, password: string): { success: boolean; user?: AdminUser; error?: string } {
  if (!email.trim()) return { success: false, error: 'Email tidak boleh kosong' };
  if (!password.trim()) return { success: false, error: 'Password tidak boleh kosong' };

  const user = ADMIN_ACCOUNTS.find(
    (a) => a.email.toLowerCase() === email.toLowerCase()
  );

  if (!user) return { success: false, error: 'Email tidak terdaftar sebagai admin' };
  if (user.password !== password) return { success: false, error: 'Password salah. Silakan coba lagi.' };

  return { success: true, user };
}

// Session management (localStorage)
const SESSION_KEY = 'techpulse_admin_session';

export function saveSession(user: AdminUser) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ ...user, password: undefined, loginAt: new Date().toISOString() }));
  }
}

export function getSession(): (Omit<AdminUser, 'password'> & { loginAt: string }) | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch { return null; }
}

export function clearSession() {
  if (typeof window !== 'undefined') localStorage.removeItem(SESSION_KEY);
}

// Role hierarchy for API authorization
const ROLE_HIERARCHY: Record<string, number> = {
  'USER': 0,
  'WRITER': 1,
  'EDITOR': 2,
  'ADMIN': 3,
  'super_admin': 3,
  'editor': 2,
  'writer': 1,
};

export function requireRole(userRole: string, minimumRole: string): boolean {
  return (ROLE_HIERARCHY[userRole] || 0) >= (ROLE_HIERARCHY[minimumRole] || 0);
}

// Stub: In production, decode JWT token to get user. For demo, returns null.
export async function getUserFromToken(token: string): Promise<{ id: string; email: string; name: string; role: string } | null> {
  // In a real app, verify and decode the JWT here
  if (!token) return null;
  const account = ADMIN_ACCOUNTS.find((a) => a.email === token);
  if (account) return { id: '1', email: account.email, name: account.name, role: account.roleKey };
  return null;
}

// Authentication stubs for API routes
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  // Fast comparison for demo purposes
  return password === hash;
}

export async function signToken(payload: any): Promise<string> {
  // Return fake token for demo
  return 'demo_token_' + (payload.id || '1');
}
