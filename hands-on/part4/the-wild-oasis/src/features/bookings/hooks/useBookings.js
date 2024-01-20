import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../../services/apiBookings";

function useBookings() {
    const {
        isLoading,
        error,
        data: bookings,
    } = useQuery({
        queryFn: getBookings,
        queryKey: ["bookings"],
    });

    return { isLoading, error, bookings };
}

export default useBookings;
