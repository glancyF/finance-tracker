import {api, csrf} from "./api.js";

export const categoriesApi = {
    async list(budgetId, q="") {
        await csrf();
        const url = `/budgets/${budgetId}/categories${q ? `?q=${encodeURIComponent(q)}` : ""}`;
        const res = await api.get(url);
        return res?.items ?? [];
    }

}