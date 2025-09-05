import {User} from "lucide-react";
import {pxShadow} from "./UIComponents.js"
export default function Profile (){
    return (
        <button
            aria-label="Account"
            className="p-2 border-2 border-green-800 bg-green-100 hover:bg-[#E8FFE8]"
            style={pxShadow("#195d1d")}
        >
            <User className="h-5 w-5" />
        </button>
    )
}