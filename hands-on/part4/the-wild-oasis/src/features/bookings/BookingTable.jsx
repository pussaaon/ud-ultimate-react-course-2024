import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import ActionMenus from "../../ui/ActionMenus";
import useBookings from "./hooks/useBookings";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

function BookingTable() {
    const { isLoading, bookings } = useBookings();

    if (isLoading) return <Spinner />;
    if (!bookings.length) return <Empty resource={"bookings"} />;

    return (
        <ActionMenus>
            <Table columnsWidth="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
                <Table.Header>
                    <div>Cabin</div>
                    <div>Guest</div>
                    <div>Dates</div>
                    <div>Status</div>
                    <div>Amount</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={bookings}
                    render={(booking) => (
                        <BookingRow key={booking.id} booking={booking} />
                    )}
                />
            </Table>
        </ActionMenus>
    );
}

export default BookingTable;
