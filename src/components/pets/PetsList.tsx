import type { Pet } from "@/api/petstore";
import CustomSpinner from "../CustomSpinner";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
                        <Card key={pet.id ?? `${pet.name}-${idx}`}>
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">
                                    {pet.name
                                        ? pet.name.length > 10
                                            ? pet.name.slice(0, 10) + "..."
                                            : pet.name
                                        : "-"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>{pet.status}</CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </>
    );
};

export default PetsList;
