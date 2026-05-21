import { useNavigate } from "react-router-dom";
import { useSFXStore } from "../stoer/useSFXStore";



const Loginbtn = (props) => {
  const play = useSFXStore((state) => state.play);
  const navigate = useNavigate();

  const handleClick = () => {
    if (props.onBeforeNavigate) {
      props.onBeforeNavigate()
    }
    navigate(props.to)

  }

  return (
    <div onClick={() =>{
      handleClick();
      play("ui.click");
    }  
    }
      className={`pointer-events-auto px-8 h-10 border-2 border-black rounded-full w-80 grid place-items-center mx-auto
     hover:shadow-2xl hover:bg-black hover:text-white
     ${props.className || ""}`}
    >

      {props.nametext}


    </div>

  );
};
export default Loginbtn;
