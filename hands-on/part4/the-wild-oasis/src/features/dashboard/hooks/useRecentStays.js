import { subDays } from "date-fns";
import { getStaysAfterDate } from "../../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function useRecentStays() {
    const [searchParams] = useSearchParams();

    const numPastDays = !searchParams.get("last")
        ? 7
        : Number(searchParams.get("last"));

    const queryDate = subDays(new Date(), numPastDays).toISOString();

    const { isLoading, data: stays } = useQuery({
        queryFn: () => getStaysAfterDate(queryDate),
        queryKey: ["report-stays", `last-${numPastDays}`],
    });

    const confirmedStays = stays?.filter(
        (stay) => stay.status === "checked-in" || stay.status === "checked-out"
    );

    return { isLoading, stays, confirmedStays, numPastDays };
}
