import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function useBookings() {
    const [searchParams] = useSearchParams();
    const filterValue = searchParams.get("status");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue };

    const {
        isLoading,
        error,
        data: bookings,
    } = useQuery({
        queryFn: () => getBookings(filter),
        queryKey: ["bookings", filter],
    });

    return { isLoading, error, bookings };
}

export default useBookings;
