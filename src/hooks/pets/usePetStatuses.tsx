import type { PetStatus } from "@/api/petstore";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

type PetStatusType = PetStatus;

const usePetStatuses = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleChekbox = (status: PetStatusType, checked: boolean) => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);

            let statuses = params.getAll("status");

            if (checked) {
                if (!statuses.includes(status)) {
                    statuses.push(status);
                }
            } else {
                statuses = statuses.filter((s) => s !== status);
            }

            if (statuses.length === 0) {
                statuses = ["available"];
            }

            params.delete("status");
            statuses.forEach((s) => params.append("status", s));

            return params;
        });
    };

    useEffect(() => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);

            if (params.getAll("status").length > 0) return params;

            params.set("status", "available");
            return params;
        });
    }, [setSearchParams]);

    return {
        searchParams,
        handleChekbox,
    };
};

export default usePetStatuses;
