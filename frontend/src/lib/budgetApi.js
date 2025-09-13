import {api, csrf} from "./api.js";

export const budgetApi = {
    async create({ name, amount,currency }) {
        await csrf();
        return api.post("/budgets", { name, amount,currency });
    },
    async list() {
        await csrf();
        return api.get("/budgets");
    },
    async remove(id) {
        await csrf();
        return api.del(`/budgets/${id}`);
    },
}