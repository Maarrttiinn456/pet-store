import { useMemo } from "react";
import { FindPetsByStatusStatusItem } from "@/api/petstore";
import { useSearchParams } from "react-router";

export function usePetStatusesFromUrl() {
    const [params] = useSearchParams();

    return useMemo(() => {
        const allowed = Object.values(FindPetsByStatusStatusItem);

        const statuses = params
            .getAll("status")
            .filter((s): s is FindPetsByStatusStatusItem =>
                allowed.includes(s as FindPetsByStatusStatusItem)
            );

        const effective = statuses.length > 0 ? statuses : [FindPetsByStatusStatusItem.available];

        return { statuses, effectiveStatuses: effective };
    }, [params]);
}
