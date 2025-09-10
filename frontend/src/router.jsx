import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./features/auth/AuthContext.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import ProfileLayout from "./Pages/Profile/ProfileLayout.jsx"
import ProfilePassword from "./Pages/Profile/Password.jsx";
import ProfileSettings from "./Pages/Profile/Settings.jsx";
import ProfileOverview from "./Pages/Profile/Overview.jsx";
import Budget from "./Pages/Dashboard/Budget.jsx";
function Router (){
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<ProfileLayout />}>
                    <Route index element={<ProfileOverview />} />
                    <Route path="settings" element={<ProfileSettings />} />
                    <Route path="password" element={<ProfilePassword />} />
                </Route>
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route index element={<Budget />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AuthProvider>
    )
}

export default Router;
