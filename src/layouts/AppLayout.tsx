import { Outlet } from 'react-router';

const AppLayout = () => {
    return (
        <div className="bg-background min-h-screen text-foreground">
            <div className="container mx-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default AppLayout;
