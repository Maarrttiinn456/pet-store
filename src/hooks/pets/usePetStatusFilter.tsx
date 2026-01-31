import { useSearchParams } from "react-router";
import { PetStatus } from "@/api/petstore";

const DEFAULT = PetStatus.available;

export function usePetStatusFilter() {
    const [params, setParams] = useSearchParams();

    const statuses = params.getAll("status").length > 0 ? params.getAll("status") : [DEFAULT];

    const toggleStatus = (status: PetStatus, checked: boolean) => {
        setParams((prev) => {
            const next = new URLSearchParams(prev);
            let values = next.getAll("status");

            values = checked
                ? values.includes(status)
                    ? values
                    : [...values, status]
                : values.filter((s) => s !== status);

            next.delete("status");
            (values.length ? values : [DEFAULT]).forEach((v) => next.append("status", v));

            return next;
        });
    };

    const resetFilters = () => {
        setParams("");
    };

    return { statuses, toggleStatus, resetFilters, params };
}
