import {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import { auth } from "../../lib/authApi.js";

const Ctx = createContext({ user: null, setUser: () => {}, logout: () => {} });

export function AuthProvider({children}) {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const ctrl = new AbortController();

        (async () => {
            try {
                const data = await auth.me({signal: ctrl.signal});
                const normalized = data?.user ?? data;
                setUser(normalized ?? null);
            } catch {
                 setUser(null);
            } finally {
                 setLoading(false);
            }
        })();
        return () => ctrl.abort();
    }, []);

    const logout = useCallback(async () => {
        try { await auth.logout(); } finally { setUser(null); }
    }, []);
    const value = useMemo(() => ({ user, setUser, logout, loading }), [user, logout, loading]);
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);
