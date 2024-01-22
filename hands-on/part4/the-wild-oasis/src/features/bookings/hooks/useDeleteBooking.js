import { deleteBooking as deleteBookingAPI } from "../../../services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

function useDeleteBooking() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
        mutationFn: deleteBookingAPI,
        onSuccess: () => {
            toast.success("Delete booking successfully.");
            queryClient.invalidateQueries(["bookings"]);
        },
        onError: (err) => {
            toast.error("Cannot delete this booking.");
            console.log(err.message);
        },
    });

    return { isDeleting, deleteBooking };
}

export default useDeleteBooking;
