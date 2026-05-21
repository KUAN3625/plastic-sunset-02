
import { usePomodoroSettings } from "../../stoer/usePomodoroSettings"
import { useSFXStore } from "../../stoer/useSFXStore"
import Slider from "./Slider"

{/* 控制循環次數按鈕  */ }

const ControlCycles = () => {
  const play = useSFXStore((state) => state.play)
  const { cycles, setCycles } = usePomodoroSettings()

  const dec = () => setCycles(Math.max(1, cycles - 1))
  const inc = () => setCycles(Math.min(10, cycles + 1))

  return (
    <div className="flex items-center gap-3 text-lg font-bold select-none">
      <button
        onClick={() => {
          {
            dec();
            play("ui.click");
          }
        }}
        className="w-6 h-6 flex justify-center items-center rounded-full border border-gray-500 hover:bg-gray-200 transition"
      >
        −
      </button>

      <span className="text-2xl font-mono tabular-nums pointer-events-none">
        {cycles}
      </span>



      <button
        onClick={() => {
          {
            inc();
            play("ui.click");
          }
        }}

        className="w-6 h-6 flex justify-center items-center rounded-full border border-gray-500 hover:bg-gray-200 transition"
      >
        ＋
      </button>
    </div>
  )


}

export default ControlCycles
