import { useNavigate } from "react-router-dom";

const Titlevideo = (props) => {

const navigate = useNavigate();



  return (

    <div 
    onClick={()=> navigate(props.to)}
    className="w-full max-w-2xl   px-4">
      {/* 固定高度的內容區 */}
      <div className="h-48 sm:h-56 md:h-64 flex items-center justify-center">
        <video
          src=" /LOGO.mp4 "
          autoPlay
          loop
          muted
          playsInline
          className="max-h-full max-w-full object-contain"
        />
      </div>
    </div>

  )

}


export default Titlevideo