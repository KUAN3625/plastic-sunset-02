const TimeBtn = ({ label, Component, componentProps = {} }) => {
  return (
    <label
      className="flex items-center justify-between
                 gap-4 w-full max-w-[18rem]
                 py-[clamp(0.3rem,0.8vh,0.6rem)]
                 text-gray-900"
    >
      {/* 標籤文字 */}
<span
  className="text-[clamp(1.6rem,3vw,2rem)]
             font-black leading-none tracking-wide text-gray-900">
  {label}
</span>


      {/* 控制區塊 */}
<div
  className="flex items-center justify-end
             w-[clamp(8rem,18vw,12rem)]
             px-[clamp(0.2rem,0.5vw,0.4rem)]
             py-[clamp(0.1rem,0.3vh,0.25rem)]
             rounded-md bg-transparent"
>
  <div className="w-full max-w-[10rem]">
    {Component ? <Component {...componentProps} /> : null}
  </div>
</div>

    </label>
  )
}

export default TimeBtn
