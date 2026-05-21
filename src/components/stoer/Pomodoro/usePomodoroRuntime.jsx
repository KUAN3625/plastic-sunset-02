import { create } from "zustand";
import { usePomodoroSettings } from "./usePomodoroSettings";
import { start } from "rive";

export const usePomodoroRuntime = create((set,get) => ({
    //---狀態------
    mode: "idle", //idle , focus , rest , paused
    isRunning: false,
    remainingSec: 0, //當前階段剩餘秒數
    cycles: 0,  //完成的foucs  → rest次數
    _timerId: null, //計時器ID

    //-----內部工具-----
    _clearTimer:()=>{
        const id = get()._timerId;
        if(id) clearInterval(id);
        set({_timerId:null});
        
    },

      _startInterval: () => {
    get()._clearTimer();
    const id = setInterval(get().tick, 1000);
    set({ _timerId: id });
  },

  _setPhase: (mode, minutes) => {
    // 切換階段時，統一入口：設定模式 + 剩餘秒數 + 啟動 interval
    set({
      mode,
      remainingSec: Math.max(1, Math.round(minutes * 60)),
      isRunning: true,
    });
    get()._startInterval();
  },

  //--公開API--

  start:() =>{
    //第一段的focus
    const{focus} = usePomodoroSettings.getState();
    get()._setPhase("focus",focus.time);
  },

  pause:() => { //暫停且不重製
    get()._clearTimer();
    set({isRunning:false, mode:"paused"});
  },

  resume: () =>  {         //從暫停中恢復 循環(0秒時不觸發)
    if(get().remainingSec <= 0) return;
    set({isRunning:true, mode:get().mode === "paused" ? "focus" : get().mode});
    get()._startInterval();    
  },


  stop: () =>  {         //重製
    get()._clearTimer();
    set({mode:"idel", isRunning: false, remainingSec: 0  });    
  },


  // 每秒跳一次。到 0 時自動切換 focus ↔ rest
  tick: () => {
    const left = get().remainingSec - 1;
    if (left > 0) return set({ remainingSec: left });

    // 到 0 → 切段
    const settings = usePomodoroSettings.getState();
    if (get().mode === "focus") {
      set({ cycles: get().cycles + 1 });
      get()._setPhase("rest", settings.rest.time);
    } else if (get().mode === "rest") {
      get()._setPhase("focus", settings.focus.time);
    }
  },
}));