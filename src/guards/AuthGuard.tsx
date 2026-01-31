import { useAuth } from "@/contexts/AuthProvider ";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { Navigate } from "react-router";

const AuthGuard = () => {
    const { isAuth: isAuthenticated } = useAuth();

    useEffect(() => {
        console.log(isAuthenticated);
    }, [isAuthenticated]);

    return <div>{isAuthenticated ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default AuthGuard;
