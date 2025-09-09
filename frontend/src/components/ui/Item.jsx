import {NavLink} from "react-router-dom";

export default function Item({to, children}){
    return (
        <NavLink
            to={to}
            end
            className={({ isActive }) =>
                [
                    "block rounded-xl px-4 py-2 font-medium transition",
                    isActive
                        ? "bg-emerald-100 text-emerald-900"
                        : "hover:bg-emerald-50 text-slate-700",
                ].join(" ")
            }
        >
            {children}
        </NavLink>
    );
}