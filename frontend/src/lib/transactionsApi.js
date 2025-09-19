import {api, csrf} from "./api.js";

export const transactionsApi = {
    async list(budgetId, {page=1, per_page=20, sort="-date"} = {}){
        await csrf();
        const res = await api.get(`/budgets/${budgetId}/transactions?page=${page}&per_page=${per_page}&sort=${encodeURIComponent(sort)}`);
        return {
            items: res?.items ?? [],
            meta: res?.meta ?? {total:0, per_page, current_page: page},
        };
    },
    async create(budgetId, { type, amount, date, category_id, category_name, comment }) {
        await csrf();
        return api.post(`/budgets/${budgetId}/transactions`, { type, amount, date, category_id, category_name, comment });
    },
    async update(id,patch) {
        await csrf();
        return api.patch(`/transactions/${id}`,patch);
    },
    async remove(id){
        await csrf();
        return api.del(`/transactions/${id}`);
    }
}