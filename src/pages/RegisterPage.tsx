import AuthCard from "@/components/auth/AuthCard";
import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage = () => {
    return (
        <AuthCard
            title="Registrujte se"
            description="Pokud již máte účet, "
            link="/login"
            linkText="přihlašte se"
        >
            <RegisterForm />
        </AuthCard>
    );
};

export default RegisterPage;
