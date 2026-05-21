import { usePomodoroTimer } from "../stoer/usePomodoroTimer"
import TimeBtn from "../ui/Pomodoro_btn/TimeBtn"
import ControlPanelF from "../ui/Settings/ControlPanel_Slider"
import ControlCycles from "../ui/Settings/ControlPanel_Slider_Cy"
import ControlRestPanel from "../ui/Settings/ControlPanel_Slider_R"
import { TimeStear } from "./Pomodoro/Controlpanel/stear"

const ControlPanel = () => {
  const { status } = usePomodoroTimer()
  const isConfigMode = status === "idle" || status === "done"

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* 🔹 上半：三個滑桿區 */}
      {isConfigMode && (
        <div className="flex flex-col gap-[0.2rem] items-end px-5 py-1">
          <TimeBtn label="Focus" Component={ControlPanelF} />
          <TimeBtn label="Rest" Component={ControlRestPanel} />
          <TimeBtn label="Cycles" Component={ControlCycles} />
        </div>
      )}

      {/* 🔹 下半：控制按鈕區 */}
      <div className="flex justify-center pb-2">
        <TimeStear />
      </div>
    </div>
  )
}

export default ControlPanel
