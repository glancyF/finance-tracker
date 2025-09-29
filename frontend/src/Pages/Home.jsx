import Header from "../components/layout/Header/Header.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext.jsx";
import Footer from "../components/layout/Footer/Footer.jsx";
export default function Home(){
    const {user,loading} = useAuth();
    const nav = useNavigate();
    useEffect(() => {
        if (!loading && user) nav("/dashboard", { replace: true });
    }, [user, loading, nav])

    return (
        <>
            <Header title="Home" />
            <main className="pt-8">
                <h1>Landing page</h1>
            </main>

            <Footer/>
        </>
    );
}