import loginIcon from "../../../assets/log-in.svg";
import {pxShadow} from "./UIComponents.js";
import { Link } from "react-router-dom";
export default function Login (){
    return (
        <Link to="/login" className="flex items-center gap-3 select-none" aria-label="Sign in">
            <img src={loginIcon} alt="Sign in" className="h-8 w-8" style={pxShadow("#195d1d")} />
        </Link>
    );
}
