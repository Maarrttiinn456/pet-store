import { createContext, useContext, useState, type ReactNode } from "react";

type AuthUser = {
    username: string;
};

type AuthContextType = {
    user: AuthUser | null;
    isAuth: boolean;
    logIn: (token: string, user: AuthUser) => void;
    logOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(() => {
        if (typeof window === "undefined") return null;
        const username = localStorage.getItem("username");
        return username ? { username } : null;
    });
    const [accessToken, setAccessToken] = useState<string | null>(() => {
        if (typeof window === "undefined") return null;
        return localStorage.getItem("accessToken");
    });

    const logIn = (token: string, user: AuthUser) => {
        if (!token || !user) {
            return;
        }

        localStorage.setItem("username", user.username);
        localStorage.setItem("accessToken", token);
        setAccessToken(token);
        setUser(user);
    };

    const logOut = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");

        setAccessToken(null);
        setUser(null);
    };

    const isAuth = !!accessToken && !!user;

    const value = { user, logIn, isAuth, logOut };

    return <AuthContext value={value}>{children}</AuthContext>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};

export default AuthProvider;
