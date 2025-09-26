import {useAuth} from "../../../features/auth/AuthContext.jsx";
import {useEffect, useState} from "react";
import {summaryApi} from "../../../lib/summaryApi.js";
import Spinner from "../../../components/ui/Spinner.jsx";


export default function TotalsWidget(){
    const {user} =useAuth();
    const [data,setData] = useState(null);
    const [err,setErr] = useState("");
    useEffect(() => {
        (async () => {
            try {
                setErr("");
                const res = await summaryApi.get(user?.currency);
                setData(res);
            } catch (e) {
                setErr(e?.message || "Failed to load totals");
            }
        })();
    }, [user?.currency])

    if(err) return <div className="text-red-600">{err}</div>;
    if(!data) return <div><Spinner/></div>

    const target = data?.currency ?? "USD";
    const budgetsTarget = data?.total ?? 0;
    const fmt = (n) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);
    return (
                    <>
                        {fmt(budgetsTarget)} {target}
                    </>
    )
}