import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useLogin from "@/hooks/auth/useLogin";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthProvider ";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

const loginSchema = z.object({
    username: z.string().min(2, { message: "Uživatelské jméno musí mít alespoň 2 znaky" }),
    password: z
        .string()
        .min(5, { message: "Heslo musí mít alespoň 5 znaků" })
        .regex(/\d/, { message: "Heslo musí obsahovat alespoň jednu číslici" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const { mutateAsync: loginUser } = useLogin();
    const { logIn } = useAuth();

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<LoginSchema> = async (formData) => {
        try {
            await loginUser(formData);

            //Normálně bych dostal z loginUser, pokud by proběhlo úspěšně
            const accessTokenFromServer = formData.username + new Date().toISOString();

            logIn(accessTokenFromServer, {
                username: formData.username,
            });

            toast.success("Přihlášení proběhlo úspěšně", { position: "top-center" });

            navigate("/");
        } catch (error) {
            toast.error("Špatné jméno nebo heslo", { position: "top-center" });
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="login-username">Username</FieldLabel>
                    <Input
                        id="login-username"
                        type="text"
                        data-testid="login-username"
                        {...register("username")}
                    />
                    <FieldError data-testid="error-username" errors={[errors.username]} />
                </Field>
                <Field>
                    <FieldLabel htmlFor="login-password">Password</FieldLabel>
                    <Input
                        id="login-password"
                        type="password"
                        autoComplete="false"
                        data-testid="login-password"
                        {...register("password")}
                    />
                    <FieldError data-testid="error-password" errors={[errors.password]} />
                </Field>
                <Button
                    className="mt-4 w-full cursor-pointer"
                    type="submit"
                    disabled={isSubmitting}
                    data-testid="login-submit"
                >
                    {isSubmitting ? "Přihlašuji se..." : "Přihlásit se"}
                </Button>
            </FieldGroup>
        </form>
    );
};

export default LoginForm;
