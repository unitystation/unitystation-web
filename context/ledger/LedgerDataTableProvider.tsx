"use client";

import { createContext, ReactNode, useContext } from "react";
import { GoInfo } from "react-icons/go";
import { DataTableProps } from "../../components/ui/DataTable";
import TextLink from "../../components/ui/TextLink";
import { LedgerData } from "../../types/ledger/ledgerResponse";
import { useLedgerApiProvider } from "./LedgerApiProvider";

const LedgerTableContext = createContext<DataTableProps<LedgerData> | undefined>(undefined);

export const LedgerTableProvider = ({ children }: { children: ReactNode }) => {
    const { results } = useLedgerApiProvider();

    const processDate = (date: string): ReactNode => {
        return Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(new Date(date));
    };

    const processDescription = (description: string, notes: string): ReactNode => {
        return (
            <div className="flex items-center gap-2">
                <span>{description}</span>
                {notes && <GoInfo title={notes} className="shrink-0 text-faint" />}
            </div>
        );
    };

    const processAmount = (amount: string, type: "income" | "expense"): ReactNode => {
        const usd = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        const formatted = usd.format(Number.parseFloat(amount));
        const colour = type === "income" ? "text-success" : "text-danger";
        return (
            <span className={`font-mono ${colour}`}>
                {type === "income" ? "+" : "−"}
                {formatted}
            </span>
        );
    };

    const processLink = (link: string): ReactNode => {
        if (!link) return null;
        return (
            <TextLink href={link} external className="text-xs">
                View
            </TextLink>
        );
    };

    const data: DataTableProps<LedgerData> = {
        columns: [
            {
                header: "Date",
                cell: (row) => processDate(row.created_at),
            },
            {
                header: "Description",
                cell: (row) => processDescription(row.description, row.notes || ""),
            },
            {
                header: "Amount (USD)",
                cell: (row) => processAmount(row.amount_usd, row.type),
                align: "right",
            },
            {
                header: "Link",
                cell: (row) => processLink(row.link || ""),
                align: "right",
            },
        ],
        data: results,
    };

    return <LedgerTableContext.Provider value={data}>{children}</LedgerTableContext.Provider>;
};

export const useLedgerTableContext = () => {
    const context = useContext(LedgerTableContext);
    if (!context) {
        throw new Error("useLedgerTableContext must be used within a LedgerTableProvider");
    }
    return context;
};
