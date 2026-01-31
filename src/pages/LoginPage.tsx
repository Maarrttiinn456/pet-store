import BaseCard from "@/components/BaseCard";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
    return (
        <BaseCard
            title="Přihlásit se"
            description="Pokud nemáte účet, "
            link="/register"
            linkText="zaregistrujte se"
        >
            <LoginForm />
        </BaseCard>
    );
};

export default LoginPage;
