import { XMarkIcon } from "@heroicons/react/24/outline";
export default function BudgetCard({id,name,amount,currency="USD", onDelete}) {
    return (
        <div className="relative rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm">
            <button
                type="button"
                onClick={() => { if (confirm("Delete this budget?")) onDelete?.(id); }}
                className="absolute top-2 right-2 text-slate-400 hover:text-red-600"
                title="Delete budget"
                aria-label="Delete budget"
            >
                <XMarkIcon className="h-5 w-5" />
            </button>

            <p className="text-lg font-semibold text-slate-700 pr-8">{name}</p>
            <p className="mt-2 text-sm text-slate-500">amount</p>
            <p className="mt-1 text-2xl font-bold text-emerald-700">
                {new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(amount)} {currency}
            </p>
        </div>
    );
}