import { auth } from "../lib/api";
import { useAuth } from "../features/auth/AuthContext";
import Header from "../components/layout/Header/Header.jsx";
export default function Dashboard(){
    const {setUser} = useAuth();
    async function handleLogout() {
        try {
            await auth.logout();
            setUser(null);
        } catch (err) {
            console.error("Logout error", err);
        }
    }

    return (
        <>
        <Header/>
        <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
            Logout
        </button>
        </> 
    );
}