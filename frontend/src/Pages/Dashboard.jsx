import { auth } from "../lib/api";
import { useAuth } from "../features/auth/AuthContext";
import Header from "../components/layout/Header/Header.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Item from "../components/ui/Item.jsx";

export default function Dashboard(){
    const {user,setUser} = useAuth();
    const nav = useNavigate();
    useEffect(()=> {
        if(!user) nav("/login",{replace:true});
    },[user,nav]);

    return (
        <>
        <Header/>
        <div className="grid grid-cols-1 gap-1 md:grid-cols-[240px_1fr]">

        </div>
        </> 
    );
}