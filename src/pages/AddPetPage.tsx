import BaseCard from "@/components/BaseCard";
import AddPetForm from "@/components/pets/AddPetForm";

function AddPetPage() {
    return (
        <div className="flex justify-center ">
            <BaseCard
                title="Přidat zvíře"
                description="Zvíře se do výpisu skutečně nepřidá. Petstore API neumožňuje skutečné přidávání zvířat."
            >
                <AddPetForm />
            </BaseCard>
        </div>
    );
}

export default AddPetPage;
