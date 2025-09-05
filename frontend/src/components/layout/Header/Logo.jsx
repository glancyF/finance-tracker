import {pxShadow} from "./UIComponents.js"
import logo from "../../../assets/logo.svg";
import {Link} from "react-router-dom"
export default function Logo() {
    return (
        <Link to="/" className="flex items-center gap-3 select-none" aria-label="Home">
            <img src={logo} alt="FinTrack logo" className="h-8 w-8" style={pxShadow("#195d1d")} />
            <span className="font-black tracking-wider uppercase">FinTrack</span>
        </Link>
    );
}