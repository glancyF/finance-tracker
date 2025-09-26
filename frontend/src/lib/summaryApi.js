import {api} from "./api.js";


export const summaryApi = {
    async get(to){
        const q = to ? `?to=${encodeURIComponent(to)}` : "";
        const json = await api.get(`/summary${q}`);
        return json;
    }
}