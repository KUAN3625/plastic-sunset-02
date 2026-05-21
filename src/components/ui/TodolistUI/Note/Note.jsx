import { useState } from "react"
import { X, GripHorizontal } from "lucide-react"

export const Note = ({
  id,
  text,
  color = "#eee",
  onDelete,
  onDragEnd,
  onTextChange,
  onFocusNote, // ⭐ 新增
  x = 0,
  y = 0,
  z = 1,       // ⭐ 新增
}) => {
  const [value, setValue] = useState(text)
  const [isEditing, setIsEditing] = useState(false)

  let startX = 0
  let startY = 0

  const handleMouseDown = (e) => {
    if (isEditing) return

    // ⭐ 先讓便條浮到最上層
    if (onFocusNote) onFocusNote(id)

    const note = e.currentTarget
    const rect = note.getBoundingClientRect()
    startX = e.clientX - rect.left
    startY = e.clientY - rect.top

    const handleMouseMove = (moveEvent) => {
      const newX = moveEvent.clientX - startX
      const newY = moveEvent.clientY - startY
      note.style.left = `${newX}px`
      note.style.top = `${newY}px`
    }

    const handleMouseUp = (upEvent) => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      const finalX = upEvent.clientX - startX
      const finalY = upEvent.clientY - startY
      onDragEnd(finalX, finalY)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleChange = (e) => {
    setValue(e.target.value)
    onTextChange(e.target.value)
  }

  const handleBlur = () => setIsEditing(false)
  const handleFocus = () => setIsEditing(true)

  return (
    <div
      className="relative w-[clamp(140px,20vw,220px)] h-[clamp(120px,18vw,200px)] rounded-lg shadow-md select-none overflow-hidden"
      style={{
        backgroundColor: color,
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        zIndex: z,
      }}
    >
      {/* 拖曳把手列 */}
      <div
        className={`flex items-center justify-between px-2 py-1 ${isEditing ? "cursor-default" : "cursor-grab active:cursor-grabbing"}`}
        style={{ backgroundColor: "rgba(0,0,0,0.08)" }}
        onMouseDown={handleMouseDown}
      >
        <GripHorizontal size={13} className="opacity-40" />
        <button
          onClick={onDelete}
          className="p-0.5 rounded hover:bg-black/10 text-black/40 hover:text-red-500 transition-colors"
        >
          <X size={13} />
        </button>
      </div>

      {/* 文字區 */}
      <textarea
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`
          w-full resize-none bg-transparent outline-none leading-snug break-words
          text-black text-[clamp(13px,1.4vw,16px)]
          px-[clamp(8px,1vw,12px)] py-[clamp(6px,0.8vw,10px)]
          ${isEditing ? "cursor-text" : "cursor-default"}
        `}
        style={{ height: "calc(100% - 28px)" }}
        readOnly={!isEditing}
      />
    </div>
  )
}
