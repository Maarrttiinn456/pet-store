import { Checkbox } from "../ui/checkbox";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { PetStatus } from "@/api/petstore";

const PetsFilters = ({
    status,
    onChangeCheckbox,
    onChangeQuery,
}: {
    status: PetStatus[];
    onChangeCheckbox: (nextStatus: PetStatus[]) => void;
    onChangeQuery: (e: string) => void;
}) => {
    const handleStatusChange = (value: PetStatus) => {
        if (status.includes(value)) {
            onChangeCheckbox(status.filter((s) => s !== value));
        } else {
            onChangeCheckbox([...status, value]);
        }
    };

    return (
        <div className="mb-12">
            <div className="text-2xl mb-4 font-bold text-card-foreground">Filtry</div>
            <div className="flex items-end gap-12">
                <div>
                    <label htmlFor="search" className="mb-1 block">
                        Jméno
                    </label>
                    <Input
                        type="text"
                        id="search"
                        placeholder="Hledat dle názvu..."
                        onChange={(e) => onChangeQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    {Object.entries(PetStatus).map(([key, value]) => {
                        return (
                            <Field key={value} orientation="horizontal">
                                <Checkbox
                                    id={key}
                                    name="terms-checkbox"
                                    value={value}
                                    checked={status.includes(value)}
                                    onClick={() => handleStatusChange(value as PetStatus)}
                                />
                                <label htmlFor={key}>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </label>
                            </Field>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PetsFilters;
