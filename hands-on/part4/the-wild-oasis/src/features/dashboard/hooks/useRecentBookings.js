import { subDays } from "date-fns";
import { getBookingsAfterDate } from "../../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function useRecentBookings() {
    const [searchParams] = useSearchParams();

    const numPastDays = !searchParams.get("last")
        ? 7
        : Number(searchParams.get("last"));

    const queryDate = subDays(new Date(), numPastDays).toISOString();

    const { isLoading, data: bookings } = useQuery({
        queryFn: () => getBookingsAfterDate(queryDate),
        queryKey: ["report-bookings", `last-${numPastDays}`],
    });

    return { isLoading, bookings, numPastDays };
}
