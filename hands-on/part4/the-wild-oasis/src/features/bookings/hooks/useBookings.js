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

    const sortByValue = searchParams.get("sort") || "startDate-desc";
    const [field, direction] = sortByValue.split("-");
    const sortBy = { field, direction };

    const {
        isLoading,
        error,
        data: bookings,
    } = useQuery({
        queryFn: () => getBookings(filter, sortBy),
        queryKey: ["bookings", filter, sortBy],
    });

    return { isLoading, error, bookings };
}

export default useBookings;
