import { Outlet } from "react-router";
import Header from "@/components/Header";

const RootLayout = () => {
    return (
        <div className="bg-background min-h-screen text-foreground">
            <div className="container">
                <Header />
                <Outlet />
            </div>
        </div>
    );
};

export default RootLayout;
