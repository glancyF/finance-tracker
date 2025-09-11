import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../../components/layout/Header/Header.jsx";
import { useAuth } from "../../features/auth/AuthContext.jsx";
import { auth } from "../../lib/authApi.js";
import Item from "../../components/ui/Item.jsx";


export default function ProfileLayout (){
    const nav = useNavigate();
    const {user,setUser} = useAuth();
    useEffect(()=> {
       if(!user) nav("/login",{replace:true});
    },[user,nav]);

    async function onLogout(){
        try{
            await auth.logout();
        }finally {
            setUser(null);
            nav("/login",{replace:true})
        }
    }
    return (
        <>
        <Header/>
            <main className="mx-auto max-w-6xl px-4 py-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
                    <aside className="rounded-2xl border border-emerald-200 bg-white p-3">
                        <div className="mb-3 flex items-center justify-between">
                            <p className="px-2 text-xl font-semibold text-slate-600">Profile</p>
                            <button
                                onClick={onLogout}
                                className="rounded-lg bg-red-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                        <nav className="space-y-1">
                            <Item to="/profile" exact={true}>Overview</Item>
                            <Item to="settings">Settings</Item>
                            <Item to="password">Change password</Item>
                            {user?.role === "admin" && <Item to="/admin">Admin panel</Item>}
                        </nav>
                    </aside>
                    <section className="rounded-2xl border border-emerald-200 bg-white p-4 md:p-6">
                        <Outlet/>
                    </section>
                </div>
            </main>
        </>
    )

}