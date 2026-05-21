import { usePomodoroRuntime } from "../../../stoer/Pomodoro/usePomodoroRuntime"

export const TimerControl = () => {
    const { mode, isRunning, start, pause, resume, stop } = usePomodoroRuntime()




    return (
        <div className="flex justify-center gap-3 mt-4">
            {/* ---- idle 狀態：顯示「開始」 ---- */}
            {mode === "idle" && (
                <button
                    className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
                    onClick={start}>

                    開始
                </button>
            )}
        
        
        {/* ---- focus/rest 狀態：顯示「暫停」 ---- */}
      {isRunning && (
        <button
          className="px-5 py-2 border-2 border-gray-900 rounded-lg hover:bg-gray-100 transition"
          onClick={pause}
        >
          暫停
        </button>
      )}

      {/* ---- 暫停狀態：顯示「繼續」 ---- */}
      {!isRunning && mode === "paused" && (
        <button
          className="px-5 py-2 border-2 border-gray-900 rounded-lg hover:bg-gray-100 transition"
          onClick={resume}
        >
          繼續
        </button>
      )}

      {/* ---- 只要不是 idle，就能「停止」 ---- */}
      {mode !== "idle" && (
        <button
          className="px-5 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition"
          onClick={stop}
        >
          停止
        </button>
      )}


        </div>
    )
} 