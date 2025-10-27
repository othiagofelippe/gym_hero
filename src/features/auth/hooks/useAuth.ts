import { useAuthStore } from '../store';
import { useShallow } from 'zustand/react/shallow';

export const useAuth = () => {
  return useAuthStore(
    useShallow((state) => ({
      user: state.user,
      loading: state.loading,
      isAuthenticated: state.isAuthenticated,
    }))
  );
};
