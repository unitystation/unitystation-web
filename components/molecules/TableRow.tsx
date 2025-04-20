import {ReactNode} from "react";
import TableCell from "../atoms/TableCell";

export interface Column<T> {
    header: string;
    cell: (row: T) => ReactNode;
    sortFn?: (a: T, b: T) => number;
}

const TableRow = <T,>({ columns, row }: { columns: Column<T>[]; row: T }) => (
    <tr>
        {columns.map((col, i) => (
            <TableCell key={i}>{col.cell(row)}</TableCell>
        ))}
    </tr>
);

export default TableRow;