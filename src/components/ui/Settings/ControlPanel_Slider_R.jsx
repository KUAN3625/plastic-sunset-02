
import { usePomodoroSettings } from "../../stoer/usePomodoroSettings"
import Slider from "./Slider"

{/* 滑桿元件_番茄_Rest*/}

const ControlRestPanel = () => {
  const { rest, setRestTime, setRestDragging } = usePomodoroSettings()

  const startDrag = () => setRestDragging(true)
  const endDrag = () => setRestDragging(false)

  return (
    <div className="flex flex-col items-end w-full px-1">
      <label className="w-full">
        <Slider
          min={1}
          max={15}
          step={1}
          value={rest.time}
          onChange={(e) => setRestTime(Number(e.target.value))}
          onStart={startDrag}
          onEnd={endDrag}
          className="w-full"
        />
      </label>
    </div>
  )
}

export default ControlRestPanel
