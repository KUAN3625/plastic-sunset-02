import { create } from "zustand";

export const useEffectsStore = create((set) => ({
  effectsQuality: 70,
  setEffectsQuality: (v) => set({ effectsQuality: Math.max(0, Math.min(100, v)) }),

  pixelGranularity: 2,
  setPixelGranularity: (v) => set({ pixelGranularity: Math.max(0, Math.min(12, v)) }),
}));
