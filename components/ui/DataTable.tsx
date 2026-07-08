import type { ReactNode } from "react";

export interface Column<T> {
    header: string;
    cell: (row: T) => ReactNode;
    /** Optional cell alignment; headers follow. */
    align?: "left" | "right";
}

export interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    /** Shown when data is empty. */
    emptyMessage?: string;
    /** Render pulsing placeholder rows instead of data. */
    loading?: boolean;
    /** How many placeholder rows to sketch, sized to match real rows so the
     *  table keeps its height while the data arrives. */
    skeletonRows?: number;
}

/** Data table: small mono headers, hairline rows, hover highlight. */
export default function DataTable<T>({
    columns,
    data,
    emptyMessage = "No records.",
    loading = false,
    skeletonRows = 10,
}: DataTableProps<T>) {
    return (
        <div className="overflow-x-auto rounded-lg border border-seam bg-panel shadow-panel">
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="border-b border-seam bg-raised">
                        {columns.map((col) => (
                            <th
                                key={col.header}
                                scope="col"
                                className={`type-label px-4 py-3 font-normal text-dim ${
                                    col.align === "right" ? "text-right" : "text-left"
                                }`}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        Array.from({ length: skeletonRows }).map((_, i) => (
                            <tr key={i} className="border-b border-seam/60 last:border-b-0">
                                {columns.map((col) => (
                                    <td key={col.header} className="px-4 py-3">
                                        {/* h-5 matches the text-sm line height of a data cell */}
                                        <span
                                            className={`block h-5 animate-pulse rounded bg-raised ${
                                                col.align === "right" ? "ml-auto w-16" : "w-2/3"
                                            }`}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-4 py-10 text-center text-faint"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((row, i) => (
                            <tr
                                key={i}
                                className="border-b border-seam/60 transition-colors last:border-b-0 hover:bg-raised/40"
                            >
                                {columns.map((col) => (
                                    <td
                                        key={col.header}
                                        className={`px-4 py-3 text-dim ${col.align === "right" ? "text-right" : ""}`}
                                    >
                                        {col.cell(row)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
