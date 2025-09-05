import {Link} from "react-router-dom";
import {pxShadow} from "./UIComponents.js"
import logo from "../../../assets/logo.svg";
export default function Logo() {
    return (
        <a href="/" className="flex items-center gap-3 select-none">
            <img
                src={logo}
                alt="Logo"
                className="h-8 w-8"
                style={pxShadow("#195d1d")}
            />
            <span className="font-black tracking-wider uppercase">FinTrack</span>
        </a>
    );
}