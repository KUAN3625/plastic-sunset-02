import { usePomodoroTimer } from "../../../stoer/usePomodoroTimer"
import { useSFXStore } from "../../../stoer/useSFXStore"

export const TimeStear = () => {
  const play = useSFXStore((state) => state.play)
  const { status, start, pause, reset } = usePomodoroTimer()

  const statusLabel = {
    focus: "Focus",
    rest: "Break",
    paused: "Paused",
    done: "Completed",
  }[status]

  return (
    <div
      className="flex flex-col items-center
                 gap-[clamp(0.6rem,1vh,0.8rem)]
                 py-[clamp(0.25rem,1vh,0.5rem)]
                 text-center select-none"
    >
      {/* 狀態文字 */}
      {(status === "focus" || status === "rest" || status === "paused") && (
<p
  className="text-[clamp(1.1rem,3vw,1.9rem)] font-black leading-tight
             tracking-wide text-gray-800"
>
          {statusLabel}
        </p>
      )}

      {/* 控制按鈕群 */}
      <div
        className="flex flex-wrap justify-center
                   gap-[clamp(0.4rem,1vw,0.8rem)]
                   mt-[clamp(0.25rem,0.5vh,0.5rem)]"
      >
        {(status === "idle" || status === "done") && (
          <button
            onClick={() => {
              start()
              play("ui.click")
            }}
            className="px-4 py-1.5 bg-emerald-500 text-white rounded-md
                       text-[clamp(0.85rem,2vw,1rem)]
                       hover:bg-emerald-600 transition active:translate-y-[1px]
                       leading-none"
          >
            開始
          </button>
        )}

        {status === "paused" && (
          <>
            <button
              onClick={() => {
                start()
                play("ui.click")
              }}
              className="px-4 py-1.5 bg-emerald-500 text-white rounded-md
                         text-[clamp(0.85rem,2vw,1rem)]
                         hover:bg-emerald-600 transition active:translate-y-[1px]
                         leading-none"
            >
              繼續
            </button>
            <button
              onClick={() => {
                reset()
                play("ui.click")
              }}
              className="px-4 py-1.5 bg-amber-500 text-white rounded-md
                       text-[clamp(0.85rem,2vw,1rem)]
                       hover:bg-amber-600 transition active:translate-y-[1px]
                       leading-none"
            >
              重設
            </button>
          </>
        )}

        {(status === "focus" || status === "rest") && (
          <button
            onClick={() => {
              pause()
              play("ui.click")
            }}
            className="px-4 py-1.5 bg-amber-500 text-white rounded-md
                       text-[clamp(0.85rem,2vw,1rem)]
                       hover:bg-amber-600 transition active:translate-y-[1px]
                       leading-none"
          >
            暫停
          </button>
        )}
      </div>
    </div>
  )
}
