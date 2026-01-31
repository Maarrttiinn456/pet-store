import { Spinner } from "./ui/spinner";

const CustomSpinner = () => {
    return (
        <div className="flex items-center justify-center w-full py-8">
            <Spinner className="size-8 text-primary" />
        </div>
    );
};

export default CustomSpinner;
