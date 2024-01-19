import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createCabin as createCabinAPI } from "../../../services/apiCabins";

function useCreateCabin() {
    const queryClient = useQueryClient();

    const { mutate: createCabin, isLoading: isCreating } = useMutation({
        mutationFn: createCabinAPI,
        onSuccess: () => {
            toast.success("Cabin is successfully created.");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { createCabin, isCreating };
}

export default useCreateCabin;
