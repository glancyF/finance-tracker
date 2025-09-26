import { useEffect, useState } from "react";
import { useAuth } from "../../features/auth/AuthContext.jsx";
import { auth } from "../../lib/authApi.js";
import Spinner from "../../components/ui/Spinner.jsx";

export default function ProfileOverview() {
    const {user: ctxUser, setUser} = useAuth();
    const [user, setLocalUser] = useState(ctxUser);
    useEffect(()=>{
       auth.me().then((r)=>{
         setLocalUser(r.user);
         setUser(r.user);
       }).catch(()=>{
           setLocalUser(null);
       });
    },[setUser]);
    if(!user) return <p><Spinner/></p>

    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Overview</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <p>
                            <span className="font-semibold">Username:</span> {user.name}
                        </p>
                        <p>
                            <span className="font-semibold">Email:</span> {user.email}
                        </p>
                        <p>
                            <span className="font-semibold">Status:</span> {user.role}
                        </p>
                        <p>
                            <span className="font-semibold">Id:</span> {user.id}
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="mb-3 text-lg font-semibold">Your prefer currency</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 p-4">
                        <p className="text-sm text-slate-500"></p>

                    </div>

                </div>
            </div>
        </div>
    )
}