export default function BudgetCard({name,amount,currency="USD"}) {
    return (
        <div className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm box-border">
            <p className="text-lg font-semibold text-slate-700">{name}</p>
            <p className="mt-2 text-sm text-slate-500">amount</p>
            <p className="mt-1 text-2xl font-bold text-emerald-700">{amount.toLocaleString()}{currency}</p>
        </div>
    );
}