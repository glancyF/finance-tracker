import TransactionForm from "./TransactionForm.jsx";

export default function TransactionDialog ({open,onClose,title,children,...formProps}){
    if(!open) return null;
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onMouseDown={onClose}>
            <div className="w-full max-w-lg rounded-2xl bg-white p-4" onMouseDown={(e) => e.stopPropagation()}>
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-700">✕</button>
                </div>
                <TransactionForm {...formProps} onCancel={onClose} />
            </div>
        </div>
    )
}
