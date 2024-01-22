import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import useBooking from "./hooks/useBooking";
import useCheckout from "../check-in-out/hooks/useCheckout";
import {
    HiArrowDownOnSquare,
    HiArrowUpOnSquare,
    HiTrash,
} from "react-icons/hi2";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate, useParams } from "react-router-dom";
import useDeleteBooking from "./hooks/useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { id: bookingId } = useParams();

    const { isLoading, booking } = useBooking();
    const { checkout, isCheckingOut } = useCheckout();
    const { deleteBooking, isDeleting } = useDeleteBooking();

    const moveBack = useMoveBack();
    const navigate = useNavigate();

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    if (isLoading) return <Spinner />;

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[booking.status]}>
                        {booking.status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                {booking.status === "unconfirmed" && (
                    <>
                        <Button
                            variation="primary"
                            onClick={() => navigate(`/checkin/${bookingId}`)}
                        >
                            <HiArrowDownOnSquare /> <span>Check in</span>
                        </Button>
                        <Modal>
                            <Modal.Opener id="delete-booking">
                                <Button variation="danger">
                                    <HiTrash /> <span>Delete</span>
                                </Button>
                            </Modal.Opener>
                            <Modal.Window id="delete-booking">
                                <ConfirmDelete
                                    resourceName={"booking"}
                                    onConfirm={() =>
                                        deleteBooking(bookingId, {
                                            onSuccess: () => navigate(-1),
                                        })
                                    }
                                    disabled={isDeleting}
                                />
                            </Modal.Window>
                        </Modal>
                    </>
                )}
                {booking.status === "checked-in" && (
                    <Button
                        variation="primary"
                        onClick={() => checkout(bookingId)}
                        disabled={isCheckingOut}
                    >
                        <HiArrowUpOnSquare /> <span>Check out</span>
                    </Button>
                )}
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
