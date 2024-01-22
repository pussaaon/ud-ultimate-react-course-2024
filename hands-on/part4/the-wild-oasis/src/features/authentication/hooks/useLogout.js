import { logout as logoutAPI } from "../../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: logout, isLoading } = useMutation({
        mutationFn: logoutAPI,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate("/login");
        },
    });

    return { logout, isLoading };
}

export default useLogout;
