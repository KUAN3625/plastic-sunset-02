import { usePomodoroTimer } from "../../stoer/usePomodoroTimer"

export const PomodoroCycles = () => {
  const { cyclesDone, maxCycles, status } = usePomodoroTimer()

  const showDuring = ["focus", "rest", "paused", "done"]
  if (!showDuring.includes(status) || maxCycles <= 0) return null

  // 🔥 計算目前正在第幾輪
  const currentCycle = Math.min(cyclesDone + 1, maxCycles)

return (
  <div
    className="absolute top-2 right-2 w-6 h-6 rounded-full 
               flex items-center justify-center 
               bg-black/10 text-black font-mono text-xs"
  >
    {currentCycle}
  </div>
)
}
