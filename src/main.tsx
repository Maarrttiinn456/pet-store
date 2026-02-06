import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/queryClient.tsx";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import App from "@/App.tsx";
import "@/index.css";
import AuthProvider from "./contexts/AuthProvider ";

async function enableMocking() {
    // zapneš jen když máš VITE_USE_MSW=true
    if (!import.meta.env.DEV || import.meta.env.VITE_USE_MSW !== "true") return;

    const { worker } = await import("./mocks/browser");
    return worker.start({ onUnhandledRequest: "bypass" });
}

enableMocking().then(() => {
    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <ThemeProvider defaultTheme="light">
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <AuthProvider>
                            <App />
                            <Toaster />
                        </AuthProvider>
                    </BrowserRouter>
                </QueryClientProvider>
            </ThemeProvider>
        </StrictMode>
    );
});
