import { Routes, Route } from "react-router";
import HomePage from "@/pages/HomePage";
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import AuthGuard from "./guards/AuthGuard";
import RootLayout from "./layouts/RootLayout";

const App = () => {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route element={<AppLayout />}>
                    <Route element={<AuthGuard />}>
                        <Route path="/" element={<HomePage />} />
                    </Route>
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
