import { useState, useRef, useEffect } from "react";
import useCameraStore from "../../../stoer/usebr";
import { useAppLoading } from "../../../../Home/useAppLoading";


function LoaderBridge() {
  const { active } = useProgress()
  const finishLoading = useAppLoading((s) => s.finishLoading)

  useEffect(() => {
    // active = true 表示還在載
    if (!active) {
      finishLoading()
    }
  }, [active, finishLoading])

  return null
}
const CassetteCarousel = () => {
  const albums = [
    { id: "t1", title: "Sunset Memory", cma:"core" },
    { id: "t2", title: "Plastic Dreams", cma:"twoScene" },
    { id: "t3", title: "Lo-Fi Window", cma:"threeScene" },
    { id: "t4", title: "VHS Grain", cma:"threeScene" },
    { id: "t5", title: "Neon Dust", cma:"threeScene" },
  ];


  const switchTo = useCameraStore((state) => state.switchTo);

  const [showAlbums, setShowAlbums] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowAlbums(false);
      }
    };
    if (showAlbums) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAlbums]);

  return (
    <>
    <LoaderBridge>

      {/* 展開按鈕：靠左、往上調一點 */}
      {!showAlbums && (
        <button
        onClick={() => setShowAlbums(true)}
        className="fixed left-10 top-[60%] -translate-y-1/2 z-[99]
             border-white/40 text-white/70 rounded-md border-2
             w-[40px] h-[100px] flex items-center justify-center text-2xl
             bg-white/5 backdrop-blur-md
             opacity-40 hover:opacity-100 hover:bg-white/20 hover:text-amber-900
             transition-all duration-300"
             title="展開專輯"
>
  →
</button>

)}

      {/* 專輯列：用同一個垂直錨點，與按鈕同高度 */}
      {showAlbums && (
        <div
        ref={containerRef}
    className="fixed top-[58%] -translate-y-1/2 left-[50px] z-[99998]
    rounded-3xl px-6 pt-3 pb-3  border border-white/30
               backdrop-blur-md shadow-lg"
  >
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-6 justify-center">
        {albums.map((a) => (
          <div
            key={a.id}
            onClick={() => {
              switchTo(a.cma);
              setShowAlbums(false);
            }}
            className="w-[140px] h-[90px] bg-white/10 text-white text-2xl
                       rounded-lg border-2 border-white/30 flex items-center justify-center
                       cursor-pointer transition-all duration-200
                       hover:bg-white/50 hover:text-black"
          >
            {a.title}
          </div>
        ))}
      </div>
    </div>
  </div>
)}

</LoaderBridge>
    </>
  );
};

export default CassetteCarousel;
