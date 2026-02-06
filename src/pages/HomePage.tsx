import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import PetsFilters from "@/components/pets/PetsFilters";
import PetsList from "@/components/pets/PetsList";
import { FindPetsByStatusStatusItem, useFindPetsByStatus } from "@/api/petstore";
import usePetStatuses from "@/hooks/pets/usePetStatuses";

const HomePage = () => {
    const [query, setQuery] = useState("");

    const { searchParams } = usePetStatuses();

    const allowStatuses = Object.values(FindPetsByStatusStatusItem);
    const ststusesToFetch = allowStatuses.filter((s) => searchParams.getAll("status").includes(s));

    const { data, isLoading, isFetching, isError, error } = useFindPetsByStatus({
        status: ststusesToFetch,
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
