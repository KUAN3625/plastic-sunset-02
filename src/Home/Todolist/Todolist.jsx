import { useState, useEffect, useRef } from "react"
import SideMenu from "../../components/ui/Settings_UI/Side"
import { Note } from "../../components/ui/TodolistUI/Note/Note"

const Todolist = () => {

const moodBtnRef = useRef(null)
const [moodPos, setMoodPos] = useState({ x: 0, y: 0 })
const [zCounter, setZCounter] = useState(1)

  const [showMood, setShowMood] = useState(false)

  // 🧩 初始化從 localStorage 讀取
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes")
    return saved ? JSON.parse(saved) : []
  })

  // 🎨 顏色
  const colors = ["#F9E79F", "#F5B7B1", "#AED6F1", "#A9DFBF"]
  const [colorIndex, setColorIndex] = useState(0)
  const activeColor = colors[colorIndex]

  // 🔁 notes 改變時自動儲存
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  const updateNoteText = (id, newText) => {
  setNotes((prev) =>
    prev.map((note) =>
      note.id === id ? { ...note, text: newText } : note
    )
  )
}

  const addNote = (x = 100, y = 100) => {
    const newNote = {
      id: Date.now(),
      text: "New Note",
      color: activeColor,
      x,
      y,
    }
    setNotes([...notes, newNote])
  }

  const clearAllNotes = () => {
  setNotes([])
  localStorage.removeItem("notes")
}

const raiseNote = (id) => {
  setZCounter((prev) => prev + 1)
  setNotes((prev) =>
    prev.map((n) =>
      n.id === id ? { ...n, z: zCounter } : n
    )
  )
}

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const updateNotePosition = (id, newX, newY) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, x: newX, y: newY } : note
      )
    )
  }

  const cycleColor = () => {
    setColorIndex((prev) => (prev + 1) % colors.length)
  }

  return (
    <div
      className="pointer-events-auto relative w-screen h-screen overflow-hidden"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const data = e.dataTransfer.getData("note")
        if (data) {
          const x = e.clientX - 100
          const y = e.clientY - 100
          addNote(x, y)
        }
      }}
    >
      {/* 左上選單 */}
      <div className="absolute top-4 left-4">
        <SideMenu />
      </div>

      {/* 拖曳生成區 */}
      <div
        draggable="true"
        onDragStart={(e) => e.dataTransfer.setData("note", "true")}
        className="pointer-events-auto absolute left-0 top-0 w-[112px] h-full bg-white/60 hover:bg-gray-50/30 cursor-grab active:cursor-grabbing"
      ></div>

      {/* 便條容器 */}
      {notes.map((note) => (
<Note
  key={note.id}
  id={note.id}
  text={note.text}
  color={note.color}
  x={note.x}
  y={note.y}
  z={note.z} // ⭐ 新增
  onDelete={() => deleteNote(note.id)}
  onDragEnd={(x, y) => updateNotePosition(note.id, x, y)}
  onTextChange={(newText) => updateNoteText(note.id, newText)}
  onFocusNote={raiseNote} // ⭐ 新增
/>



      ))}

      {/* 右側按鈕群 */}
      <main className="pointer-events-auto absolute top-1/3 right-20 -translate-y-1/2 flex flex-col gap-6">

        <button
          className="w-12 h-12 rounded-full border text-white text-xl"
          style={{ backgroundColor: activeColor }}
          onClick={cycleColor}
        >
          🗒️
        </button>
     
<button
  ref={moodBtnRef}
  className="pointer-events-auto w-12 h-12 rounded-full border bg-orange-100 text-white text-xl"
  onClick={() => {
    if (moodBtnRef.current) {
      const rect = moodBtnRef.current.getBoundingClientRect()
      setMoodPos({
        x: rect.left,      // 按鈕左上角位置
        y: rect.top + rect.height / 2 // 按鈕垂直中心
      })
    }
    setShowMood(prev => !prev)
  }}
>
  😊
</button>
<button
  className="w-12 h-12 rounded-full border bg-orange-100 text-white text-xl"
  onClick={clearAllNotes}
>
  💣
</button>



      </main>
      {/* 😊 展開面板 */}
{showMood && (
  <div
    className="
      pointer-events-auto 
      absolute 
      bg-white/70 
      backdrop-blur-md 
      rounded-2xl 
      grid 
      grid-cols-3 
      gap-3 
      p-5
      shadow-lg
      transform -translate-y-1/2
    "
    style={{
      left: moodPos.x - 170, // 面板貼在按鈕左側（220px 可調）
      top: moodPos.y + 35
    }}
  >
    {["😀", "😌", "🤔", "😎", "😭", "🔥"].map((icon, idx) => (
      <button
        key={idx}
        className="w-full h-full flex items-center justify-center rounded-xl text-2xl bg-white/80 hover:bg-white transition-all"
      >
        {icon}
      </button>
    ))}
  </div>
)}


    </div>
  )
}

export default Todolist
