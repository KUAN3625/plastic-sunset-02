import { usePomodoroTimer } from "../../stoer/usePomodoroTimer"

export const PomodoroCycles = () => {
  const { cyclesDone, maxCycles, status } = usePomodoroTimer()

  const showDuring = ["focus", "rest", "paused", "done"]
  if (!showDuring.includes(status) || maxCycles <= 0) return null

  return (
    <div className="absolute top-2 right-2 flex items-center gap-1">
      {Array.from({ length: maxCycles }, (_, i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
            i < cyclesDone ? "bg-black/70" : "bg-black/20"
          }`}
        />
      ))}
    </div>
  )
}
