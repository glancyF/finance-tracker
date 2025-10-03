
import EditBudgetButton from "./EditBudgetButton.jsx";
import DeleteBudgetButton from "./DeleteBudgetButton.jsx";
import {Link, useNavigate} from "react-router-dom";
export default function BudgetCard({id,name,amount,currency="USD", onDelete,onEditItem}) {
     const nav = useNavigate();
    return (

        <div className="relative rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm"
             onClick={(e) => {
                 if (
                     e.target.closest("[data-action=delete]") ||
                     e.target.closest("[data-action=edit]")
                 )
                     return;
                 nav(`/dashboard/${id}`);
             }}
        >
            <div className="md:absolute md:top-2 md:right-2 flex md:flex-col items-end md:space-y-1 gap-2 card-actions">
                <DeleteBudgetButton id={id} onDelete={onDelete}/>
                <EditBudgetButton id={id} name={name} onEdit={onEditItem}/>
            </div>
            <p className="text-lg font-semibold text-slate-700 pr-0 md:pr-8 truncate">{name}</p>
            <p className="mt-2 text-sm text-slate-500">amount</p>
            <p className="mt-1 text-2xl font-bold text-emerald-700">
                {new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(amount)} {currency}
            </p>

        </div>
    );
}