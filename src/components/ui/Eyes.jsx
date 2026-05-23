// src/components/ui/HideToggleButton.jsx
import { Eye, EyeOff } from "lucide-react";
import { useSFXStore } from "../stoer/useSFXStore";

/**
 * 隱藏／顯示介面切換按鈕
 *
 * Props:
 * - isHidden: Boolean → 當前 UI 是否隱藏
 * - onToggle: Function → 切換時執行的函式
 */
const HideToggleButton = ({ isHidden, onToggle }) => {
  const play = useSFXStore((state) => state.play);

  return (
    <>
      {/* 隱藏時顯示跑馬燈 */}
      {isHidden && (
        <div className="pointer-events-none fixed top-0 left-0 w-full z-50 overflow-hidden
                        bg-black/40 backdrop-blur-md py-3">
          <div className="flex whitespace-nowrap animate-marquee">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="text-white text-xl font-mono tracking-[0.3em] mx-12 drop-shadow-md">
                請隨意使用
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => {
          onToggle();
          play("ui.click");
        }}
        className="pointer-events-auto absolute bottom-3 right-20 z-50 p-2 rounded-full
                   bg-white/30 backdrop-blur-md shadow-md
                   hover:bg-white/50 transition"
        title={isHidden ? "顯示介面" : "隱藏介面"}
      >
        {isHidden ? <Eye size={15} /> : <EyeOff size={15} />}
      </button>
    </>
  );
};

export default HideToggleButton;
