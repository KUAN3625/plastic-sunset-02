import { useEffect, useState } from "react"

{/* 基本的正常時間運作 */}


export function useClock(){

     const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n) => n.toString().padStart(2, "0")
  const hours12 = (h) => (h % 12 || 12)

  const text = `${pad(hours12(time.getHours()))}:${pad(time.getMinutes())}`

  return { text }
}