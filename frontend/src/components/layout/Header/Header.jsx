import Logo from "./Logo.jsx";
import NavLinks from "./NavLinks.jsx";
import Profile from "./Profile.jsx";
import Login from "./Login.jsx";
import { useAuth } from "../../../features/auth/AuthContext.jsx";
import {useTitle} from "../../../hooks/useTitle.js";

export default function Header({ title = "Main" }) {
    const { user, loading } = useAuth();
    useTitle(title);
    return (
        <header
            className="
    sticky top-0 z-50
    bg-white/80
    backdrop-blur-xl supports-[backdrop-filter]:bg-white/60
    border-b border-[#F0F0F0]
  "
        >

            <div className="mx-auto max-w-7xl px-4">
                <div className="flex h-14 items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Logo />
                        <nav className="flex flex-col gap-2 md:flex-row md:gap-4">
                            <NavLinks />
                        </nav>
                    </div>
                    <div className="flex items-center gap-3">
                        {loading ? null : user ? <Profile /> : <Login />}
                    </div>
                </div>
            </div>
        </header>
    );
}