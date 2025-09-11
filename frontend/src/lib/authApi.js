import {api, csrf} from "./api.js";

export const auth = {
    async register({ name, email, password, password_confirmation }) {
        await csrf();
        return api.post("/register", { name, email, password, password_confirmation });
    },
    async login({ email, password }) {
        await csrf();
        return api.post("/login", { email, password });
    },
    async logout() {
        await csrf();
        return api.post("/logout");
    },
    async me() {
        return api.get("/me");
    },
};