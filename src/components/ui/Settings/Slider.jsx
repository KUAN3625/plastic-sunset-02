// 通用滑桿元件
const Slider = ({ min, max, step, value, onChange, onStart, onEnd, className = "" }) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      onMouseDown={onStart}
      onMouseUp={onEnd}
      className={`w-full cursor-pointer appearance-none bg-transparent ${className}`}
      style={{
        WebkitAppearance: "none",
        height: "12px",
      }}
    />
  )
}

export default Slider
