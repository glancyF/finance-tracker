import {useCallback, useEffect, useMemo, useState} from "react";
import BudgetCard from "./ui/BudgetCard.jsx";
import ModalBudget from "./ui/ModalBudget.jsx";
import {budgetApi} from "../../lib/budgetApi.js";
import mapServerErrors from "../../utils/mapServerErrors.js";
const CURRENCIES = ["USD", "EUR", "CZK", "RUB"];
export default function Budget(){
    const maxItems = 9;
    const [items,setItems] = useState([]);
    const total = useMemo(() => items.reduce((s, i) => s + i.amount, 0), [items]);
    const [open,setOpen] = useState(false);
    const [form, setForm] = useState({name: "", amount: "", currency: "USD"})
    const [errors, setErrors] = useState({});
    const [addBtnRef, setAddBtnRef] = useState(null)
    const [touched, setTouched] = useState({});
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false)
    const [loadError, setLoadError] = useState("");

    function validate(values) {
        const e = {};
        if(!values.name.trim()) e.name="Required";
        else{
            if(!/^[\p{L}\p{M}\p{N}\s-]+$/u.test(values.name.trim())) e.name='Invalid symbols'
            if(values.name.trim().length>64) e.name="The length of budget's name can't be more than 64 letters"
        }
        const num = Number(values.amount);
        if(values.amount === "" || Number.isNaN(num)) e.amount="Enter the number";
        if(!values.currency) e.currency = "Choose the currency";
        return e;
    }

    function validateField(field, next = form) {
        const full = validate(next);
        setErrors(prev => {
            const copy = { ...prev };
            if (full[field]) copy[field] = full[field];
            else delete copy[field];
            return copy;
        });
    }
    function openModal() {
        setForm({ name: "", amount: "", currency: "USD" });
        setErrors({});
        setTouched({});
        setOpen(true);
    }

    const loadBudgets = useCallback(async () => {
        try{
            setLoadError("");
            setLoading(true);
            const {items: list} = await budgetApi.list();
            setItems(list);
        }
        catch(err){
            setLoadError(mapServerErrors(err)._common || "Failed to load budgets");
        }
        finally {
            setLoading(false);
        }
    },[])

    useEffect(() => {
        loadBudgets();
    }, [loadBudgets]);

    async function onSubmit(e){
        e.preventDefault();
        setTouched({ name: true, amount: true, currency: true });
        const eMap = validate(form);
        setErrors(eMap);
        if(Object.keys(eMap).length) return;
       try {
           setSaving(true);
           const {budget} = await budgetApi.create({
               name: form.name.trim(),
               amount: Number(form.amount),
               currency: form.currency
           });
           await loadBudgets();
           setOpen(false);
           addBtnRef?.focus?.();
       } catch(err){
           setErrors(mapServerErrors(err))
       }finally {
           setSaving(false);
       }

    }
    return (
        <div className="space-y-6">
            {loadError && <div className="rounded-lg bg-red-50 text-red-700 px-3 py-2 text-sm">{loadError}</div>}
            <div className="rounded-2xl border border-emerald-200 bg-white px-4 py-3">
                <h1 className="text-xl font-semibold text-slate-700">Budget</h1>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(i => (
                    <div key={i.id} className="h-[120px]">
                        <BudgetCard name={i.name} amount={i.amount} currency={i.currency} className="h-full" />
                    </div>
                ))}

                {items.length < maxItems && (
                    <button
                        type="button"
                        ref={setAddBtnRef}
                        onClick={openModal}
                        className="h-[120px] w-full rounded-2xl border border-emerald-300 border-dashed bg-white p-4
                 text-slate-500 hover:border-emerald-400 hover:text-emerald-700"
                    >
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-300">
                            <span className="text-2xl">＋</span>
                        </div>
                        <p className="mt-2 text-sm font-medium text-center">Add</p>
                    </button>
                )}
            </div>


            <div className="rounded-2xl border border-emerald-200 bg-white p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-slate-600">
                    <span className="mr-2 font-semibold text-slate-700">Total:</span>
                    {total.toLocaleString()}
                </div>
                <div className="text-slate-600">
                    <span className="mr-2 font-semibold text-slate-700">Maximum:</span>
                    {maxItems} elements
                </div>
            </div>

          <ModalBudget
          open={open}
          onClose={()=>{
              setOpen(false);
              addBtnRef?.focus?.();
          }}
          title="Add the budget">
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Budget's name
                    </label>
                    <input
                        type="text"
                        required
                        minLength={1}
                        maxLength={64}
                        value={form.name}
                        onChange={(e) => {
                            setForm(f => ({ ...f, name: e.target.value }));
                            setTouched(t => ({ ...t, name: true }));
                            validateField("name", { ...form, name: e.target.value });
                        }}
                        onBlur={() => {
                            if(touched.name) validateField("name");
                        }}
                        className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2
                ${errors.name ? "border-red-300 focus:ring-red-200"
                            : "border-emerald-200 focus:ring-emerald-200"}`}
                        placeholder="Example: House, Travells…"
                        autoFocus
                    />
                    {errors.name && (
                        <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                    )}
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_140px]">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Amount
                        </label>
                        <input
                        inputMode="decimal"
                        type="number"
                        required
                        step="0.01"
                        min="0"
                        value={form.amount}
                        onBlur={() => {
                            setTouched((t) => ({ ...t, amount: true }));
                            validateField("amount");
                        }}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, amount: e.target.value }))
                        }
                        className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2
                  ${errors.amount ? "border-red-300 focus:ring-red-200"
                            : "border-emerald-200 focus:ring-emerald-200"}`}
                        placeholder="0.00"
                        />
                        {errors.amount && (
                            <p className="mt-1 text-xs text-red-600">{errors.amount}</p>
                        )}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Currency
                        </label>
                        <select
                            value={form.currency}
                            onBlur={() => {
                                setTouched((t) => ({ ...t, currency: true }));
                                validateField("currency");
                            }}
                            onChange={(e) =>
                        setForm((f) => ({...f,currency: e.target.value}))
                        }
                            className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2
                  ${errors.currency ? "border-red-300 focus:ring-red-200"
                                : "border-emerald-200 focus:ring-emerald-200"}`}
                        >
                            {CURRENCIES.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        {errors.currency && (
                            <p className="mt-1 text-xs text-red-600">{errors.currency}</p>
                        )}
                    </div>
                </div>

                <div className="mt-2 flex items-center gap-3">
                    <button type="button"
                    onClick={() =>{
                        setOpen(false);
                        addBtnRef?.focus?.();
                    }}
                            className="rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100"
                    >Cancel</button>
                    <button
                        type="submit"
                        className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white justify-end hover:bg-emerald-700"
                    >
                      Add
                    </button>
                </div>
            </form>

          </ModalBudget>
        </div>
    )
}