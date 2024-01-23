import { getStaysTodayActivity } from "../../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export function useTodayActivities() {
    const {
        data: activities,
        isLoading,
        error,
    } = useQuery({
        queryFn: getStaysTodayActivity,
        queryKey: ["today-activities"],
    });

    return { activities, isLoading, error };
}
