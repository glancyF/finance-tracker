
import {pxShadow} from "./UIComponents.js"
import user from "../../../assets/user.svg";
import {Link} from "react-router-dom";
export default function Profile (){
    return (
        <Link to="/profile" className="flex items-center gap-3 select-none" aria-label="Profile">
            <img src={user} alt="Profile" className="h-8 w-8" style={pxShadow("#195d1d")} />
        </Link>
    );
}