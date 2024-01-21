import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../../services/apiBookings";

function useBooking(id) {
    const {
        isLoading,
        error,
        data: booking,
    } = useQuery({
        queryFn: () => getBooking(id),
        queryKey: ["booking"],
    });

    return { isLoading, error, booking };
}

export default useBooking;
