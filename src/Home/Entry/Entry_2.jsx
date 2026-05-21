import LogoSmall from "../../components/ui/LogoSmall"
import Titlevideo from "../../components/ui/title-video"

const Entry2 = ( props ) => {


    return (

        <header className="pointer-events-auto pb-2 min-h-screen w-full  flex flex-col items-center justify-between bg-amber-50${props.className" >
          
            <LogoSmall    />


           < Titlevideo to="/login" />


            <div className=" flex  mb-8">
            <p className="text-red-50 font-mono animate-pulse">▶</p>

            </div>


        </header>

    )

}

export default Entry2