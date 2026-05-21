import { useState } from "react"
import Slider from "../../components/ui/Settings/Slider"
import SideMenu from "../../components/ui/Settings_UI/Side"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useAudioSettings } from "../../components/stoer/useAudioSettings"

const Setting = () => {
  const { musicVolume, setMusicVolume } = useAudioSettings()
  
  const [sfx, setSfx] = useState(40)
  const [pixel, setPixel] = useState(4)
  const [theme, setTheme] = useState("Lo-Fi")

  const themeOptions = ["Lo-Fi", "Y2K", "Mono"]

  const sliders = [
    {
      id: "music",
      label: "Music Volume",
      value: Math.round(musicVolume * 100),
      setValue: (v) => setMusicVolume(v / 100),
      min: 0,
      max: 100,
      step: 1,
    },
    {
      id: "sfx",
      label: "SFX Volume",
      value: sfx,
      setValue: setSfx,
      min: 0,
      max: 100,
      step: 1,
    },
    {
      id: "pixel",
      label: "Pixelation",
      value: pixel,
      setValue: setPixel,
      min: 0,
      max: 12,
      step: 1,
    },
  ]

  const handleThemeChange = (dir) => {
    const i = themeOptions.indexOf(theme)
    const next =
      dir === "next"
        ? (i + 1) % themeOptions.length
        : (i - 1 + themeOptions.length) % themeOptions.length
    setTheme(themeOptions[next])
  }

  return (
<div className="fixed inset-9 z-10 flex overflow-hidden">
  <aside className="w-3 shrink-0">
    <SideMenu />
  </aside>

      {/* 右側內容（可滾動） */}
<main
  className="
    flex-1
    h-screen
    py-5 px-5
    flex 
    items-center justify-center
  "
>

        <section
          className="
            w-full max-w-[520px]
            flex flex-col gap-3
          "
        >
{/* 頁面標題 */}
<h1 className="text-[clamp(24px,4vw,40px)] font-semibold text-white drop-shadow-[0_0_4px_black]">
  Settings
</h1>



          {/* 所有 slider 卡片 */}
          {sliders.map(({ id, label, value, setValue, min, max, step }) => (
            <div
              key={id}
              className="
                rounded-2xl bg-white/30 backdrop-blur-md
                border border-white/40
                shadow-md
                px-3 py-1 flex flex-col gap-4
              "
            >
<div className="text-[clamp(18px,2.6vw,28px)] font-semibold text-center">
  {label}
</div>

              <div className="flex items-center gap-4">
                <Slider
                  min={min}
                  max={max}
                  step={step}
                  value={value}
                      onChange={(e) => setValue(Number(e.target.value))}
                  className="flex-1"
                />
{/* Slider 數值 */}
<span className="w-10 text-right text-[clamp(16px,2.2vw,24px)] tabular-nums">
  {value}
</span>


              </div>
            </div>
          ))}

          {/* Theme Preset */}
          <div
            className="
              rounded-2xl bg-white/30 backdrop-blur-md
              border border-white/40 shadow-md
              px-6 py-6 flex flex-col gap-4
            "
          >
{/* Theme Preset 標題 */}
<div className="text-[clamp(18px,2.6vw,28px)] font-semibold text-center">
  Theme Preset
</div>



            <div className="flex items-center justify-between gap-4 bg-white/40 backdrop-blur-sm border rounded-lg p-3">
              <button
                onClick={() => handleThemeChange("prev")}
                className="p-2 rounded-md border bg-white/70 hover:bg-white transition"
              >
                <ChevronLeft size={20} />
              </button>

{/* Theme 文字 */}
<div className="flex-1 text-center text-[clamp(16px,2.2vw,24px)] font-medium">
  {theme}
</div>

              <button
                onClick={() => handleThemeChange("next")}
                className="p-2 rounded-md border bg-white/70 hover:bg-white transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </section>
  
      </main>
    </div>
  )
}

export default Setting
