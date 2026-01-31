import type { Pet } from "@/api/petstore";
import CustomSpinner from "../CustomSpinner";
import { Button } from "../ui/button";
import { Link } from "react-router";

type PetListProps = {
    data?: Pet[];
    isLoading: boolean;
    isError: boolean;
    error?: unknown;
    isFetching: boolean;
};

const PetsList = ({ data = [], isLoading, isError, error, isFetching }: PetListProps) => {
    return (
        <>
            <div className="flex justify-between mb-4">
                <div className="text-2xl  font-bold text-card-foreground">Všechna zvířátka</div>
                <Button asChild variant="default" size="lg" className="cursor-pointer">
                    <Link to="/add-pets">Přidat položku</Link>
                </Button>
            </div>

            {isLoading && <CustomSpinner />}

            {isError && (
                <div className="text-destructive">
                    Nepodařilo se načíst zvířátka:{" "}
                    {error instanceof Error ? error.message : String(error)}
                </div>
            )}

            {!isLoading && !isError && isFetching && (
                <div className="text-sm opacity-60 mb-2">Aktualizuji…</div>
            )}

            {!isLoading && !isError && data.length === 0 && (
                <div className="opacity-70">Žádná zvířátka nenalezena.</div>
            )}

            {data.length > 0 && (
                <div className="columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4 [&>*]:break-inside-avoid">
                    {data.map((pet, idx) => (
                        <div
                            key={pet.id ?? `${pet.name}-${idx}`}
                            className="dark:bg-card-foreground text-card p-4 rounded-sm"
                        >
                            <div className="text-lg font-bold overflow-hidden">
                                {pet.name ?? "-"}
                            </div>
                            <div>{pet.status}</div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default PetsList;
