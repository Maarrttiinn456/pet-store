import { Outlet } from "react-router";
import { Navigate } from "react-router";
const AuthGuard = () => {
    const isAuthenticated = false;

    return <div>{isAuthenticated ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default AuthGuard;
