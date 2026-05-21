import Loginbtn from "../../components/ui/LoginBtn"
import useCameraStore from "../../components/stoer/usebr"

const Login = () => {
  const switchTo = useCameraStore(s => s.switchTo)

  return (
    <div className="
      relative z-10 w-full min-h-screen
      flex items-center justify-center 
      px-4
    ">

      {/* 背景遮罩 */}
      <div className="
        absolute inset-0 
        bg-white/10 
        backdrop-blur-sm 
        pointer-events-none
      " />

      {/* RWD 容器 */}
      <div className="
        relative
        w-full max-w-[420px]
        flex flex-col items-center
        gap-6
        pt-[10vh]       /* ⭐ 讓按鈕浮到太陽上方 */
      ">

        {/* Google Login */}
        <Loginbtn
          nametext="Google Login"
          className="
          opacity-60 hover:opacity-80 
            text-gray-700
          text-[clamp(16px,2vw,24px)]"
          to="/*"
          onBeforeNavigate={() => switchTo("menu")}
        />

        {/* Email Login */}
        <Loginbtn
          nametext="Email Login"
          className="
          opacity-60 hover:opacity-80 
            text-gray-700
          text-[clamp(16px,2vw,24px)]"
          to="/*"
          onBeforeNavigate={() => switchTo("twoScene")}
        />

        {/* Visitor */}
        <Loginbtn
          nametext="Visitor"
          className="
            opacity-60 hover:opacity-80 
            text-gray-700
            text-[clamp(14px,1.8vw,20px)]
          "
          to="/*"
          onBeforeNavigate={() => switchTo("login")}
        />

        {/* OK Button */}
        <Loginbtn
          nametext="OK"
          className="text-[clamp(16px,2vw,24px)]"
          to="/core"
          onBeforeNavigate={() => switchTo("core")}
        />

      </div>
    </div>
  )
}

export default Login
