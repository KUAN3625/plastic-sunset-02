import { create } from "zustand";
import { Howl } from "howler";

export const useAudioSettings = create((set, get) => ({
  musicVolume: 0.6,

  setMusicVolume: (v) => {
    const clamped = Math.max(0, Math.min(1, v));
    set({ musicVolume: clamped });

    // 🔊 若有全域播放器，立即更新
    const player = window.__globalPlayer;
    if (player) {
      player.volume(clamped);
      const node = player._sounds?.[0]?._node;
      if (node) node.volume = clamped; // 立即套用 HTML5 audio 實例
    }
  },
}));
