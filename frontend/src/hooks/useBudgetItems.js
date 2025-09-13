import {useMemo, useState, useCallback, use, useEffect} from "react";
import {MAX_BUDGET_ITEMS} from "../utils/budgetConstants.js";
import { budgetApi } from "../lib/budgetApi";
export default function useBudgetItems() {

    const [items,setItems] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const res = await budgetApi.list();
                if (active) setItems(res.data);
            } catch (err) {
                console.error("Failed to load budgets", err);
            } finally {
                if (active) setLoading(false);
            }
        })();
        return () => { active = false };
    }, []);

    const total = useMemo(() => items.reduce((s, i) => s + Number(i.amount || 0), 0), [items]);
    const maxItems = MAX_BUDGET_ITEMS;

    const addItem = useCallback(async(item) =>{
        try{
            const res = await budgetApi.create(item);
            setItems((prev) => [...prev,res.data]);
        } catch(err){
            console.error("Failed to create budget", err);
            throw err;
        }
    },[]);

    const removeItem = useCallback(async (id) => {
        try {
            await budgetApi.remove(id);
            setItems((prev) => prev.filter((i) => i.id !== id));
        } catch (err) {
            console.error("Failed to delete budget", err);
            throw err;
        }
    }, []);


    return { items, total, maxItems, addItem, removeItem, loading };
}