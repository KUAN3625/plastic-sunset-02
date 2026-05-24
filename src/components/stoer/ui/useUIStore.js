import { create } from "zustand"

export const useUIStore = create((set) => ({
  isHidden: false,
  setHidden: (v) => set({ isHidden: v }),
  toggleHidden: () => set((s) => ({ isHidden: !s.isHidden })),
}))
