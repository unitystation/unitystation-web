'use client';

import {createContext, ReactNode, useContext} from "react";
import {DataTableProps} from "../../components/organisms/DataTable";
import {LedgerData} from "../../types/ledger/ledgerResponse";
import {useLedgerApiProvider} from "./LedgerApiProvider";
import {GoInfo, GoLinkExternal} from "react-icons/go";


const LedgerTableContext = createContext<DataTableProps<LedgerData> | undefined>(undefined);

export const LedgerTableProvider = ({ children }: { children: ReactNode }) => {
    const {results} = useLedgerApiProvider();

    const processDate = (date: string): ReactNode => {
        return Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }).format(new Date(date));
    }

    const processDescription = (description: string, notes: string): ReactNode => {
        return (
            <div className="flex gap-2">
                <span>
                    {description}
                </span>
                {notes && (
                    <GoInfo title={notes} />
                )}
            </div>

        );
    }

    const processAmount = (amount: string, type: 'income' | 'expense'): ReactNode => {
        const usd = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        const numeric = Number.parseFloat(amount);
        const formatted = usd.format(numeric);

        const colour = type === 'income' ? 'text-green-500' : 'text-red-500';
        return <span className={colour}>{formatted}</span>;
    }

    const processLink = (link: string): ReactNode => {
        if (link) {
            return <a href={link}><GoLinkExternal /></a>
        } else {
            return <></>
        }
    }

    const data: DataTableProps<LedgerData> = {
        columns: [
            {
                header: "Date",
                cell: row => processDate(row.created_at)
            },
            {
                header: "Description",
                cell: row => processDescription(row.description, row.notes || "")
            },
            {
                header: "Amount (USD)",
                cell: row => processAmount(row.amount_usd, row.type)
            },
            {
                header: "Link",
                cell: row => processLink(row.link || "")
            }
        ],
        data: results
    };

    return (
        <LedgerTableContext.Provider value={data}>
            {children}
        </LedgerTableContext.Provider>
    );
}

export const useLedgerTableContext = () => {
    const context = useContext(LedgerTableContext);
    if (!context) {
        throw new Error('useLedgerTableContext must be used within a LedgerTableProvider');
    }
    return context;
}