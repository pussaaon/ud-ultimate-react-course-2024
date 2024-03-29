import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import ActionMenus from "../../ui/ActionMenus";

import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import {
    HiArrowDownOnSquare,
    HiArrowUpOnSquare,
    HiEye,
    HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import useCheckout from "../check-in-out/hooks/useCheckout";
import useDeleteBooking from "./hooks/useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const Amount = styled.div`
    font-family: "Sono";
    font-weight: 500;
`;

function BookingRow({
    booking: {
        id: bookingId,
        created_at,
        startDate,
        endDate,
        numNights,
        numGuests,
        totalPrice,
        status,
        guests: { fullName: guestName, email },
        cabins: { name: cabinName },
    },
}) {
    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    const navigate = useNavigate();
    const { checkout, isCheckingOut } = useCheckout();
    const { deleteBooking, isDeleting } = useDeleteBooking();

    return (
        <Table.Row role="row">
            <Cabin>{cabinName}</Cabin>

            <Stacked>
                <span>{guestName}</span>
                <span>{email}</span>
            </Stacked>

            <Stacked>
                <span>
                    {isToday(new Date(startDate))
                        ? "Today"
                        : formatDistanceFromNow(startDate)}{" "}
                    &rarr; {numNights} night stay
                </span>
                <span>
                    {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
                    {format(new Date(endDate), "MMM dd yyyy")}
                </span>
            </Stacked>

            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

            <Amount>{formatCurrency(totalPrice)}</Amount>
            <Modal>
                <ActionMenus>
                    <ActionMenus.Toggle id={bookingId} />
                    <ActionMenus.List id={bookingId}>
                        <ActionMenus.Button
                            onClick={() => navigate(`/bookings/${bookingId}`)}
                        >
                            <HiEye /> <span>See details</span>
                        </ActionMenus.Button>
                        {status === "unconfirmed" && (
                            <>
                                <ActionMenus.Button
                                    onClick={() =>
                                        navigate(`/checkin/${bookingId}`)
                                    }
                                >
                                    <HiArrowDownOnSquare />{" "}
                                    <span>Check in</span>
                                </ActionMenus.Button>

                                <Modal.Opener modalName="delete-booking">
                                    <ActionMenus.Button>
                                        <HiTrash /> <span>Delete</span>
                                    </ActionMenus.Button>
                                </Modal.Opener>
                            </>
                        )}
                        {status === "checked-in" && (
                            <ActionMenus.Button
                                onClick={() => checkout(bookingId)}
                                disable={isCheckingOut}
                            >
                                <HiArrowUpOnSquare /> <span>Check out</span>
                            </ActionMenus.Button>
                        )}
                    </ActionMenus.List>
                    <Modal.Window name="delete-booking">
                        <ConfirmDelete
                            resourceName={"booking"}
                            onConfirm={() => deleteBooking(bookingId)}
                            disabled={isDeleting}
                        />
                    </Modal.Window>
                </ActionMenus>
            </Modal>
        </Table.Row>
    );
}

export default BookingRow;
