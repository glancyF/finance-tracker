import { CURRENCIES } from "../../../utils/budgetConstants";
import useBudgetForm from "../../../hooks/useBudgetForm";
import {useEffect, useMemo, useState} from "react";

export default function BudgetForm({initialValues,onSubmitSuccess, onCancel, mode="create",original,fields = { name: true, amount: true, currency: true }}){
    const {values,errors,handlers,submit,reset} = useBudgetForm(initialValues, {fields,original});
    const [submitting, setSubmitting] = useState(false);
    const [info,setInfo] = useState("");


    useEffect(() => { reset(initialValues); setInfo(""); }, [initialValues, reset]);
    const isUnChanged = useMemo(() => {
        if (mode !== "edit" || !original) return false;
        const keys = Object.keys(fields).filter(k => fields[k]);
        return keys.every((k) =>{
           const curr = (values?.[k] ?? "").toString().trim();
           const orig = (original?.[k] ?? "").toString().trim();
           return curr === orig;
        });
    },[mode,original,values,fields]);

    const btnLabel = mode === "edit" ? "Save" : "Add";
    const onSubmit = async (e) =>{
        e.preventDefault();
        if(submitting) return;
        setInfo("");
        if(mode === "edit" && isUnChanged) {
            setInfo("Nothing to update");
            return;
        }
        setSubmitting(true);
        try{
            const res = await submit();
            if(!res.ok)return;
            await onSubmitSuccess(res.data);
        }finally {
            setSubmitting(false);
        }

    };
    return (
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
            {info && (
                <div className="rounded-lg px-3 py-2 text-sm bg-blue-50 text-blue-700">
                    {info}
                </div>
            )}

            {fields.name && (
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Budget's name
                    </label>
                    <input
                        type="text"
                        required
                        minLength={1}
                        maxLength={64}
                        {...handlers.text("name")}
                        className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2
              ${errors.name ? "border-red-300 focus:ring-red-200" : "border-emerald-200 focus:ring-emerald-200"}`}
                        placeholder="Example: House, Travels…"
                        autoFocus
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "budget-name-error" : undefined}
                    />
                    {errors.name && (
                        <p id="budget-name-error" className="mt-1 text-xs text-red-600">{errors.name}</p>
                    )}
                </div>
            )}

            {(fields.amount || fields.currency) && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_140px]">
                    {fields.amount && (
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Amount</label>
                            <input
                                inputMode="decimal"
                                type="number"
                                required
                                step="0.01"
                                min="0"
                                {...handlers.text("amount")}
                                className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2
                  ${errors.amount ? "border-red-300 focus:ring-red-200" : "border-emerald-200 focus:ring-emerald-200"}`}
                                placeholder="0.00"
                                aria-invalid={Boolean(errors.amount)}
                                aria-describedby={errors.amount ? "budget-amount-error" : undefined}
                            />
                            {errors.amount && (
                                <p id="budget-amount-error" className="mt-1 text-xs text-red-600">{errors.amount}</p>
                            )}
                        </div>
                    )}

                    {fields.currency && (
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Currency</label>
                            <select
                                {...handlers.select("currency")}
                                className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2
                  ${errors.currency ? "border-red-300 focus:ring-red-200" : "border-emerald-200 focus:ring-emerald-200"}`}
                                aria-invalid={Boolean(errors.currency)}
                                aria-describedby={errors.currency ? "budget-currency-error" : undefined}
                            >
                                {CURRENCIES.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            {errors.currency && (
                                <p id="budget-currency-error" className="mt-1 text-xs text-red-600">{errors.currency}</p>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="mt-2 flex items-center gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={submitting || (mode === "edit" && isUnChanged)}
                    className={`rounded-lg px-4 py-2 font-semibold text-white
            ${submitting || (mode === "edit" && isUnChanged)
                        ? "bg-emerald-400 cursor-not-allowed"
                        : "bg-emerald-600 hover:bg-emerald-700"}`}
                >
                    {btnLabel}
                </button>
            </div>
        </form>
    );
}