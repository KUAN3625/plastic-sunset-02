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
  );
};

export default HideToggleButton;
