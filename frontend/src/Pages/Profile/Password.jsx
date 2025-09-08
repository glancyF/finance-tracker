import {useState} from "react";

export default function ProfilePassword(){
    const [values,setValues] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
    });
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState("");
    function onChange(e) {
        const { name, value } = e.target;
        setValues((v) => ({ ...v, [name]: value }));
    }
    async function onSubmit(e) {
        e.preventDefault();
        setMsg("");
        try{
            setSaving(true);
            // await userApi.updatePassword(values);
            setMsg("Password updated (mock).");
            setValues({ current_password: "", password: "", password_confirmation: "" });
        } finally {
            setSaving(false);
        }
    }
    return (
        <form onSubmit={onSubmit} className="space-y-4 max-w-lg">
            <h2 className="text-xl font-bold">Change password</h2>

            <div>
                <label className="mb-1 block text-sm font-medium">Current password</label>
                <input
                    type="password"
                    name="current_password"
                    value={values.current_password}
                    onChange={onChange}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">New password</label>
                <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Confirm</label>
                <input
                    type="password"
                    name="password_confirmation"
                    value={values.password_confirmation}
                    onChange={onChange}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
            </div>

            <button
                className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                disabled={saving}
            >
                {saving ? "Updating..." : "Update"}
            </button>
            {msg && <p className="text-emerald-700">{msg}</p>}
        </form>
    );
}