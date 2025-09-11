import {api, csrf} from "./api.js";

export const userApi = {
    async updateProfile({ name, email }) {
        await csrf();
        return api.patch("/profile", { name, email });
    },
    async updatePassword({ current_password, password, password_confirmation }) {
        await csrf();
        return api.patch("/password", { current_password, password, password_confirmation });
    },
}