import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import PetsFilters from "@/components/pets/PetsFilters";
import PetsList from "@/components/pets/PetsList";
import { type PetStatus, useFindPetsByStatus } from "@/api/petstore";

const HomePage = () => {
    const [status, setStatus] = useState<PetStatus[]>(["available"]);
    const [query, setQuery] = useState("");

    const { data, isLoading, isFetching, isError, error } = useFindPetsByStatus({
        status: status,
    });

    const filteredData = data?.filter((pet) =>
        pet?.name?.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <ErrorBoundary fallback={<div>Něco se pokazilo.</div>}>
                <PetsFilters
                    status={status}
                    onChangeCheckbox={setStatus}
                    onChangeQuery={setQuery}
                />
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
