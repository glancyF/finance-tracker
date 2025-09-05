import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../lib/api.js";

const Ctx = createContext({ user: null, setUser: () => {}, logout: () => {} });

export function AuthProvider({children}) {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const data = await auth.me();
                if (alive) setUser(data);
            } catch {
                if (alive) setUser(null);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, []);

    async function logout(){
        try{await auth.logout();} finally {
            setUser(null);
        }
    }
    return(
        <Ctx.Provider value={{ user, setUser, logout, loading }}>
            {children}
        </Ctx.Provider>
    );
}
export const useAuth = () => useContext(Ctx);
