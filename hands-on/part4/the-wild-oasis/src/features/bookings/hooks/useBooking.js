import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../../services/apiBookings";
import { useParams } from "react-router-dom";

function useBooking() {
    const { id } = useParams("id");

    const {
        isLoading,
        error,
        data: booking,
    } = useQuery({
        queryFn: () => getBooking(id),
        queryKey: ["booking", id],
    });

    return { isLoading, error, booking };
}

export default useBooking;
