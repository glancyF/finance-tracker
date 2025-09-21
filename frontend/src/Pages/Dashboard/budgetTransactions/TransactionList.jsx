
export default function TransactionList ({items,currency="USD",onEdit,onDelete,loading}){
    if(loading) return <div className="text-slate-500">Loading...</div>
    if(!items.length) return <div className="text-slate-500">No transactions yet</div>

    return(
        <div className="overflow-x-auto rounded-2xl border border-emerald-200 bg-white">
            <table className="min-w-full table-fixed border-separate border-spacing-0">
                <thead className="bg-emerald-50 text-slate-700">
                <tr>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-right">Amount</th>
                    <th className="px-4 py-2 text-left">Comment</th>
                    <th className="px-4 py-2 text-right">Actions</th>
                </tr>
                </thead>
                <tbody>
                {items.map(t=>(
                    <tr key={t.id} className="border-t">
                        <td className="px-4 py-2">{t.date}</td>
                        <td className="px-4 py-2">{t.category?.name || "—"}</td>
                        <td className="px-4 py-2">
                            {t.type === "income" ? <span className="text-emerald-700">↑ income</span> : <span className="text-red-700">↓ expense</span>}
                        </td>
                        <td className="px-4 py-2 text-right">
                            {new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(t.amount)} {currency}
                        </td>
                        <td className="px-4 py-2">{t.comment || "—"}</td>
                        <td className="px-4 py-2 text-right">
                            <button className="mr-2 text-emerald-700 hover:underline" onClick={() => onEdit(t)}>Edit</button>
                            <button className="text-red-700 hover:underline" onClick={() => onDelete(t.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}