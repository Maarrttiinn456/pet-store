import { PetStatus, type PetStatus as PetStatusType, useAddPet } from "@/api/petstore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useNavigate } from "react-router";

const petStatuses = Object.values(PetStatus) as [PetStatusType, ...PetStatusType[]];

const addPetSchema = z.object({
    name: z.string().min(2, { message: "Název musí mít alespoň 2 znaky" }),
    photoUrl: z.string().min(1, { message: "Fotka je povinné" }),
    status: z.enum(petStatuses, { message: "Vyberte status" }),
});

type AddPetSchema = z.infer<typeof addPetSchema>;

const AddPetForm = () => {
    const addPetMutation = useAddPet();
    const navigate = useNavigate();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AddPetSchema>({
        resolver: zodResolver(addPetSchema),
        defaultValues: {
            status: PetStatus.available,
        },
    });

    const onSubmit = async (formData: AddPetSchema) => {
        try {
            addPetMutation.mutate({
                data: {
                    name: formData.name,
                    photoUrls: [formData.photoUrl],
                    status: formData.status,
                },
            });
            toast.success("Zvíře bylo přidáno.", { position: "top-center" });
            navigate("/");
        } catch (error) {
            toast.error("Nepodařilo se přidat zvíře.", { position: "top-center" });
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-4">
                <Field>
                    <FieldLabel htmlFor="pet-name">Název</FieldLabel>
                    <Input id="pet-name" type="text" {...register("name")} />
                    <FieldError errors={[errors.name]} />
                </Field>
                <Field>
                    <FieldLabel htmlFor="pet-photo-url">Fotka</FieldLabel>
                    <Input id="pet-photo-url" type="text" {...register("photoUrl")} />
                    <FieldError errors={[errors.photoUrl]} />
                </Field>
                <Field>
                    <FieldLabel htmlFor="pet-status">Status</FieldLabel>
                    <Controller
                        control={control}
                        name="status"
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger id="pet-status" className="w-[180px]">
                                    <SelectValue placeholder="Vyber status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(PetStatus).map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {status}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    <FieldError errors={[errors.status]} />
                </Field>
                <Button
                    className="mt-4 w-full cursor-pointer"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Ukládám..." : "Přidat"}
                </Button>
            </FieldGroup>
        </form>
    );
};

export default AddPetForm;
