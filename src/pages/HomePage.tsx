import PetsFilters from "@/components/pets/PetsFilters";
import PetsList from "@/components/pets/PetsList";

const HomePage = () => {
    return (
        <div>
            <PetsFilters />
            <PetsList />
        </div>
    );
};

export default HomePage;
