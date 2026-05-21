import { create } from "zustand"

type AppLoadingState = {
  isReady: boolean
  finishLoading: () => void
}

export const useAppLoading = create<AppLoadingState>((set) => ({
  isReady: false,

  // 🚀 呼叫這個代表「載入完成」
  finishLoading: () => set({ isReady: true }),
}))
