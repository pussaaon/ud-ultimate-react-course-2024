import { updateBooking } from "../../../services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
        mutationFn: (bookingId) =>
            updateBooking(bookingId, {
                status: "checked-in",
                isPaid: true,
            }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked-in.`);
            queryClient.invalidateQueries({ active: true });
            navigate("/");
        },
        onError: (error) => {
            console.log(error);
            toast.error("There was an error while checking in.");
        },
    });

    return { checkin, isCheckingIn };
}

export default useCheckin;
