import { LogOut } from "lucide-react";

import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthProvider ";

const Header = () => {
    const { user, logOut, isAuth } = useAuth();

    return (
        <div className="flex justify-between py-4 border-b border-border">
            <div className="text-4xl font-bold text-card-foreground">Pet Store</div>
            <div className="flex items-end gap-4">
                {isAuth && (
                    <div className="text-lg">
                        Vítej,{" "}
                        <span className="text-card-foreground">{user?.username || "Neznámý"}</span>
                    </div>
                )}

                <div>
                    <ModeToggle />
                </div>
                {isAuth && (
                    <Button size="icon" onClick={() => logOut()}>
                        <LogOut className="h-7" />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Header;
