const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
function getCookie(name) {
    const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return m ? decodeURIComponent(m[2]) : null;
}
export async function csrf() {
    const root = BASE_URL.replace(/\/api\/?$/, "");
    await fetch(root + "/sanctum/csrf-cookie", { credentials: "include" });
}

async function request(path, {method = "GET",body,headers={},signal} ={}){
  const res = await fetch(BASE_URL + path,{
      method,
      credentials: 'include',
      headers: {
          Accept: "application/json",
          ...(body ? { "Content-Type": "application/json" } : {}),
          ...(getCookie("XSRF-TOKEN") ? { "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") } : {}),
          ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal,
  });
  let data =null;
  try { data = await res.json(); } catch{}
   if (!res.ok){
       const err = new Error(data?.message ||`HTTP ${res.status}` )
       err.status = res.status;
       err.data = data;
       throw err;
   }
   return data;
}


export const api = {
    get: (p, opts) => request(p, { ...opts, method: "GET" }),
    post: (p, body, opts) => request(p, { ...opts, method: "POST", body }),
    patch: (p, body, opts) => request(p, { ...opts, method: "PATCH", body }),
    del: (p, opts) => request(p, { ...opts, method: "DELETE" }),
}

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