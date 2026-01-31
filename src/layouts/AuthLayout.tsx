import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <div className="flex justify-center items-center mt-24">
            <Outlet />
        </div>
    );
};

export default AuthLayout;
