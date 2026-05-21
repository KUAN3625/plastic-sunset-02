// components/hooks/colock/gridoverlay.jsx
import { useEffect, useRef } from "react"

function GridOverlay({ className = "" }) {
  const ref = useRef(null)

  useEffect(() => {
    const toggle = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "g") {
        if (!ref.current) return
        ref.current.style.display =
          ref.current.style.display === "none" ? "block" : "none"
      }
    }
    window.addEventListener("keydown", toggle)
    return () => window.removeEventListener("keydown", toggle)
  }, [])

  return <div ref={ref} className={`grid-overlay ${className}`} />
}

export default GridOverlay
