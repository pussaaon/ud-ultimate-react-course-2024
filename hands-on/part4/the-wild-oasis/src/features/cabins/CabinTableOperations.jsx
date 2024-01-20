import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
    return (
        <TableOperations>
            <Filter
                filterColumn={"discount"}
                filterOptions={[
                    { label: "All", value: "all" },
                    { label: "No discount", value: "no-discount" },
                    { label: "With discount", value: "with-discount" },
                ]}
            />
            <SortBy
                options={[
                    {
                        column: "name",
                        direction: "asc",
                        label: "Sort by name (A-Z)",
                    },
                    {
                        column: "name",
                        direction: "desc",
                        label: "Sort by name (Z-A)",
                    },
                    {
                        column: "regularPrice",
                        direction: "asc",
                        label: "Sort by price (low to high)",
                    },
                    {
                        column: "regularPrice",
                        direction: "desc",
                        label: "Sort by price (high to low)",
                    },
                    {
                        column: "maxCapacity",
                        direction: "asc",
                        label: "Sort by capacity (low to high)",
                    },
                    {
                        column: "maxCapacity",
                        direction: "desc",
                        label: "Sort by capacity (high to low)",
                    },
                ]}
            />
        </TableOperations>
    );
}

export default CabinTableOperations;
