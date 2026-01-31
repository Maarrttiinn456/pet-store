import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import PetsFilters from "@/components/pets/PetsFilters";
import PetsList from "@/components/pets/PetsList";
import { useFindPetsByStatus } from "@/api/petstore";
import { usePetStatusesFromUrl } from "@/hooks/pets/usePetStatusesFromUrl";

const HomePage = () => {
    const [query, setQuery] = useState("");

    const { effectiveStatuses } = usePetStatusesFromUrl();

    const { data, isLoading, isFetching, isError, error } = useFindPetsByStatus({
        status: effectiveStatuses,
    });

    const filteredData = data?.filter((pet) =>
        pet?.name?.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <ErrorBoundary fallback={<div>Něco se pokazilo.</div>}>
                <PetsFilters onChangeQuery={setQuery} />
                <PetsList
                    data={filteredData ?? []}
                    isLoading={isLoading}
                    error={error}
                    isFetching={isFetching}
                    isError={isError}
                />
            </ErrorBoundary>
        </div>
    );
};

export default HomePage;
