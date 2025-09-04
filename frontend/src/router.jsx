import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home.jsx";
function Router (){
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
        </Routes>
    )
}

export default Router;
