import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';
import type { AuthUser } from '../services/authService';

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  initialize: () => Promise<void>;
  logout: () => Promise<void>;
}

const mapSessionToUser = (session: Session): AuthUser => ({
  uid: session.user.id,
  email: session.user.email || null,
  displayName: session.user.user_metadata?.display_name || null,
});

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setLoading: (loading) => set({ loading }),

  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      set({
        user: session ? mapSessionToUser(session) : null,
        isAuthenticated: !!session,
        loading: false,
      });

      supabase.auth.onAuthStateChange((_event, session) => {
        set({
          user: session ? mapSessionToUser(session) : null,
          isAuthenticated: !!session,
          loading: false,
        });
      });
    } catch (error) {
      console.error('Erro ao inicializar auth store:', error);
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await supabase.auth.signOut();
      set({
        user: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  },
}));
