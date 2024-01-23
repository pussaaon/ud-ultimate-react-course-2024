import { updateUserInfo as updateUserAPI } from "../../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateUserAPI,
        onSuccess: () => {
            toast.success("Update user information successfully");
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (error) => toast.error(error.message),
    });

    return { updateUser, isUpdating };
}
