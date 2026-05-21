import { create } from "zustand";
import { usePomodoroSettings } from "./usePomodoroSettings";

// 番茄鐘運作核心
export const usePomodoroTimer = create((set, get) => {
  const toSec = (m) => Math.max(1, Math.round(m * 60)); // 避免 0 → 00:00

  return {
    // 狀態
    status: "idle",              // idle | focus | rest | paused | done
    remainingSec: 0,
    intervalId: null,
    cyclesDone: 0,               // ✅ 已完成的循環數
    maxCycles: 0,                // ✅ 設定要跑幾輪
    previousStatus: null,        // ✅ 暫停恢復用

    onCompleteList:[],  //事件回呼(可選)
    
       // ✅ 新增：註冊事件（不覆蓋）
    addOnComplete: (fn) =>
      set((state) => ({
        onCompleteList: [...state.onCompleteList, fn],
      })),

    // ✅ 可選：清除所有事件（有需要時可用）
    clearOnComplete: () => set({ onCompleteList: [] }),


    // ▶️ 開始
    start: () => {
      // 清除舊 interval
      const old = get().intervalId;
      if (old) clearInterval(old);

      const { status, remainingSec } = get();
      const settings = usePomodoroSettings.getState();

      let initialSec = 0;
      let initialStatus = status;

      // 🧩 暫停後繼續
      if (status === "paused" && remainingSec > 0) {
        initialSec = remainingSec;
        initialStatus = get().previousStatus || "focus";
      } else {
        // 🧩 全新開始
        initialStatus = "focus";
        initialSec = toSec(settings.focus.time);
      }

      // 初始化狀態
      set({
        status: initialStatus,
        remainingSec: initialSec,
        previousStatus: initialStatus,
        cyclesDone: 0,
        maxCycles: settings.cycles,
      });

      // ✅ 啟動 interval
      const id = setInterval(() => {
        const { remainingSec, status, cyclesDone, maxCycles } = get();

        // ---- 每秒更新 ----
        if (remainingSec > 1) {
          set({ remainingSec: remainingSec - 1 });
          return;
        }

        // ---- 一輪結束 ----
        if (status === "focus") {
          const restSec = toSec(usePomodoroSettings.getState().rest.time);
          set({
            status: "rest",
            remainingSec: restSec,
            previousStatus: "rest",
          });
          return;
        }

        if (status === "rest") {
          const nextCycle = cyclesDone + 1;

          if (nextCycle < maxCycles) {
            const focusSec = toSec(usePomodoroSettings.getState().focus.time);
            set({
              status: "focus",
              remainingSec: focusSec,
              cyclesDone: nextCycle,
              previousStatus: "focus",
            });
            return;
          } else {
            // ✅ 完成所有迴圈階段 → 進入 done 狀態
            const doneDuration = 10; // 🔸 停留 10 秒
            set({
              status: "done",
              remainingSec: doneDuration,
              cyclesDone: nextCycle,
              previousStatus: "done",
            });
            return;
          }
        }

        // ✅ done 狀態的倒數邏輯
        if (status === "done") {
          if (remainingSec > 1) {
            set({ remainingSec: remainingSec - 1 });
          } else {
            clearInterval(get().intervalId);
            set({
              status: "idle",
              remainingSec: 0,
              intervalId: null,
            });


            
            // ✅ 執行所有 listener
            const list = get().onCompleteList;
            list.forEach((fn) => fn?.());
          }
          return;
        }
      }, 1000);

      set({ intervalId: id });
    },

    // ⏸ 暫停
    pause: () => {
      const { intervalId, status } = get();
      if (intervalId) clearInterval(intervalId);
      set({
        intervalId: null,
        status: "paused",
        previousStatus: status,
      });
    },

    // 🔁 重設
    reset: () => {
      const id = get().intervalId;
      if (id) clearInterval(id);
      set({
        intervalId: null,
        remainingSec: 0,
        status: "idle",
        cyclesDone: 0,
        maxCycles: 0,
      });
    },
  };
});
