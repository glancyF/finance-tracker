
import {Navigate} from "react-router-dom";
import {useAuth} from "../features/auth/AuthContext.jsx";

export default function PublicOnly({children}) {
    const {user, loading} = useAuth();
    if (loading) return null;
    return user ? <Navigate to="/dashboard" replace/> : children;
}