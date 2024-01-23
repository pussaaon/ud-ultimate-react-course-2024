import { updateUserPassword as updatePasswordAPI } from "../../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function useUpdatePassword() {
    const queryClient = useQueryClient();

    const { mutate: updatePassword, isLoading: isUpdating } = useMutation({
        mutationFn: updatePasswordAPI,
        onSuccess: () => {
            toast.success("Updated password successfully.");
            queryClient.invalidateQueries(["user"]);
        },
        onError: (error) => {
            toast.error("Can't update password at the moment.");
            console.log(error.message);
        },
    });

    return { updatePassword, isUpdating };
}
