import BaseCard from "@/components/BaseCard";
import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage = () => {
    return (
        <BaseCard
            title="Registrujte se"
            description="Pokud již máte účet, "
            link="/login"
            linkText="přihlašte se"
        >
            <RegisterForm />
        </BaseCard>
    );
};

export default RegisterPage;
