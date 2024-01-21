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

    const page = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;

    const {
        isLoading,
        error,
        data: { data: bookings, count } = {},
    } = useQuery({
        queryFn: () => getBookings(filter, sortBy, page),
        queryKey: ["bookings", filter, sortBy, page],
    });

    return { isLoading, error, bookings, count };
}

export default useBookings;
