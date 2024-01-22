import { login as loginAPI } from "../../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
    const navigate = useNavigate();

    const { mutate: login, isLoading: isLoggingIn } = useMutation({
        mutationFn: ({ email, password }) => loginAPI({ email, password }),
        onSuccess: (user) => {
            console.log(user);
            navigate("/dashboard");
        },
        onError: () => {
            toast.error("Provided login or password is incorrect.");
        },
    });

    return { login, isLoggingIn };
}

export default useLogin;
