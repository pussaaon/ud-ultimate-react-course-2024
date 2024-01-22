import { updateBooking } from "../../../services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    let id;
    const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
        mutationFn: ({ bookingId, breakfast }) => {
            id = bookingId;
            updateBooking(id, {
                status: "checked-in",
                isPaid: true,
                ...breakfast,
            });
        },
        onSuccess: (data) => {
            toast.success(`Booking #${id} successfully checked-in.`);
            queryClient.invalidateQueries({ active: true });
            navigate(`/bookings/${id}`);
        },
        onError: (error) => {
            console.log(error);
            toast.error("There was an error while checking in.");
        },
    });

    return { checkin, isCheckingIn };
}

export default useCheckin;
