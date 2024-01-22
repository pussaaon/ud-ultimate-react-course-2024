import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";

import useBooking from "../bookings/hooks/useBooking";
import useCheckin from "./hooks/useCheckin";
import useSettings from "../settings/hooks/useSettings";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);

    const moveBack = useMoveBack();

    const { isLoading: isLoadingBooking, booking } = useBooking();
    const { checkin, isCheckingIn } = useCheckin();
    const { settings, isLoading: isLoadingSetting } = useSettings();

    useEffect(() => {
        setConfirmPaid(booking?.isPaid ?? false);
        setAddBreakfast(booking?.hasBreakfast ?? false);
    }, [booking]);

    if (isLoadingBooking || isLoadingSetting) return <Spinner />;

    const {
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        numNights,
        status,
    } = booking;
    const breakfastBasePrice = settings.breakfastPrice;

    const optionalBreakfastPrice = breakfastBasePrice * numGuests * numNights;

    function handleCheckin() {
        if (!confirmPaid) return;

        if (!addBreakfast) checkin(bookingId);
        else
            checkin({
                bookingId,
                breakfast: {
                    hasBreakfast: true,
                    extrasPrice: optionalBreakfastPrice,
                    totalPrice: totalPrice + optionalBreakfastPrice,
                },
            });
    }

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    function handleAddBreakfast() {
        setAddBreakfast((c) => !c);
        setConfirmPaid(false);
    }

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Check in booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[booking.status]}>
                        {booking.status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <Box>
                <Checkbox
                    checked={addBreakfast}
                    onChange={handleAddBreakfast}
                    id="breakfast"
                >
                    Want to add breakfast for {optionalBreakfastPrice}
                </Checkbox>
            </Box>

            <Box>
                <Checkbox
                    checked={confirmPaid}
                    onChange={() => setConfirmPaid((c) => !c)}
                    disabled={isCheckingIn}
                    id="confirmpaid"
                >
                    I confirm that {guests.fullName} has paid the total amount
                    of{" "}
                    {!addBreakfast
                        ? formatCurrency(totalPrice)
                        : `${formatCurrency(
                              totalPrice + optionalBreakfastPrice
                          )} 
                          (${formatCurrency(totalPrice)} + ${formatCurrency(
                              optionalBreakfastPrice
                          )})`}
                </Checkbox>
            </Box>

            <ButtonGroup>
                {status === "unconfirmed" && (
                    <Button
                        onClick={handleCheckin}
                        disabled={!confirmPaid || isCheckingIn}
                    >
                        Check in booking #{bookingId}
                    </Button>
                )}

                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
