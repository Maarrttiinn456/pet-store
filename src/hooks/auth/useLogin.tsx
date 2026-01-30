import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/petstore";
import type { LoginUserParams } from "@/api/petstore";

const useLogin = () => {
    return useMutation({
        mutationFn: (data: LoginUserParams) => loginUser(data),
    });
};

export default useLogin;
