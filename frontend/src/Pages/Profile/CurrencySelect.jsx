import { useEffect, useState } from "react";
import { useAuth } from "../../features/auth/AuthContext.jsx";
import { userApi } from "../../lib/userApi.js";
import { CURRENCIES } from "../../utils/budgetConstants.js";

export default function CurrencySelect() {
    const {user, setUser} = useAuth();
    const [value, setValue] = useState(null);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if (user?.default_currency != null) {
            setValue(user.default_currency);
        } else {
            setValue(null);
        }
    }, [user]);

    async function onChange(e) {
        const prev = value;
        const next = e.target.value;

        setValue(next);
        setMsg("");
        setSaving(true);

        try {
            const updated = await userApi.updateCurrency(next);
            const u = updated?.id ? updated : updated?.user;
            if (!u?.id) throw new Error('Bad payload');

            setUser(u);
            setValue(u.default_currency ?? next);
            setMsg("Saved");
            setTimeout(() => setMsg(""), 1500);
        } catch (err) {
            console.error("updateCurrency failed:", err);
            setMsg(err?.message || "Failed to save");
            setValue(prev);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Preferred currency</label>
            <select
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 disabled:opacity-60"
                value={value ?? ""}
                onChange={onChange}
                disabled={saving || value === null}
            >
                {value === null ? (
                    <option value="">Loading…</option>
                ):(
                    CURRENCIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                )))}
            </select>
            <div className="h-5 mt-1 text-sm text-slate-500">{msg}</div>
        </div>
    );
}
