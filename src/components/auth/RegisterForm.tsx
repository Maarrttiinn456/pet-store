import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateUser } from "@/api/petstore";
import { toast } from "sonner";

const registerSchema = z.object({
    firstname: z.string().min(2, { message: "Jméno musí mít alespoň 2 znaky" }),
    surname: z.string().min(2, { message: "Příjmení musí mít alespoň 2 znaky" }),
    username: z.string().min(2, { message: "Uživatelské jméno musí mít alespoň 2 znaky" }),
    password: z
        .string()
        .min(5, { message: "Heslo musí mít alespoň 5 znaků" })
        .regex(/\d/, { message: "Heslo musí obsahovat alespoň jednu číslici" }),
});

type RegisterSchema = z.infer<typeof registerSchema>;

const RegisterForm = () => {
    const createUserMutation = useCreateUser();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit: SubmitHandler<RegisterSchema> = async (formData: RegisterSchema) => {
        try {
            createUserMutation.mutate({
                data: {
                    firstName: formData.firstname,
                    lastName: formData.surname,
                    username: formData.username,
                    password: formData.password,
                },
            });
            toast.success("Registrace proběhla úspěšně", { position: "top-center" });
            navigate("/login");
        } catch (error) {
            toast.error("Nastala chyba při registraci", { position: "top-center" });
            console.log(error);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-4 w-full">
                <div className="w-full">
                    <label className="mb-2 block">Jméno</label>
                    <Input type="text" {...register("firstname")} />
                    {errors.firstname && (
                        <p className="text-destructive text-sm">{errors.firstname.message}</p>
                    )}
                </div>
                <div className="w-full">
                    <label className="mb-2 block">Příjmení</label>
                    <Input type="text" {...register("surname")} />
                    {errors.surname && (
                        <p className="text-destructive text-sm">{errors.surname.message}</p>
                    )}
                </div>
            </div>
            <div>
                <label className="mb-2 block">Username</label>
                <Input type="text" {...register("username")} />
                {errors.username && (
                    <p className="text-destructive text-sm">{errors.username.message}</p>
                )}
            </div>
            <div>
                <label className="mb-2 block">Heslo</label>
                <Input type="password" autoComplete="false" {...register("password")} />
                {errors.password && (
                    <p className="text-destructive text-sm">{errors.password.message}</p>
                )}
            </div>
            <Button className="mt-4 w-full cursor-pointer" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Registruji..." : "Registrujte se"}
            </Button>
        </form>
    );
};

export default RegisterForm;
