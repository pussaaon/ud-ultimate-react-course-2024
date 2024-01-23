import { subDays } from "date-fns";
import { getBookingsAfterDate } from "../../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function useRecentBookings() {
    const [searchParams] = useSearchParams();

    const numLastDays = !searchParams.get("last")
        ? 7
        : Number(searchParams.get("last"));

    const queryDate = subDays(new Date(), numLastDays).toISOString();

    const { isLoading, data: bookings } = useQuery({
        queryFn: () => getBookingsAfterDate(queryDate),
        queryKey: ["report-bookings", `last-${numLastDays}`],
    });

    return { isLoading, bookings, numLastDays };
}
