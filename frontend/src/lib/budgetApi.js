import {api, csrf} from "./api.js";

export const budgetApi = {
    async create({ name, amount, currency }) {
        await csrf();
        const res = await api.post("/budgets", { name, amount, currency });
        const item = res?.item ?? res?.data ?? res;
        return { data: item };
    },

    async list() {
        await csrf();
        const res = await api.get("/budgets");
        return { data: Array.isArray(res?.items) ? res.items : [] };
    },

    async remove(id) {
        await csrf();
        return await api.del(`/budgets/${id}`);
    },

    async updateName(id,name) {
        await csrf();
        return await api.patch(`/budgets/${id}`,{name});
    }
};