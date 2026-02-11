import { LogOut } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthProvider ";
import { Link } from "react-router";

const Header = () => {
    const { user, logOut, isAuth } = useAuth();

    return (
        <div className="flex justify-between py-4 border-b border-border">
            <Button
                asChild
                variant="link"
                className="p-0 h-auto text-3xl md:text-4xl font-bold text-card-foreground hover:underline"
            >
                <Link to="/">Pet Store</Link>
            </Button>
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
