import { useState } from "react";
import { useAuth } from "../../features/auth/AuthContext.jsx";

export default function ProfileSettings(){
    const {user,setUser} = useAuth();
    const [values,setValues] = useState({
       name: user?.name || "",
       email: user?.email || "",
    });
    const [saving,setSaving] = useState(false);
     const [msg,setMsg] = useState("");

     function onChange(e) {
         const {name, value} = e.target;
         setValues((v) => ({...v,[name]: value}))
     }

     async function onSubmit (e) {
         e.preventDefault();
         setMsg("");
         try{
             setSaving(true);
             // const { user: updated } = await userApi.updateProfile(values);
             // setUser(updated);
             setMsg("Saved (mock)")
         } finally {
             setSaving(false);
         }
     }

     return (
         <form onSubmit={onSubmit} className="space-y-4 max-w-lg">
             <h2 className="text-xl font-bold">Settings</h2>
             <div>
                 <label className="mb-1 block text-sm font-medium">Name</label>
                 <input
                     className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                     name="name"
                     value={values.name}
                     onChange={onChange}
                 />
             </div>
             <div>
                 <label className="mb-1 block text-sm font-medium">Email</label>
                 <input
                     className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                     name="email"
                     type="email"
                     value={values.email}
                     onChange={onChange} />
             </div>
             <button
                 className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                 disabled={saving}
             >
                 {saving ? "Saving..." : "Save"}
             </button>
             {msg && <p className="text-emerald-700">{msg}</p> }
         </form>
     );
}