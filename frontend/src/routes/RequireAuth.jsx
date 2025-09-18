import {Navigate,useLocation} from "react-router-dom";
import {useAuth} from "../features/auth/AuthContext.jsx";

export default function RequireAuth({children}){
    const {user,loading} = useAuth();
    const location = useLocation();
    if(loading) return null;
    return user? children : <Navigate to="/login" replace state={{from: location}} />;
}