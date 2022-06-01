import Login from "../views/pages/login";
import Dashboard from "../views/pages/dashboard";
import Users from "../views/pages/users";
import { Routes, Route, Navigate } from "react-router-dom";
import RequiresAuth from "../modules/RequiresAuth";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../views/layout/layout";

export default () => {
    const {
        authState: { isLoggedIn },
        dispatchAuth
    } = useAuth();
    
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Routes>
            <Route path="/login" element={isLoggedIn ? <Navigate push to="/" /> : <Login />} />
            <Route path="/" element={<Layout />}> 
                <Route index element={<RequiresAuth><Users /></RequiresAuth>} />
                {/* <Route path="/users" element={<Users />} /> */}
            </Route>
        </Routes>
    );
};