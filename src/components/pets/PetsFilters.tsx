import { Checkbox } from "../ui/checkbox";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { PetStatus } from "@/api/petstore";
import usePetStatuses from "@/hooks/pets/usePetStatuses";

const PetsFilters = ({ onChangeQuery }: { onChangeQuery: (e: string) => void }) => {
    const { handleChekbox, searchParams } = usePetStatuses();

    return (
        <div className="mb-12">
            <div className="text-2xl mb-4 font-bold text-card-foreground">Filtry</div>
            <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-12">
                <div>
                    <label htmlFor="search" className="mb-1 block">
                        Název
                    </label>
                    <Input
                        type="text"
                        id="search"
                        placeholder="Hledat dle názvu..."
                        onChange={(e) => onChangeQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-4 relative">
                    {Object.values(PetStatus).map((status) => (
                        <Field key={status} orientation="horizontal">
                            <Checkbox
                                id={status}
                                name="terms-checkbox"
                                value={status}
                                checked={searchParams.getAll("status").includes(status)}
                                onCheckedChange={(checked) =>
                                    handleChekbox(status, checked === true)
                                }
                            />
                            <label htmlFor={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </label>
                        </Field>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PetsFilters;
