export interface LedgerData {
    id: number;
    type: 'expense' | 'income';
    description: string;
    notes: string | null;
    amount_usd: string;
    created_at: string;
    balance_after: string;
    link: string | null;
}

export interface LedgerResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: LedgerData[];
}