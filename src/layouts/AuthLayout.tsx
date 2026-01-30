import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <div className="bg-background min-h-screen flex items-center justify-center">
            <Outlet />
        </div>
    );
};

export default AuthLayout;
