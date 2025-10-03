import {useEffect, useMemo, useState} from "react";
import {categoriesApi} from "../../../lib/categoriesApi.js";
import {Validation} from "../../../utils/transactionValidation.js";
import Field from "../../../components/ui/Field.jsx";
import Button from "../../../components/ui/Button.jsx";

const DEFAULTS = {
    type: "expense",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    category_id: null,
    category_name: "",
    comment: "",
};
export default function TransactionForm({ budgetId, currency="USD", initialValues, onSubmit, onCancel }){
    const [v, setV] = useState(() => ({ ...DEFAULTS, ...(initialValues || {}) }));
    const [errors,setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [categories, setCategories] = useState([]);
    const [q, setQ] = useState("");
    useEffect(() => {
        setV({ ...DEFAULTS, ...(initialValues || {}) });
        setErrors({});
        setTouched({});
    }, [initialValues]);
    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const items = await categoriesApi.list(budgetId, q);
                if (active) setCategories(items);
            } catch {}
        })();
        return () => { active = false };
    }, [budgetId, q]);
    const setField = (name,value) => {
        setV(prev => ({...prev,[name]: value}));
        setTouched(t=> ({...t,[name]: true}));
    };
    const validateField = (field, next) => {
        const full = Validation(next ?? v);
        setErrors((prev) => {
            const copy = { ...prev };
            if (full[field]) copy[field] = full[field];
            else delete copy[field];
            return copy;
        });
    };

    const submit = async(e) => {
        e.preventDefault();
        const allTouched = {
            type: true,
            amount: true,
            date: true,
            category: true,
            comment: touched.comment,
        };
        setTouched((t) => ({ ...allTouched, ...t }));
        const eMap = Validation(v);
        setErrors(eMap);
        if(Object.keys(eMap).length) return;
        try{
            setSubmitting(true);
            await onSubmit({
                type: v.type,
                amount: Number(v.amount),
                date: v.date,
                category_id: v.category_id || null,
                category_name: v.category_id ? "" : (v.category_name || "").trim(),
                comment: v.comment || "",
            });
        }finally {
            setSubmitting(false);
        }
    }
    const categoryHint = useMemo(() => {
        const name = (v.category_name || "").trim();
        if (!v.category_id && name && !categories.some(c => c.name.toLowerCase() === name.toLowerCase())) {
            return `Create new category “${name}”`;
        }
        return "";
    }, [v.category_id, v.category_name, categories]);


    return (
        <form data-trx-form onSubmit={submit} noValidate className="space-y-4">
            <div className="flex gap-3">
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="type"
                        checked={v.type === "expense"}
                        onChange={() => {
                            setField("type", "expense");
                            validateField("type", { ...v, type: "expense" });
                        }}
                    />
                    <span>Expense</span>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="type"
                        checked={v.type === "income"}
                        onChange={() => {
                            setField("type", "income");
                            validateField("type", { ...v, type: "income" });
                        }}
                    />
                    <span>Income</span>
                </label>
            </div>
            {touched.type && errors.type && (
                <p className="text-sm text-red-600">{errors.type}</p>
            )}

            <Field
                label={`Amount (${currency})`}
                required
                error={touched.amount && errors.amount}
            >
                <input
                    inputMode="decimal"
                    type="number"
                    step="0.01"
                    min="0.01"
                    className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${
                        errors.amount
                            ? "border-red-300 focus:ring-red-200"
                            : "border-emerald-200 focus:ring-emerald-200"
                    }`}
                    value={v.amount}
                    onChange={(e) => {
                        const next = { ...v, amount: e.target.value };
                        setField("amount", e.target.value);
                        validateField("amount", next);
                    }}
                    onBlur={() => validateField("amount")}
                />
            </Field>

            <Field label="Date" required error={touched.date && errors.date}>
                <input
                    type="date"
                    className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${
                        errors.date
                            ? "border-red-300 focus:ring-red-200"
                            : "border-emerald-200 focus:ring-emerald-200"
                    }`}
                    value={v.date}
                    onChange={(e) => {
                        const next = { ...v, date: e.target.value };
                        setField("date", e.target.value);
                        validateField("date", next);
                    }}
                    onBlur={() => validateField("date")}
                />
            </Field>

            <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Category (select existing)">
                    <select
                        className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 border-emerald-200 focus:ring-emerald-200"
                        value={v.category_id || ""}
                        onChange={(e) => {
                            const id = e.target.value ? Number(e.target.value) : null;
                            const next = {
                                ...v,
                                category_id: id,
                                category_name: id ? "" : v.category_name,
                            };
                            setV(next);
                            setTouched((t) => ({ ...t, category: true }));
                            validateField("category", next);
                        }}
                        onBlur={() => validateField("category")}
                    >
                        <option value="">—</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </Field>

                <Field
                    label="Or new category"
                    error={touched.category && errors.category}
                    hint={categoryHint}
                >
                    <input
                        type="text"
                        className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${
                            errors.category
                                ? "border-red-300 focus:ring-red-200"
                                : "border-emerald-200 focus:ring-emerald-200"
                        }`}
                        value={v.category_name || ""}
                        onChange={(e) => {
                            const next = { ...v, category_name: e.target.value, category_id: null };
                            setV(next);
                            setTouched((t) => ({ ...t, category: true }));
                            validateField("category", next);
                        }}
                        onBlur={() => validateField("category")}
                        placeholder="e.g. Food"
                    />
                </Field>
            </div>

            <Field label="Comment (optional)" error={touched.comment && errors.comment}>
                <input
                    type="text"
                    maxLength={255}
                    className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${
                        errors.comment
                            ? "border-red-300 focus:ring-red-200"
                            : "border-emerald-200 focus:ring-emerald-200"
                    }`}
                    value={v.comment}
                    onChange={(e) => setField("comment", e.target.value)}
                    onBlur={() => validateField("comment")}
                />
            </Field>

            <div  data-trx-actions className="mt-2 flex items-center gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100"
                >
                    Cancel
                </button>
                <Button type="submit" disabled={submitting}>
                    {submitting ? "Saving..." : "Save"}
                </Button>
            </div>
        </form>
    );
}