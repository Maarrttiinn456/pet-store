import { Outlet } from "react-router";

const AppLayout = () => {
    return (
        <>
            <div className="mt-12">
                <Outlet />
            </div>
        </>
    );
};

export default AppLayout;
