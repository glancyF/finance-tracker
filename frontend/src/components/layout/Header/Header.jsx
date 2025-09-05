import {useState, useMemo, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import Logo from "./Logo.jsx"
import { User } from "lucide-react";
import About from "./About.jsx"
import Profile from "./Profile.jsx"

export default function Header({isLogged = true}){
    return (
        <header className="sticky top-0 z-20 border-b-4 border-green-800 backdrop-blur supports-[backdrop-filter]:bg-[#22c55e]/60 bg-[#22c55e]/90">
        <div className="mx-auto max-w-6xl px-3 sm:px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Logo/>
                        <About/>
                    </div>

                    {(isLogged) && <Profile/>}

                </div>
            </div>
        </header>

    )
}