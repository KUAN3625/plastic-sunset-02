import { useEffect, useState } from "react"
import TimerPanel from "../../components/tool-page/Pomodoro/TimePanel"
import SideMenu from "../../components/ui/Settings_UI/Side";
import Musicbox from "../../components/tool-page/music/Musicplay"
import { useSFXStore } from "../../components/stoer/useSFXStore";
import { songsdata } from "../../data/song";
import HideToggleButton from "../../components/ui/Eyes";
import CassetteCarousel from "../../components/ui/Music/Music_CC/CassetteCarousel";



const Core = () => {
  const [isHidden, setIsHidden] = useState(false);

  return (
   <main className="relative min-h-screen w-full overflow-hidden">

  {/* 3D 背景（保持在最底層） */}
  {/* Canvas 在外層就好，不要包在 safe-zone 裡 */}

  {/* UI Safe Zone（負責全站 RWD） */}
  <div
    className={`absolute inset-0 transition-opacity duration-500 
    ${isHidden ? "opacity-0 pointer-events-none" : "opacity-100"}
   `}
  >

    {/* 左上角 SideMenu */}
    <div className="absolute top-4 left-4">
      <SideMenu />
    </div>

    {/* 右上角 TimerPanel */}
    <div className="absolute top-6 right-6 w-[min(38vw,380px)] min-w-[260px]">
      <TimerPanel />
    </div>

    {/* 左下角 Musicbox */}
    <div className="absolute bottom-6 left-6 w-[min(60vw,520px)] min-w-[260px]">
      <Musicbox songs={songsdata} />
    </div>

    {/* 中下 Cassette Carousel（RWD 自動換位置） */}
    {/* <div className="absolute bottom-10 right-1/2 translate-x-1/2 md:right-6 md:translate-x-0 md:w-[300px]">
      <CassetteCarousel />
    </div> */}
  </div>

  {/* 右下角 Hide UI 按鈕 */}
  <HideToggleButton
    isHidden={isHidden}
    onToggle={() => setIsHidden(!isHidden)}
  />
</main>



  )

}

export default Core