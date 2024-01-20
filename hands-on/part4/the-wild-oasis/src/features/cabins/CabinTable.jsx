import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./hooks/useCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
    const { isLoading, cabins } = useCabins();
    const [searchParams] = useSearchParams();

    if (isLoading) return <Spinner />;

    const filterValue = searchParams.get("discount") || "all";

    let filterCabins;
    switch (filterValue) {
        case "all":
            filterCabins = cabins;
            break;
        case "no-discount":
            filterCabins = cabins.filter((cabin) => cabin.discount === 0);
            break;
        case "with-discount":
            filterCabins = cabins.filter((cabin) => cabin.discount > 0);
            break;
    }

    return (
        <Table columnsWidth="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
            <Table.Header>
                <div></div>
                <div>Cabin</div>
                <div>Capacity</div>
                <div>Price</div>
                <div>Discount</div>
                <div></div>
            </Table.Header>
            <Table.Body
                data={filterCabins}
                render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
            />
        </Table>
    );
}

export default CabinTable;
