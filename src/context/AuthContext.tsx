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
    const checkSession = async () => {
      try {
        if (isSupabaseConfigured && supabase) {
          const { data } = await supabase.auth.getSession();
          if (data?.session?.user) {
            setUser({ email: data.session.user.email || 'admin@kavinproduction.com', role: 'admin' });
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Supabase auth session check failed:', err);
      }

      // Check saved local admin session
      const savedUser = localStorage.getItem('kavin_admin_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    checkSession();

    if (isSupabaseConfigured && supabase) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
        if (session?.user) {
          setUser({ email: session.user.email || 'admin@kavinproduction.com', role: 'admin' });
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.toLowerCase().trim();
    const cleanPass = password.trim();

    // 1. Instant check for verified studio master credentials
    const isMasterCredential =
      (cleanEmail === 'admin@kavinproduction.com' ||
        cleanEmail === 'kavinproduction.official@gmail.com' ||
        cleanEmail === 'kavin@kavinproduction.com' ||
        cleanEmail === 'admin') &&
      (cleanPass === 'kavin@2025' ||
        cleanPass === 'kavinproduction@12' ||
        cleanPass === 'kavin@123' ||
        cleanPass === 'admin123');

    if (isMasterCredential) {
      const adminUser = {
        email: cleanEmail === 'admin' ? 'admin@kavinproduction.com' : cleanEmail,
        role: 'admin',
      };
      setUser(adminUser);
      localStorage.setItem('kavin_admin_user', JSON.stringify(adminUser));
      return { success: true };
    }

    // 2. Direct Supabase auth attempt if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const authEmail =
          cleanEmail === 'admin@kavinproduction.com'
            ? 'kavinproduction.official@gmail.com'
            : cleanEmail;

        const { data, error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: cleanPass,
        });

        if (data?.user) {
          const adminUser = { email: cleanEmail, role: 'admin' };
          setUser(adminUser);
          localStorage.setItem('kavin_admin_user', JSON.stringify(adminUser));
          return { success: true };
        }

        if (error) {
          return { success: false, error: error.message };
        }
      } catch (err: any) {
        return { success: false, error: err?.message || 'Authentication error' };
      }
    }

    // 3. Permissive dev fallback
    if (cleanEmail.length > 3 && cleanPass.length >= 6) {
      const adminUser = { email: cleanEmail, role: 'admin' };
      setUser(adminUser);
      localStorage.setItem('kavin_admin_user', JSON.stringify(adminUser));
      return { success: true };
    }

    return { success: false, error: 'Invalid credentials. Use admin@kavinproduction.com / kavin@2025' };
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch {
        // Ignore network signout errors
      }
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
