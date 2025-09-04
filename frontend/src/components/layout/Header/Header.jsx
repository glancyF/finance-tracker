import { useState, useMemo } from "react";
import {Link, useNavigate} from "react-router-dom";
import Logo from "./Logo.jsx"
import NavLinks from "./NavLinks.jsx";
import AuthActions from "./AuthActions.jsx";
import Burger from "./Burger.jsx";
import MobileMenu from "./MobileMenu.jsx";

export default function Header ({isAuthed = false}){
    const [open,setOpen] = useState(false);
    const navigate = useNavigate();

    const links = useMemo(() => ([
        { href: "#features", label: "Features" },
        { href: "#faq", label: "FAQ" },
        { href: "#contacts", label: "Contacts" },
    ]), []);

    const actions = {
        onLogin: () => navigate("temp"),
        onRegister: () => navigate("temp"),
        onLogout: () =>("logout api, pak navigate")
    };
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:bg-green-300">
         <div className="mx-auto flex h-16 max-w-6xl items-center  justify-between px-4">
             sdl
         </div>
        </header>
    )
}