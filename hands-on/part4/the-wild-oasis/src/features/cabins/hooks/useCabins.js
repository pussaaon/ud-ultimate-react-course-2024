import { useQuery } from "@tanstack/react-query";
import { getCabins as getCabinAPI } from "../../../services/apiCabins";

function useCabins() {
    const {
        isLoading,
        data: cabins,
        error,
    } = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabinAPI,
    });
    return { isLoading, cabins, error };
}

export default useCabins;
