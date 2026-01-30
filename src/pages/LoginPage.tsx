import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
    return (
        <AuthCard
            title="Přihlásit se"
            description="Pokud nemáte účet, "
            link="/register"
            linkText="zaregistrujte se"
        >
            <LoginForm />
        </AuthCard>
    );
};

export default LoginPage;
