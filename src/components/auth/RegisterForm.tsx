import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateUser } from "@/api/petstore";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
                <div className="flex gap-4 w-full">
                    <Field className="w-full">
                        <FieldLabel htmlFor="register-firstname">Jméno</FieldLabel>
                        <Input id="register-firstname" type="text" {...register("firstname")} />
                        <FieldError errors={[errors.firstname]} />
                    </Field>
                    <Field className="w-full">
                        <FieldLabel htmlFor="register-surname">Příjmení</FieldLabel>
                        <Input id="register-surname" type="text" {...register("surname")} />
                        <FieldError errors={[errors.surname]} />
                    </Field>
                </div>
                <Field>
                    <FieldLabel htmlFor="register-username">Username</FieldLabel>
                    <Input id="register-username" type="text" {...register("username")} />
                    <FieldError errors={[errors.username]} />
                </Field>
                <Field>
                    <FieldLabel htmlFor="register-password">Heslo</FieldLabel>
                    <Input
                        id="register-password"
                        type="password"
                        autoComplete="false"
                        {...register("password")}
                    />
                    <FieldError errors={[errors.password]} />
                </Field>
                <Button
                    className="mt-4 w-full cursor-pointer"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Registruji..." : "Registrujte se"}
                </Button>
            </FieldGroup>
        </form>
    );
};

export default RegisterForm;
