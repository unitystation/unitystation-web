'use client';

import React, {useState} from "react";
import {SortDirection} from "../atoms/TableHeaderCell";
import TableRow, {Column} from "../molecules/TableRow";
import TableHeaderRow from "../molecules/TableHeaderRow";

export interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    /** initial column index and direction */
    defaultSort?: { column: number; direction: SortDirection };
    /** bubble sort changes upward if you need it */
    onSortChange?: (col: number, dir: SortDirection) => void;
}

function DataTable<T>({
                                 columns,
                                 data,
                                 defaultSort,
                                 onSortChange,
                             }: DataTableProps<T>) {
    const [sortBy, setSortBy] = useState<number | null>(
        defaultSort ? defaultSort.column : null,
    );
    const [sortDir, setSortDir] = useState<SortDirection>(
        defaultSort ? defaultSort.direction : 'asc',
    );

    const handleSort = (col: number) => {
        const dir: SortDirection =
            sortBy === col && sortDir === 'asc' ? 'desc' : 'asc';
        setSortBy(col);
        setSortDir(dir);
        onSortChange?.(col, dir);
    };

    const sorted = React.useMemo(() => {
        if (sortBy === null) return data;
        const col = columns[sortBy];
        if (!col.sortFn) return data;
        const copied = [...data].sort(col.sortFn);
        return sortDir === 'asc' ? copied : copied.reverse();
    }, [data, sortBy, sortDir, columns]);

    return (
        <table className="w-full border-collapse bg-gray-900">
            <thead>
            <TableHeaderRow
                columns={columns}
                sortBy={sortBy}
                sortDir={sortDir}
                setSort={handleSort}
            />
            </thead>
            <tbody>
            {sorted.map((row, idx) => (
                <TableRow key={idx} columns={columns} row={row} />
            ))}
            </tbody>
        </table>
    );
}

export default DataTable;