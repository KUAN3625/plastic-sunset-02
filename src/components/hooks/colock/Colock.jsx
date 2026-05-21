import Number from "../../tool-page/Pomodoro/Number/auto Number";
import { usePomodoroSettings } from "../../stoer/usePomodoroSettings";
import { useClock } from "./useClock";
import { usePomodoroTimer } from "../../stoer/usePomodoroTimer";

{/*時鐘邏輯封裝層，跟Panel(滑稈)共用狀態*/ }


const ClockMode = ({ isHovering }) => {
    const { text } = useClock(); //正常時間
    const { focus, rest } = usePomodoroSettings(); //滑稈
    const { status } = usePomodoroTimer();
    
    const formatMinutes = (value) => String(value).padStart(2, "0");
    
    {/*--------下方為番茄鐘顯示邏輯----- */}
    const remainingSec = usePomodoroTimer((s) => s.remainingSec);

    const mm = String(Math.floor(remainingSec / 60)).padStart(2, "0");
    const ss = String(remainingSec % 60).padStart(2, "0");
    const runtimeText = `${mm}:${ss}`;
    {/*--------上方為番茄鐘顯示邏輯----- */}

const isAnyDragging = focus.isDragging || rest.isDragging;
  const displayText =
    status === "focus" || status === "rest"
      ? runtimeText
      : isAnyDragging || isHovering
       ? `${formatMinutes(focus.time)}|${formatMinutes(rest.time)}`
      : text;

  // 只在運作中讓冒號閃；暫停/其他狀態不閃
  const shouldBlink = status === "focus" || status === "rest";
  const blinkClass = shouldBlink ? "ps-blink-colon" : "";

  // 如果是 mm:ss 才做拆分，其他（例如 12|5 或一般時間字串）就原樣顯示
  let content = displayText;
  if (displayText.includes(":")) {
    const [m, s] = displayText.split(":");
    content = (
      <>
        <span>{m}</span>
        <span className={blinkClass}>:</span>
        <span>{s}</span>
      </>
    );
  }

  return <Number content={content} />;
};


export default ClockMode