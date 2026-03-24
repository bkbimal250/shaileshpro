import { create } from 'zustand';

const useProjectStore = create((set) => ({
  projects: [],

  setProjects: (projects) => set({ projects }),

  addProject: (project) =>
    set((state) => ({
      projects: [project, ...state.projects],
    })),
}));

export default useProjectStore;