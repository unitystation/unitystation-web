import {ReactNode} from "react";

const TableCell: React.FC<{ children: ReactNode }> = ({ children }) => (
    <td className="p-2 border-b border-slate-700">{children}</td>
);

export default TableCell;