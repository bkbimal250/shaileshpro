import { create } from 'zustand';

// Safely get initial state from localStorage to prevent flash of unauthenticated state
const getInitialUser = () => {
    try {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    } catch (e) {
        return null;
    }
};

const useAuthStore = create((set) => ({
  user: getInitialUser(),

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null });
  },
}));

export default useAuthStore;