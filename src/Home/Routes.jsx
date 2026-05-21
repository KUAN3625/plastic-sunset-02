import{Routes, Route} from "react-router-dom";
import Core from "./Core/Core";
import Entry from "./Entry/Entry";
import Todolist from "./Todolist/Todolist";
import Setting from "./Settings/Setting";
import About from "./About/About";
import Login from "./Login/Login";
import NotFound from "./NotFound";
import SlowThing from "../components/three/CanvasHome";
import Entry2 from "./Entry/Entry_2";


const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Entry/> /*暫時修正*/} />
            <Route path="/OK" element={<Entry2/>} />
            <Route path="/core" element={<Core/>} />
            <Route path="/todo" element={<Todolist/>} />
            <Route path="/setting" element={<Setting/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/3d" element = {<SlowThing />}/>
        </Routes>
    )

}

export default AppRoutes;