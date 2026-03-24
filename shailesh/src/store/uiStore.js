import { create } from 'zustand';

const useUIStore = create((set) => ({
  loading: false,
  modal: null,

  setLoading: (loading) => set({ loading }),

  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: null }),
}));

export default useUIStore;