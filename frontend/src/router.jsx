import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./features/auth/AuthContext.jsx";
import RequireAuth from "./routes/RequireAuth.jsx";
import PublicOnly from "./routes/PublicOnly.jsx";
import Home from "./Pages/Home/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import ProfileLayout from "./Pages/Profile/ProfileLayout.jsx"
import ProfilePassword from "./Pages/Profile/Password.jsx";
import ProfileSettings from "./Pages/Profile/Settings.jsx";
import ProfileOverview from "./Pages/Profile/Overview.jsx";
import Budget from "./Pages/Dashboard/Budget.jsx";
import BudgetTransactions from "./Pages/Dashboard/BudgetTransactions.jsx";
function Router (){
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<PublicOnly><Home /></PublicOnly>} />
                <Route path="/register" element={<PublicOnly><Register /></PublicOnly>} />
                <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />

                <Route path="/profile" element={<RequireAuth><ProfileLayout /></RequireAuth>}>
                    <Route index element={<ProfileOverview />} />
                    <Route path="settings" element={<ProfileSettings />} />
                    <Route path="password" element={<ProfilePassword />} />
                </Route>
                <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>}>
                    <Route index element={<Budget />} />
                    <Route path="/dashboard/:id" element={<BudgetTransactions/>}/>
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AuthProvider>
    )
}

export default Router;
