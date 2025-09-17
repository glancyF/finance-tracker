
import { AiTwotoneEdit } from 'react-icons/ai';
import DeleteBudgetButton from "./DeleteBudgetButton.jsx";
export default function BudgetCard({id,name,amount,currency="USD", onDelete}) {
    return (
        <div className="relative rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm">
            <DeleteBudgetButton id={id} onDelete={onDelete}/>
            <p className="text-lg font-semibold text-slate-700 pr-8">{name}</p>
            <p className="mt-2 text-sm text-slate-500">amount</p>
            <p className="mt-1 text-2xl font-bold text-emerald-700">
                {new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(amount)} {currency}
            </p>
        </div>
    );
}