import { usePomodoroTimer } from "../../../stoer/usePomodoroTimer"
import { useSFXStore } from "../../../stoer/useSFXStore"

export const TimeStear = () => {
  const play = useSFXStore((state) => state.play)
  const { status, start, pause, reset } = usePomodoroTimer()

  const statusConfig = {
    focus:  { label: "Focus",     dot: "bg-emerald-400" },
    rest:   { label: "Break",     dot: "bg-sky-400"     },
    paused: { label: "Paused",    dot: "bg-amber-400"   },
    done:   { label: "Completed", dot: "bg-gray-400"    },
  }
  const { label: statusLabel, dot: statusDot } = statusConfig[status] ?? {}

  return (
    <div
      className="flex flex-col items-center
                 gap-[clamp(0.6rem,1vh,0.8rem)]
                 py-[clamp(0.25rem,1vh,0.5rem)]
                 text-center select-none"
    >
      {/* 狀態文字 */}
      {(status === "focus" || status === "rest" || status === "paused") && (
        <div className="flex items-center justify-center gap-2">
          <span className={`w-2 h-2 rounded-full shrink-0 ${statusDot}`} />
          <p className="text-[clamp(1.1rem,3vw,1.9rem)] font-black leading-tight tracking-wide text-gray-800">
            {statusLabel}
          </p>
        </div>
      )}

      {/* 控制按鈕群 */}
      <div
        className="flex flex-wrap justify-center
                   gap-[clamp(0.4rem,1vw,0.8rem)]
                   mt-[clamp(0.25rem,0.5vh,0.5rem)]"
      >
        {(status === "idle" || status === "done") && (
          <button
            onClick={() => { start(); play("ui.click") }}
            className="px-5 py-2 rounded-full font-semibold leading-none
                       text-[clamp(0.85rem,2vw,1rem)]
                       bg-emerald-400 text-white shadow-sm
                       hover:bg-emerald-500 active:scale-95
                       transition-all duration-150"
          >
            開始
          </button>
        )}

        {status === "paused" && (
          <>
            <button
              onClick={() => { start(); play("ui.click") }}
              className="px-5 py-2 rounded-full font-semibold leading-none
                         text-[clamp(0.85rem,2vw,1rem)]
                         bg-emerald-400 text-white shadow-sm
                         hover:bg-emerald-500 active:scale-95
                         transition-all duration-150"
            >
              繼續
            </button>
            <button
              onClick={() => { reset(); play("ui.click") }}
              className="px-5 py-2 rounded-full font-semibold leading-none
                         text-[clamp(0.85rem,2vw,1rem)]
                         bg-black/10 text-gray-700
                         hover:bg-black/20 active:scale-95
                         transition-all duration-150"
            >
              重設
            </button>
          </>
        )}

        {(status === "focus" || status === "rest") && (
          <button
            onClick={() => { pause(); play("ui.click") }}
            className="px-5 py-2 rounded-full font-semibold leading-none
                       text-[clamp(0.85rem,2vw,1rem)]
                       bg-black/10 text-gray-700
                       hover:bg-black/20 active:scale-95
                       transition-all duration-150"
          >
            暫停
          </button>
        )}
      </div>
    </div>
  )
}
