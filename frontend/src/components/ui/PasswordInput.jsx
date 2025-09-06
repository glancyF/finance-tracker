import {useState} from "react";
import Input from "./Input.jsx";

export default function PasswordInput(props) {
    const [show,setShow] = useState(false);
    return (
        <div className="relative">
            <Input type={show ? "text" : "password"} {...props}/>
            <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-slate-600 hover:underline"
                onClick={() => setShow((v) => !v)}
                >
                {show ? "Close" : "Show"}
            </button>
        </div>
    );
}