import {Column} from "./TableRow";
import TableHeaderCell, {SortDirection} from "../atoms/TableHeaderCell";

const TableHeaderRow = <T,>({
                                columns,
                                sortBy,
                                sortDir,
                                setSort,
                            }: {
    columns: Column<T>[];
    sortBy: number | null;
    sortDir: SortDirection;
    setSort: (col: number) => void;
}) => (
    <tr>
        {columns.map((col, i) => (
            <TableHeaderCell
                key={i}
                sortable={!!col.sortFn}
                active={sortBy === i}
                dir={sortDir}
                onClick={() => col.sortFn && setSort(i)}
            >
                {col.header}
            </TableHeaderCell>
        ))}
    </tr>
);

export default TableHeaderRow;