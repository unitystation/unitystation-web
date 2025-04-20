import {ReactNode} from "react";
import classNames from "classnames";

export type SortDirection = 'asc' | 'desc';

const TableHeaderCell: React.FC<{
    children: ReactNode;
    sortable: boolean;
    active: boolean;
    dir: SortDirection;
    onClick?: () => void;
}> = ({ children, sortable, active, dir, onClick }) => {

    const classes = classNames(
        "p-2 bg-gray-800 text-left select-none",
        {
            "cursor-pointer": sortable,
        }
    )

    return (
        <th
            className={classes}
            onClick={sortable ? onClick : undefined}
        >
            {children}
            {sortable && (
                <span className="ml-1 text-xs">{active ? (dir === 'asc' ? '▲' : '▼') : '⇅'}</span>
            )}
        </th>
    )
}

export default TableHeaderCell;