
import EditBudgetButton from "./EditBudgetButton.jsx";
import DeleteBudgetButton from "./DeleteBudgetButton.jsx";
export default function BudgetCard({id,name,amount,currency="USD", onDelete,onEditItem}) {
    return (
        <div className="relative rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm">
            <div className="absolute top-2 right-2 flex flex-col items-end space-y-1">
                <DeleteBudgetButton id={id} onDelete={onDelete}/>
                <EditBudgetButton id={id} name={name} onEdit={onEditItem}/>
            </div>
            <p className="text-lg font-semibold text-slate-700 pr-8">{name}</p>
            <p className="mt-2 text-sm text-slate-500">amount</p>
            <p className="mt-1 text-2xl font-bold text-emerald-700">
                {new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(amount)} {currency}
            </p>
        </div>
    );
}