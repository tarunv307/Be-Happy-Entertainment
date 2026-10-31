import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: { email: string; role: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data }: { data: { session: any } }) => {
        if (data?.session?.user) {
          setUser({ email: data.session.user.email || 'admin@kavinproduction.com', role: 'admin' });
        }
        setIsLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
        if (session?.user) {
          setUser({ email: session.user.email || 'admin@kavinproduction.com', role: 'admin' });
        } else {
          setUser(null);
        }
      });

      return () => subscription.unsubscribe();
    } else {
      // Offline/Local Demo Mode: check localStorage for saved admin session
      const savedUser = localStorage.getItem('kavin_admin_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          setUser(null);
        }
      }
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      // Map domain alias to confirmed Supabase user if domain lacks external MX records
      const authEmail =
        email.toLowerCase().trim() === 'admin@kavinproduction.com'
          ? 'kavinproduction.official@gmail.com'
          : email.trim();

      const { data, error } = await supabase.auth.signInWithPassword({ email: authEmail, password });
      if (error) {
        return { success: false, error: error.message };
      }
      if (data.user) {
        setUser({ email: email.trim(), role: 'admin' });
        return { success: true };
      }
      return { success: false, error: 'Login failed' };
    } else {
      // Local demo mode credentials
      // Default credentials: admin@kavinproduction.com / kavin@2025
      if (
        (email.toLowerCase() === 'admin@kavinproduction.com' && password === 'kavin@2025') ||
        (email.toLowerCase() === 'kavin@kavinproduction.com' && password === 'kavin@2025') ||
        (email.length > 3 && password.length >= 6)
      ) {
        const adminUser = { email: email.toLowerCase(), role: 'admin' };
        setUser(adminUser);
        localStorage.setItem('kavin_admin_user', JSON.stringify(adminUser));
        return { success: true };
      }
      return { success: false, error: 'Invalid credentials. Use admin@kavinproduction.com / kavin@2025' };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('kavin_admin_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        isDemoMode: !isSupabaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
