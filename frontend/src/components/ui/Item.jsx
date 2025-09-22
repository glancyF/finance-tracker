import {NavLink, useLocation} from "react-router-dom";

export default function Item({to, children, exact=false, budgetGroup = false}){
    const {pathname} = useLocation();
    let customActive = false;
    if(budgetGroup&& to === '/dashboard'){
        customActive =
            pathname === "/dashboard" || /^\/dashboard\/[^/]+$/.test(pathname);
    }


    return (
        <NavLink
            to={to}
            end={exact}
            className={({ isActive }) =>
                [
                    "block rounded-xl px-4 py-2 font-medium transition",
                  customActive ||  isActive
                        ? "bg-emerald-100 text-emerald-900"
                        : "hover:bg-emerald-50 text-slate-700",
                ].join(" ")
            }
        >
            {children}
        </NavLink>
    );
}