import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center gap-6 h-screen w-screen">
            <h1 className="text-9xl text-white/60 font-bold">404</h1>
            <button
                onClick={() => navigate(-1)}
                className="text-white/50 text-sm font-mono tracking-widest hover:text-white/80 transition"
            >
                ← 返回上一頁
            </button>
        </div>
    )
}




export default NotFound