
import { usePomodoroSettings } from "../../stoer/usePomodoroSettings"
import Slider from "./Slider"

{/* 滑桿元件_番茄_Focus */}

const ControlPanelF = () => {
  const { focus, setFocusTime, setFocusDragging } = usePomodoroSettings()

  const startDrag = () => setFocusDragging(true)
  const endDrag = () => setFocusDragging(false)

  return (
    <div className="flex flex-col items-end w-full px-1">
      <label className="w-full">
        <Slider
          min={5}
          max={60}
          step={5}
          value={focus.time}
          onChange={(e) => setFocusTime(Number(e.target.value))}
          onStart={startDrag}
          onEnd={endDrag}
          className="w-full"
        />
      </label>
    </div>
  )
}

export default ControlPanelF
