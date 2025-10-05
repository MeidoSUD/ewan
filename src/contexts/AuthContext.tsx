import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { login as apiLogin, signup as apiSignup, logout as apiLogout, getProfile as apiGetProfile } from '@/services/api';

export type Role = 'student' | 'teacher' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

interface AuthResult {
  ok: boolean;
  error?: string;
  user?: User | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (payload: { email: string; password: string }) => Promise<AuthResult>;
  signup: (payload: { name: string; email: string; password: string; role?: Role }) => Promise<AuthResult>;
  logout: () => Promise<void>;
}

const STORAGE_KEY = 'auth:state';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize auth state synchronously from localStorage to avoid routing flashes
  const initial = (() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as { user: User; token: string };
      const tokenOnly = localStorage.getItem('auth_token');
      if (tokenOnly) return { user: null, token: tokenOnly } as any;
    } catch {
      /* ignore */
    }
    return null;
  })();

  const [user, setUser] = useState<User | null>(initial ? initial.user : null);
  const [token, setToken] = useState<string | null>(initial ? initial.token : null);

  useEffect(() => {
    // keep two storage keys in sync: auth_token (simple token) and auth:state (token + user)
    if (token) localStorage.setItem('auth_token', token);
    else localStorage.removeItem('auth_token');

    if (user && token) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user, token]);

  function mapRole(userObj: any): Role | null {
    if (!userObj) return null;
    // Accept different shapes: user.role (string) or user.role_id (number)
    if (userObj.role && typeof userObj.role === 'string') return userObj.role as Role;
    const id = userObj.role_id ?? userObj.roleId ?? userObj.roleId;
    if (id === 4) return 'student';
    if (id === 3) return 'teacher';
    if (id === 2) return 'student'; // visitor map to student/visitor
    return null;
  }

  const login: AuthContextType['login'] = async ({ email, password }) => {
    try {
      const data = await apiLogin({ email, password });
      if (!data || !data.token) {
        return { ok: false, error: 'Invalid response from server' };
      }
      setToken(data.token);
      const profile = await apiGetProfile(data.token).catch(() => data.user || null);
      const finalUser = profile || data.user || null;
      // normalize role
      if (finalUser) {
        const r = mapRole(finalUser) || (finalUser.role as Role) || 'student';
        finalUser.role = r;
        setUser(finalUser);
      }
      return { ok: true, user: finalUser };
    } catch (e: any) {
      return { ok: false, error: e?.message || 'Network error' };
    }
  };

  const signup: AuthContextType['signup'] = async ({ name, email, password, role }) => {
    try {
      const data = await apiSignup({ name, email, password, role });
      if (!data || !data.token) {
        return { ok: false, error: 'Invalid response from server' };
      }
      setToken(data.token);
      const profile = await apiGetProfile(data.token).catch(() => data.user || null);
      const finalUser = profile || data.user || null;
      if (finalUser) {
        const r = mapRole(finalUser) || (finalUser.role as Role) || role || 'student';
        finalUser.role = r;
        setUser(finalUser);
      }
      return { ok: true, user: finalUser };
    } catch (e: any) {
      return { ok: false, error: e?.message || 'Network error' };
    }
  };

  const logout: AuthContextType['logout'] = async () => {
    try {
      if (token) await apiLogout(token).catch(() => {});
    } finally {
      setUser(null);
      setToken(null);
    }
  };

  const value = useMemo<AuthContextType>(() => ({
    user,
    token,
    isAuthenticated: Boolean(user && token),
    login,
    signup,
    logout,
  }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const noopAsync = async (..._args: any[]) => ({ ok: false, error: 'Auth provider not initialized' });
const defaultAuth: AuthContextType = {
  user: null,
  token: null,
  isAuthenticated: false,
  login: noopAsync as any,
  signup: noopAsync as any,
  logout: async () => {},
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    // Return a safe default instead of throwing, to avoid runtime crashes when provider isn't mounted yet.
    return defaultAuth;
  }
  return ctx;
};
