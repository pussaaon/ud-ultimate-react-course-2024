import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../utils/constants";

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

    const total_pages = Math.ceil(count / PAGE_SIZE);
    const queryClient = useQueryClient();

    if (page < total_pages) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page + 1],
            queryFn: () => getBookings(filter, sortBy, page + 1),
        });
    }

    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page - 1],
            queryFn: () => getBookings(filter, sortBy, page - 1),
        });
    }

    return { isLoading, error, bookings, count };
}

export default useBookings;
