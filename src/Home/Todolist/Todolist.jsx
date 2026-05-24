import { useState, useEffect, useRef } from "react"
import SideMenu from "../../components/ui/Settings_UI/Side"
import { Note } from "../../components/ui/TodolistUI/Note/Note"
import { Sticker, STICKER_CONFIG } from "../../components/ui/TodolistUI/Sticker/Sticker"
import { StickyNote, Smile, Trash2, AlertTriangle } from "lucide-react"

const Todolist = () => {

  const moodBtnRef    = useRef(null)
  const clearTimerRef = useRef(null)
  const [moodPos,      setMoodPos]      = useState({ x: 0, y: 0 })
  const [zCounter,     setZCounter]     = useState(1)
  const [clearPending, setClearPending] = useState(false)
  const [showMood,     setShowMood]     = useState(false)

  // ── Notes ──────────────────────────────────────────
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  // ── Stickers ────────────────────────────────────────
  const [stickers, setStickers] = useState(() => {
    const saved = localStorage.getItem("stickers")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("stickers", JSON.stringify(stickers))
  }, [stickers])

  // ── 顏色 ────────────────────────────────────────────
  const colors = ["#F9E79F", "#F5B7B1", "#AED6F1", "#A9DFBF"]
  const [colorIndex, setColorIndex] = useState(0)
  const activeColor = colors[colorIndex]

  // ── Note CRUD ────────────────────────────────────────
  const addNote = (x = 100, y = 100) => {
    setNotes(prev => [...prev, { id: Date.now(), text: "New Note", color: activeColor, x, y }])
  }

  const deleteNote = (id) => setNotes(prev => prev.filter(n => n.id !== id))

  const updateNoteText = (id, newText) =>
    setNotes(prev => prev.map(n => n.id === id ? { ...n, text: newText } : n))

  const updateNotePosition = (id, x, y) =>
    setNotes(prev => prev.map(n => n.id === id ? { ...n, x, y } : n))

  const raiseNote = (id) => {
    setZCounter(c => {
      const next = c + 1
      setNotes(prev => prev.map(n => n.id === id ? { ...n, z: next } : n))
      return next
    })
  }

  // ── Sticker CRUD ─────────────────────────────────────
  const addSticker = (iconId) => {
    const x = 130 + Math.random() * Math.max(100, window.innerWidth  - 350)
    const y =  50 + Math.random() * Math.max(100, window.innerHeight - 150)
    setZCounter(c => {
      const next = c + 1
      setStickers(prev => [...prev, { id: Date.now(), iconId, x, y, z: next }])
      return next
    })
    setShowMood(false)
  }

  const deleteSticker = (id) => setStickers(prev => prev.filter(s => s.id !== id))

  const updateStickerPosition = (id, x, y) =>
    setStickers(prev => prev.map(s => s.id === id ? { ...s, x, y } : s))

  const raiseSticker = (id) => {
    setZCounter(c => {
      const next = c + 1
      setStickers(prev => prev.map(s => s.id === id ? { ...s, z: next } : s))
      return next
    })
  }

  // ── Clear all ─────────────────────────────────────────
  const clearAllNotes = () => {
    setNotes([])
    setStickers([])
    localStorage.removeItem("notes")
    localStorage.removeItem("stickers")
    setClearPending(false)
    clearTimeout(clearTimerRef.current)
  }

  const handleClearClick = () => {
    if (clearPending) {
      clearAllNotes()
    } else {
      setClearPending(true)
      clearTimerRef.current = setTimeout(() => setClearPending(false), 2500)
    }
  }

  const cycleColor = () => setColorIndex(prev => (prev + 1) % colors.length)

  return (
    <div
      className="pointer-events-auto relative w-screen h-screen overflow-hidden cursor-crosshair"
      onDoubleClick={(e) => {
        if (e.target === e.currentTarget) addNote(e.clientX - 80, e.clientY - 30)
      }}
    >
      {/* 左上選單 */}
      <div className="absolute top-4 left-4">
        <SideMenu />
      </div>

      {/* 便條 */}
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          color={note.color}
          x={note.x}
          y={note.y}
          z={note.z}
          onDelete={() => deleteNote(note.id)}
          onDragEnd={(x, y) => updateNotePosition(note.id, x, y)}
          onTextChange={(t) => updateNoteText(note.id, t)}
          onFocusNote={raiseNote}
        />
      ))}

      {/* 貼紙 */}
      {stickers.map((s) => (
        <Sticker
          key={s.id}
          id={s.id}
          iconId={s.iconId}
          x={s.x}
          y={s.y}
          z={s.z}
          onDelete={() => deleteSticker(s.id)}
          onDragEnd={(x, y) => updateStickerPosition(s.id, x, y)}
          onFocus={raiseSticker}
        />
      ))}

      {/* 右側按鈕群 */}
      <main className="pointer-events-auto absolute top-1/3 right-20 -translate-y-1/2 flex flex-col gap-6">

        {/* 顏色切換 */}
        <button
          title="切換便條顏色"
          className="w-12 h-12 rounded-full border-2 border-black/20 shadow flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          style={{ backgroundColor: activeColor }}
          onClick={cycleColor}
        >
          <StickyNote size={20} className="text-black/50" />
        </button>

        {/* 貼紙 */}
        <button
          ref={moodBtnRef}
          title="貼紙"
          className="pointer-events-auto w-12 h-12 rounded-full border-2 border-black/20 bg-orange-100 shadow flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          onClick={() => {
            if (moodBtnRef.current) {
              const rect = moodBtnRef.current.getBoundingClientRect()
              setMoodPos({ x: rect.left, y: rect.top + rect.height / 2 })
            }
            setShowMood(prev => !prev)
          }}
        >
          <Smile size={20} className="text-orange-500" />
        </button>

        {/* 清除全部（二次確認） */}
        <button
          title={clearPending ? "再按一次確認清除" : "清除全部便條"}
          className={`w-12 h-12 rounded-full border-2 shadow flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200
            ${clearPending
              ? "border-red-400 bg-red-100 animate-pulse"
              : "border-black/20 bg-orange-100"
            }`}
          onClick={handleClearClick}
        >
          {clearPending
            ? <AlertTriangle size={20} className="text-red-500" />
            : <Trash2 size={20} className="text-orange-500" />
          }
        </button>

      </main>

      {/* 貼紙選擇面板 */}
      {showMood && (
        <>
          <div className="fixed inset-0 z-[100]" onClick={() => setShowMood(false)} />
          <div
            className="pointer-events-auto absolute z-[101] bg-white/75 backdrop-blur-md rounded-2xl grid grid-cols-4 gap-2 p-3 shadow-lg"
            style={{ left: moodPos.x - 200, top: moodPos.y - 80 }}
          >
            {STICKER_CONFIG.map(({ id, Icon, color }) => (
              <button
                key={id}
                onClick={() => addSticker(id)}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/60 hover:bg-white hover:scale-110 active:scale-95 transition-all"
                style={{ color }}
              >
                <Icon size={22} strokeWidth={2} />
              </button>
            ))}
          </div>
        </>
      )}

    </div>
  )
}

export default Todolist
