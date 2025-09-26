import { api, csrf } from "./api.js";

export const userApi = {
    updateProfile: async ({ name, email }) => {
        await csrf();
        const { data } = await api.patch("/profile", { name, email });
        return data;
    },

    updatePassword: async ({ current_password, password, password_confirmation }) => {
        await csrf();
        const { data } = await api.patch("/password", {
            current_password,
            password,
            password_confirmation,
        });
        return data;
    },


        async updateCurrency(currency) {
            await csrf();
            const data = await api.patch("/profile/currency", { currency });
            const user = data?.user ?? data;
            if (!user || !user.id) {
                console.error("updateCurrency: unexpected response", data);
                throw new Error("Unexpected server response");
            }
            return user;
        },

};