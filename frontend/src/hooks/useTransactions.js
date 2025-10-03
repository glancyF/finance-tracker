import { useEffect, useState, useCallback } from "react";
import { transactionsApi } from "../lib/transactionsApi";

export default function useTransactions(budgetId, { initialPage = 1, perPage = 20, initialSort = "-date" } = {}) {
    const [items, setItems] = useState([]);
    const [meta, setMeta]   = useState({ total: 0, per_page: perPage, current_page: initialPage, last_page: 1, from: 0, to: 0 });
    const [page, setPage]   = useState(initialPage);
    const [sort, setSort]   = useState(initialSort);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState("");

    const load = useCallback(async () => {
        if (!budgetId) return;
        setLoading(true);
        setError("");
        try {
            const res = await transactionsApi.list(budgetId, { page, per_page: meta.per_page, sort });
            setItems(res.items);
            setMeta(res.meta);
        } catch (e) {
            setError(e?.message || "Failed to load transactions");
        } finally {
            setLoading(false);
        }
    }, [budgetId, page, sort, meta.per_page]);

    useEffect(() => { load(); }, [load]);


    const add = useCallback(async (payload) => {
        await transactionsApi.create(budgetId, payload);
        load();
    }, [budgetId, load]);

    const update = useCallback(async (id, patch) => {
        await transactionsApi.update(id, patch);
        load();
    }, [load]);

    const remove = useCallback(async (id) => {
        await transactionsApi.remove(id);
        if (items.length === 1 && page > 1) setPage(page - 1);
        else load();
    }, [items.length, page, load]);

    return {
        items, meta, page, setPage, sort, setSort, loading, error,
        add, update, remove,
    };
}
