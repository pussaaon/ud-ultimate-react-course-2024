import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateCabin as updateCabinAPI } from "../../../services/apiCabins";
import { toast } from "react-hot-toast";

function useUpdateCabin() {
    const queryClient = useQueryClient();

    const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
        mutationFn: ({ cabin, id }) => updateCabinAPI(cabin, id),
        onSuccess: () => {
            toast.success("Cabin is successfully updated.");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    return { updateCabin, isUpdating };
}

export default useUpdateCabin;
