import type { PetStatus } from "@/api/petstore";

export const formatPetStatus = (status: PetStatus | undefined) => {
    if (status === "pending") {
        return "Čekající";
    }
    if (status === "sold") {
        return "Prodán";
    }

    return "Dostupný";
};
