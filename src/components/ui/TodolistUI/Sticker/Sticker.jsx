import {
  Smile, Meh, Frown, Flame, Star, Heart,
  Music, Coffee, Moon, Sun, Cloud, Zap,
} from "lucide-react"

export const STICKER_CONFIG = [
  { id: "smile",  Icon: Smile,  color: "#e07b54" },
  { id: "meh",    Icon: Meh,    color: "#7aaa8a" },
  { id: "frown",  Icon: Frown,  color: "#6a90b8" },
  { id: "flame",  Icon: Flame,  color: "#d04e30" },
  { id: "star",   Icon: Star,   color: "#c89020" },
  { id: "heart",  Icon: Heart,  color: "#c04868" },
  { id: "music",  Icon: Music,  color: "#5878c0" },
  { id: "coffee", Icon: Coffee, color: "#8a5e38" },
  { id: "moon",   Icon: Moon,   color: "#7060a0" },
  { id: "sun",    Icon: Sun,    color: "#c88010" },
  { id: "cloud",  Icon: Cloud,  color: "#5890a8" },
  { id: "zap",    Icon: Zap,    color: "#b07830" },
]

const CONFIG_MAP = Object.fromEntries(STICKER_CONFIG.map(c => [c.id, c]))

export const Sticker = ({ id, iconId, x, y, z, onDelete, onDragEnd, onFocus }) => {
  const config = CONFIG_MAP[iconId]
  if (!config) return null
  const { Icon, color } = config

  const handleMouseDown = (e) => {
    if (e.detail === 2) return
    if (onFocus) onFocus(id)

    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top

    const onMove = (me) => {
      el.style.left = `${me.clientX - offsetX}px`
      el.style.top  = `${me.clientY - offsetY}px`
    }
    const onUp = (ue) => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseup", onUp)
      onDragEnd(ue.clientX - offsetX, ue.clientY - offsetY)
    }
    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseup", onUp)
  }

  return (
    <div
      title="雙擊刪除"
      className="absolute select-none cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
      style={{ left: x, top: y, zIndex: z }}
      onMouseDown={handleMouseDown}
      onDoubleClick={onDelete}
    >
      <Icon size={36} strokeWidth={1.8} style={{ color }} />
    </div>
  )
}
