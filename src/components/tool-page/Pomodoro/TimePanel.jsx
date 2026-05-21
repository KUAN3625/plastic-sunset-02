import { useState, useRef } from "react"
import ClockMode from "../../hooks/colock/Colock"
import ControlPanel from "../ConterolPanel"
import { usePomodoroTimer } from "../../stoer/usePomodoroTimer"
import { PomodoroCycles } from "./Cycleindicator"

const TimerPanel = () => {
  const [showPanel, setShowPanel] = useState(false)
  const hideTimer = useRef(null)                       // ✅ 延遲隱藏的計時器
  const { status } = usePomodoroTimer()
  const isActive = status === "focus" || status === "rest" || status === "paused"
  const shouldShowPanel = showPanel || isActive

  const handleEnter = () => {
    if (hideTimer.current) {                           // 若有計時器 → 先清除，避免提前隱藏
      clearTimeout(hideTimer.current)
      hideTimer.current = null
    }
    setShowPanel(true)
  }

  const handleLeave = () => {
    // ✅ 延遲 300ms 才關閉，以避免滑鼠經過邊緣時閃爍
    hideTimer.current = setTimeout(() => {
      setShowPanel(false)
      hideTimer.current = null
    }, 300)
  }

return (
  <section
    className="pointer-events-auto fixed top-[clamp(1rem,3vh,2rem)] right-[clamp(5rem,3vw,2rem)]
               w-[clamp(5rem,25vw,22rem)] max-w-[90vw] rounded-2xl z-[50]"
    onMouseEnter={handleEnter}
    onMouseLeave={handleLeave}
  >
    {/* 🔹 上半：時間顯示框 */}
<div
  className="relative border-2 border-black rounded-2xl
             p-[clamp(0.5rem,2.5vh,1.5rem)]
             bg-white/60 backdrop-blur-md shadow-lg
             transition-all duration-300
             ps-clock-small"
>
  <PomodoroCycles/>
        <div className="ps-clock-wrap">
      <ClockMode isHovering={showPanel} />
    </div>
    </div>

    {/* 🔹 下半：設定面板（絕對定位、浮層化） */}
    {shouldShowPanel && (
      <div
        className="absolute left-0 right-0 mt-2
                   border-2 border-black rounded-2xl
                   bg-white/70 backdrop-blur-md
                   p-[clamp(0.5rem,2.5vh,1.5rem)] shadow-lg
                   max-h-[55vh]  no-scrollbar
                   z-[60] duration-300"
        style={{
          top: "calc(100% + 0.1rem)", // 讓它浮在主框下方
        }}
      >
        <ControlPanel />
      </div>
    )}
  </section>
)


}

export default TimerPanel
