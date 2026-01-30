import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useLogin from "@/hooks/auth/useLogin";
import { useNavigate } from "react-router";
import { toast } from "sonner";

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
            toast.success("Přihlášení proběhlo úspěšně", { position: "top-center" });
            navigate("/");
        } catch (error) {
            toast.error("Špatné jméno nebo heslo", { position: "top-center" });
            console.log(error);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label className="mb-2 block">Username</label>
                <Input type="text" {...register("username")} />
                {errors.username && (
                    <p className="text-destructive text-sm">{errors.username.message}</p>
                )}
            </div>
            <div>
                <label className="mb-2 block">Password</label>
                <Input type="password" {...register("password")} />
                {errors.password && (
                    <p className="text-destructive text-sm">{errors.password.message}</p>
                )}
            </div>
            <Button className="mt-4 w-full cursor-pointer" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Přihlašuji se..." : "Přihlásit se"}
            </Button>
        </form>
    );
};

export default LoginForm;
