import { useCallback, useEffect, useState } from "react";
import { transactionsApi } from "../lib/transactionsApi";

export default function useTransactions(budgetId) {
    const [items,setItems] = useState([]);
    const [meta, setMeta] = useState({ total: 0, per_page: 20, current_page: 1 });
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");
    const load = useCallback(async(page  =1) =>{
        try{
            setError("");
            setLoading(true);
            const res = await transactionsApi.list(budgetId,{page});
            setItems(res.items);
            setMeta(res.meta);
        }catch (e){
            setError(e?.message || "Failed to load transactions");
        }
        finally {
            setLoading(false);
        }
    },[budgetId]);
    useEffect(() => { if (budgetId) load(1); }, [budgetId, load]);
    const add = useCallback(async(payload) =>{
        const res = await transactionsApi.create(budgetId,payload);
        await load(meta.current_page);
        return res;
    },[budgetId,load,meta.current_page]);

    const update = useCallback(async(id,patch) =>{
        await transactionsApi.update(id,patch);
        await load(meta.current_page);
    },[load,meta.current_page]);
    const remove =useCallback(async(id) =>{
        await transactionsApi.remove(id);
        setItems(prev => prev.filter(i => i.id !== id));
    },[])
    return { items, meta, loading, error, load, add, update, remove };
}