import Header from "../../components/layout/Header/Header.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext.jsx";
import Footer from "../../components/layout/Footer/Footer.jsx";
import Carousel from "./ui/Carousel.jsx";
export default function Home(){

    return (
        <>
            <Header title="Home" />
            <main className="pt-8">
                <div className="mx-auto max-w-7xl px-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <Carousel/>
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </>
    );
}