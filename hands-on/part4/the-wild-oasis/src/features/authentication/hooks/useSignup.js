import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signup as signupAPI } from "../../../services/apiAuth";

function useSignup() {
    const { mutate: signup, isLoading: isSigningup } = useMutation({
        mutationFn: signupAPI,
        onSuccess: () => {
            toast.success(
                "Created your account successfully. Please vefiry email to confirm your account."
            );
        },
        onError: (error) => {
            toast.error("Can't create your account at the moment.");
            console.log(error.message);
        },
    });

    return { signup, isSigningup };
}

export default useSignup;
