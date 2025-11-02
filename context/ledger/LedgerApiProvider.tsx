'use client';

import React, {
    createContext, useContext, useEffect, useState, ReactNode, useRef,
} from 'react';
import { LedgerData, LedgerResponse } from '../../types/ledger/ledgerResponse';
import fetchOfType from '../../utils/fetchOfType';

export interface LedgerApiResults {
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    results: LedgerData[];
    currentBalance: string;
}

const LedgerApiContext = createContext<LedgerApiResults | undefined>(undefined);

const BASE = "https://ledger.unitystation.org";

export const LedgerApiProvider = ({ children }: { children: ReactNode }) => {
    const [fetchResult, setFetchResult] = useState<LedgerResponse | null>(null);
    const [pageUrl, setPageUrl] = useState<string>("");
    const isInitialLoad = useRef(true);
    const [currentBalance, setCurrentBalance] = useState("0.00");

    const hasNextPage = !!fetchResult?.next;
    const hasPreviousPage = !!fetchResult?.previous;

    const goToNextPage = () => fetchResult?.next && setPageUrl(fetchResult.next);
    const goToPreviousPage = () => fetchResult?.previous && setPageUrl(fetchResult.previous);

    useEffect(() => {
        const url = `${BASE}/movements/`;
        const fetchData = async () => {
            const res = await fetchOfType<LedgerResponse>(pageUrl || url);
            setFetchResult(res);
            if (isInitialLoad) {
                setCurrentBalance(res.results[0]?.balance_after || "0.00");
                isInitialLoad.current = true;
            }
        };

        void fetchData();
    }, [pageUrl]);

    return (
        <LedgerApiContext.Provider
            value={{
                goToNextPage,
                goToPreviousPage,
                hasNextPage,
                hasPreviousPage,
                results: fetchResult?.results ?? [],
                currentBalance,
            }}
        >
            {children}
        </LedgerApiContext.Provider>
    );
};

export const useLedgerApiProvider = (): LedgerApiResults => {
    const ctx = useContext(LedgerApiContext);
    if (!ctx) throw new Error('useLedger must be used within a LedgerProvider');
    return ctx;
};

