import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import LogoSmall from "../../components/ui/LogoSmall"
import Titlevideo from "../../components/ui/title-video"
import { useAppLoading } from "../useAppLoading"

const Entry = () => {
    const navigate = useNavigate()
    const { isReady } = useAppLoading()   // ← 你載入是否完成

    // 🚀 偵測載入完成後自動跳轉
    useEffect(() => {
        if (isReady) {
            navigate("/login")
        }
    }, [isReady, navigate])


    return (
        <header className="pointer-events-auto pb-2 min-h-screen w-full flex flex-col items-center justify-between bg-black">
            <LogoSmall />
            <Titlevideo to="/login" />   {/* ← UI 不動，照舊 */}
            <div className="flex mb-8">
                <p className="text-red-50 font-mono animate-pulse">Loading...</p>
            </div>
        </header>
    )
}

export default Entry
