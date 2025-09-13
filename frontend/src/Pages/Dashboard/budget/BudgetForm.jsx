import { CURRENCIES } from "../../../utils/budgetConstants";
import useBudgetForm from "../../../hooks/useBudgetForm";

export default function BudgetForm({initialValues,onSubmitSuccess, onCancel}){
    const {values,errors,handlers,submit} = useBudgetForm(initialValues);
    const onSubmit = (e) =>{
        e.preventDefault();
        const res = submit();
        if(!res.ok)return;
        onSubmitSuccess(res.data);
    };
    return (
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Budget's name</label>
                <input
                    type="text"
                    required
                    minLength={1}
                    maxLength={64}
                    {...handlers.text("name")}
                    className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${errors.name ? "border-red-300 focus:ring-red-200" : "border-emerald-200 focus:ring-emerald-200"}`}
                    placeholder="Example: House, Travells…"
                    autoFocus
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "budget-name-error" : undefined}/>
                {errors.name && (
                    <p id="budget-name-error" className="mt-1 text-xs text-red-600">{errors.name}</p>
                )}
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_140px]">
            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Amount</label>
                <input inputMode="decimal"
                       type="number"
                       required
                       step="0.01"
                       min="0"
                    {...handlers.text("amount")}
                       className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${errors.amount ? "border-red-300 focus:ring-red-200" : "border-emerald-200 focus:ring-emerald-200"}`}
                       placeholder="0.00"
                       aria-invalid={Boolean(errors.amount)}
                       aria-describedby={errors.amount ? "budget-amount-error" : undefined}/>
                {errors.amount && (
                    <p id="budget-amount-error" className="mt-1 text-xs text-red-600">{errors.amount}</p>
                )}
            </div>
                <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Currency</label>
                <select
                    {...handlers.select("currency")}
                    className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${errors.currency ? "border-red-300 focus:ring-red-200" : "border-emerald-200 focus:ring-emerald-200"}`}
                    aria-invalid={Boolean(errors.currency)}
                    aria-describedby={errors.currency ? "budget-currency-error" : undefined}
                >
                    {CURRENCIES.map((c) =>(
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
                {errors.currency && (
                    <p id="budget-currency-error" className="mt-1 text-xs text-red-600">{errors.currency}</p>
                )}
            </div>
            </div>
            <div className="mt-2 flex items-center gap-3">
                <button type="button" onClick={onCancel} className="rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100">Cancel</button>
                <button type="submit" className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700">Add</button>
            </div>
        </form>
    );
}