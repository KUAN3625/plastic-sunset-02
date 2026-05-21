import useCameraStore from "../stoer/usebr"

export const Testbut = ( ) => {
const switchTo = useCameraStore(s => s.switchTo) 

return(
   <div
      className="fixed top-4 left-4 z-50 space-x-4"
      style={{ pointerEvents: "auto" }} // ⬅️ 確保按鈕可以被點
    >
        <button 
        onClick={() => switchTo("core")}>
                    M
                </button >

      <button
        onClick={() => {
          // 切回 login
          switchTo("mainScene")
        }}
      >
        Login
      </button>


    </div>

)

}