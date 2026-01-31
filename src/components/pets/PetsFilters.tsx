import { usePetStatusFilter } from "@/hooks/pets/usePetStatusFilter";
import { Checkbox } from "../ui/checkbox";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { PetStatus } from "@/api/petstore";
import { X } from "lucide-react";

const PetsFilters = ({ onChangeQuery }: { onChangeQuery: (e: string) => void }) => {
    const { statuses, toggleStatus, resetFilters, params } = usePetStatusFilter();

    return (
        <div className="mb-12">
            <div className="text-2xl mb-4 font-bold text-card-foreground">Filtry</div>
            <div className="flex items-end gap-12">
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
                                checked={statuses.includes(status)}
                                onCheckedChange={(checked) =>
                                    toggleStatus(status, checked === true)
                                }
                            />
                            <label htmlFor={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </label>
                        </Field>
                    ))}

                    {params.size > 0 && (
                        <button
                            type="button"
                            className="absolute -top-8 left-1/2 text-sm -translate-x-1/2 w-full text-center cursor-pointer text-destructive flex items-center justify-center gap-2 bg-transparent border-none"
                            onClick={() => resetFilters()}
                        >
                            <X className="w-4 h-4" />
                            <span>Vymazat filtry</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PetsFilters;
