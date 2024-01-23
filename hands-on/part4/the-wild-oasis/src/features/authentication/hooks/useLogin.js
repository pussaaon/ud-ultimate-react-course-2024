import { login as loginAPI } from "../../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: login, isLoading: isLoggingIn } = useMutation({
        mutationFn: ({ email, password }) => loginAPI({ email, password }),
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user.user);
            navigate("/dashboard");
        },
        onError: (err) => {
            console.log(err);
            toast.error("Provided login or password is incorrect.");
        },
    });

    return { login, isLoggingIn };
}

export default useLogin;
