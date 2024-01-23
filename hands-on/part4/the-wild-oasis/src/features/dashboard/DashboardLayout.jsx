import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useRecentBookings } from "./hooks/useRecentBookings";
import { useRecentStays } from "./hooks/useRecentStays";
import useCabins from "../../features/cabins/hooks/useCabins";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

function DashboardLayout() {
    const {
        bookings,
        isLoading: isLoadingBookings,
        numLastDays,
    } = useRecentBookings();
    const {
        stays,
        confirmedStays,
        isLoading: isLoadingStays,
    } = useRecentStays();
    const { cabins, isLoading: isLoadingCabins } = useCabins();

    if (isLoadingBookings || isLoadingStays || isLoadingCabins)
        return <Spinner />;

    return (
        <StyledDashboardLayout>
            <Stats
                bookings={bookings}
                confirmedStays={confirmedStays}
                numLastDays={numLastDays}
                totalUnits={cabins.length}
            />
            <div>Today activities</div>
            <div>Chart stay duration</div>
            <div>Chart sales</div>
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
