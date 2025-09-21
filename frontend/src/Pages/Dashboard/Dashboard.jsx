import { auth } from "../../lib/authApi.js";
import { useAuth } from "../../features/auth/AuthContext.jsx";
import Header from "../../components/layout/Header/Header.jsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Item from "../../components/ui/Item.jsx";

export default function Dashboard(){
    const {user,setUser} = useAuth();
    const nav = useNavigate();
    useEffect(()=> {
        if(!user) nav("/login",{replace:true});
    },[user,nav]);

    return (
        <>
        <Header/>
        <main className="mx-auto max-w-7xl py-8 grid grid-cols-[240px_1fr] gap-6">
            <aside className="sticky top-20 h-[calc(100vh-5rem)] rounded-2xl border border-emerald-200 bg-white p-3 flex flex-col">
                <div className="mb-3 flex items-center justify-between">
                    <p className="px-2 text-xl font-semibold text-slate-600">Dashboard sections</p>
                </div>
                <nav className="space-y-1 flex-1">
                    <Item to="/dashboard" budgetGroup>Budget</Item>
                    <Item to="/dashboard/statistics" exact>Stats</Item>
                    <Item to="*">Test</Item>
                </nav>

            </aside>
            <section className="rounded-2xl border border-emerald-200 bg-white p-4 md:p-6">
                <Outlet />
            </section>
        </main>
        </>
    );
}