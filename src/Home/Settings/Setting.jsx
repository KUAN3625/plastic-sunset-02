import { useState, useEffect, useRef } from "react"
import Slider from "../../components/ui/Settings/Slider"
import SideMenu from "../../components/ui/Settings_UI/Side"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useAudioSettings } from "../../components/stoer/useAudioSettings"
import { useEffectsStore } from "../../components/stoer/useEffectsStore"
import { useUIStore } from "../../components/stoer/ui/useUIStore"
import { useSFXStore } from "../../components/stoer/useSFXStore"
import { useNavigate } from "react-router-dom"

const IDLE_MS = 30_000

const Setting = () => {
  const { musicVolume, setMusicVolume } = useAudioSettings()
  const { effectsQuality, setEffectsQuality, pixelGranularity, setPixelGranularity } = useEffectsStore()
  const { sfxVolume, setSfxVolume } = useSFXStore()
  const { setHidden } = useUIStore()
  const navigate = useNavigate()
  const timerRef = useRef(null)

  useEffect(() => {
    const reset = () => {
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setHidden(true)
        navigate("/core")
      }, IDLE_MS)
    }
    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"]
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }))
    reset()
    return () => {
      clearTimeout(timerRef.current)
      events.forEach((e) => window.removeEventListener(e, reset))
    }
  }, [])

  const [theme, setTheme] = useState("Lo-Fi")

  const themeOptions = ["Lo-Fi", "Y2K", "Mono"]

  const effectsLabel =
    effectsQuality === 0
      ? "Off"
      : effectsQuality <= 40
      ? "Low"
      : effectsQuality <= 70
      ? "Medium"
      : "High"

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
      value: Math.round(sfxVolume * 100),
      setValue: (v) => setSfxVolume(v / 100),
      min: 0,
      max: 100,
      step: 1,
    },
    {
      id: "pixel",
      label: "Pixelation",
      value: pixelGranularity,
      setValue: setPixelGranularity,
      min: 0,
      max: 12,
      step: 1,
    },
    {
      id: "effects",
      label: "Effects Quality",
      value: effectsQuality,
      setValue: setEffectsQuality,
      min: 0,
      max: 100,
      step: 1,
      badge: effectsLabel,
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
    <div className="fixed inset-0 z-10 flex overflow-hidden">
      <aside className="w-3 shrink-0">
        <SideMenu />
      </aside>

      <main className="flex-1 h-full overflow-y-auto overscroll-contain">
        <section className="w-full max-w-[520px] mx-auto px-4 sm:px-6 pt-16 pb-8 flex flex-col gap-3">

          <h1 className="text-[clamp(22px,3.5vw,38px)] font-semibold text-white drop-shadow-[0_0_4px_black] mb-1">
            Settings
          </h1>

          {sliders.map(({ id, label, value, setValue, min, max, step, badge }) => (
            <div
              key={id}
              className="rounded-2xl bg-white/30 backdrop-blur-md border border-white/40 shadow-md px-4 py-3 flex flex-col gap-2"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-[clamp(14px,2vw,22px)] font-semibold text-center">
                  {label}
                </span>
                {badge && (
                  <span className="px-2 py-0.5 rounded-full bg-white/50 border border-white/60 text-[11px] font-bold tracking-wide">
                    {badge}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Slider
                  min={min}
                  max={max}
                  step={step}
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="w-9 text-right text-[clamp(13px,1.8vw,20px)] tabular-nums shrink-0">
                  {value}
                </span>
              </div>
            </div>
          ))}

          <div className="rounded-2xl bg-white/30 backdrop-blur-md border border-white/40 shadow-md px-4 py-3 flex flex-col gap-2">
            <span className="text-[clamp(14px,2vw,22px)] font-semibold text-center">
              Theme Preset
            </span>

            <div className="flex items-center justify-between gap-3 bg-white/40 backdrop-blur-sm border rounded-lg p-2">
              <button
                onClick={() => handleThemeChange("prev")}
                className="p-2 rounded-md border bg-white/70 hover:bg-white transition shrink-0"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="flex-1 text-center text-[clamp(13px,1.8vw,20px)] font-medium">
                {theme}
              </span>
              <button
                onClick={() => handleThemeChange("next")}
                className="p-2 rounded-md border bg-white/70 hover:bg-white transition shrink-0"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

        </section>
      </main>
    </div>
  )
}

export default Setting
