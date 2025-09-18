
import Logo from "./Logo.jsx"
import NavLinks from "./NavLinks.jsx"
import Profile from "./Profile.jsx"
import Login from "./Login.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../features/auth/AuthContext.jsx"

export default function Header(){
   const {user,loading} = useAuth();


    return (
        <header className="sticky top-0 z-20 border-b-4 border-green-800 backdrop-blur supports-[backdrop-filter]:bg-[#22c55e]/60 bg-[#22c55e]/90">
        <div className="mx-auto max-w-6xl px-3 sm:px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Logo/>
                        <NavLinks/>

                    </div>
                    {loading ? null : (user ? <Profile/> : <Login/>)}
                </div>
            </div>
        </header>

    )
}