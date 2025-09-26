import TotalsWidget from "./TotalsWidget.jsx";

export default function BudgetSummary({ total, maxItems }) {
    return (
        <div className="rounded-2xl border border-emerald-200 bg-white p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-slate-600">
                <span className="mr-2 font-semibold text-slate-700">Total:</span>
                <TotalsWidget/>
            </div>
            <div className="text-slate-600">
                <span className="mr-2 font-semibold text-slate-700">Maximum:</span>
                {maxItems} elements
            </div>
        </div>
    );
}