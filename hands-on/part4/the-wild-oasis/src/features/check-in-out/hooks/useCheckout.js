import { updateBooking } from "../../../services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    let id;
    const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
        mutationFn: (bookingId) => {
            id = bookingId;
            updateBooking(id, { status: "checked-out" });
        },
        onSuccess: () => {
            toast.success(`Booking #${id} successfully checked-out.`);
            queryClient.invalidateQueries(["booking", "today-activities"]);
            navigate(`/bookings/${id}`);
        },
        onError: (error) => {
            console.log(error);
            toast.error("There was an error while checking out.");
        },
    });

    return { checkout, isCheckingOut };
}

export default useCheckout;
