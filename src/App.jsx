import "./App.css"
import AppRoutes from "./Home/Routes"
import GridOverlay from "./components/hooks/colock/gridoverlay"
import BgCanvas from "./components/three/CanvasHome"

function App() {
  return (
    <>
    <div>

      <GridOverlay className="z-9999" /> 
    </div>
      {/* 背景：滿版 3D Canvas */}
      <div className="ps-fullscreen z-11 pointer-events-none">
        <BgCanvas />
      </div>

      {/* 前景：整個 App UI 滿版覆蓋在上層 */}
      <div className="fixed inset-0 z-12">
        
        <AppRoutes />
      </div>
    </>
  )
}

export default App

