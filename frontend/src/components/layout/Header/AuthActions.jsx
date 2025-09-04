import { Link } from "react-router-dom";

export default function AuthActions ({isAuthed,onLogin,onRegister,onLogout}){
    if(isAuthed){
        return (
            <div className="flex items-center gap-3">
                <Link to="/zahlushka" className="rounded-xl border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900">
                    Dashboard
                </Link>
                <button onClick={onLogout} className="rounded-xl px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900">
                    Logout
                </button>
            </div>
        );
    }
    return (
        <div className="flex items-center gap-3">
            <button onClick={onLogin} className="rounded-xl border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900">
            Login
            </button>
        </div>
    )
}