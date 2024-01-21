import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
    return (
        <TableOperations>
            <Filter
                filterField={"discount"}
                options={[
                    { label: "All", value: "all" },
                    { label: "No discount", value: "no-discount" },
                    { label: "With discount", value: "with-discount" },
                ]}
            />
            <SortBy
                options={[
                    {
                        value: "name-asc",
                        label: "Sort by name (A-Z)",
                    },
                    {
                        value: "name-desc",
                        label: "Sort by name (Z-A)",
                    },
                    {
                        value: "regularPrice-asc",
                        label: "Sort by price (low to high)",
                    },
                    {
                        value: "regularPrice-desc",
                        label: "Sort by price (high to low)",
                    },
                    {
                        value: "maxCapacity-asc",
                        label: "Sort by capacity (low to high)",
                    },
                    {
                        value: "maxCapacity-desc",
                        label: "Sort by capacity (high to low)",
                    },
                ]}
            />
        </TableOperations>
    );
}

export default CabinTableOperations;
