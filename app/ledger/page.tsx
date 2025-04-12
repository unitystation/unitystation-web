import { headers } from 'next/headers';

interface Movement {
    id: number;
    type: 'income' | 'expense'; //shouldn't we report taxes here as well?
    amount_usd: string;
    created_at: string;
    balance_after: string;
    description?: string; // unused at the moment. we should use it to say what these transactions are for in the future
}

async function getLedgerData(): Promise<Movement[]> {
    console.log('Fetching ledger data...');
    const res = await fetch('https://ledger.unitystation.org/movements/', {
        headers: {
            'Accept': 'application/json',
        },
        next: { revalidate: 5 }
    });

    if (!res.ok) throw new Error('Failed to fetch ledger data');
    let great = JSON.parse(await res.text());
    let data = great.results as Movement[];
    if (great.next !== null) {
        let nextPage = great.next;
        while (nextPage) {
            const nextRes = await fetch(nextPage, {
                headers: {
                    'Accept': 'application/json',
                },
                next: { revalidate: 5 }
            });
            if (!nextRes.ok) throw new Error('Failed to fetch ledger data');
            let nextData = JSON.parse(await nextRes.text());
            data = [...data, ...nextData.results];
            nextPage = nextData.next;
        }
    }
    return await data;
}

function calculateTotalProfitLoss(ledgerData: Movement[]): number {
    return ledgerData.reduce((total, movement) => {
        const amount = parseFloat(movement.amount_usd);
        return movement.type === 'income' ? total + amount : total - amount;
    }, 0);
}

function getLastMonthData(ledgerData: Movement[], currentBalance: number): string {
    const now = new Date();
    const firstEntryDate = new Date(ledgerData[0].created_at);
    const lastMonth = new Date(firstEntryDate.getFullYear(), firstEntryDate.getMonth() - 1);
    const lastMonthData = ledgerData.find(m =>
        new Date(m.created_at).getMonth() === lastMonth.getMonth() &&
        new Date(m.created_at).getFullYear() === lastMonth.getFullYear()
    );
    if (lastMonthData) {
        const diff = currentBalance - parseFloat(lastMonthData.balance_after);
        return `Last month: $${parseFloat(lastMonthData.balance_after).toFixed(2)} ${diff > 0 ? '↑' : '↓'}`;
    }
    return 'No data from last month';
}

function getLastIncome(ledgerData: Movement[]) {
    const lastIncome = ledgerData.find(m => m.type === 'income');
    if (lastIncome) {
        return (
            <>
                <p className="text-2xl font-bold text-green-500">
                    ${parseFloat(lastIncome.amount_usd).toFixed(2)} USD
                </p>
                <p className="text-sm text-slate-400">
                    {new Date(lastIncome.created_at).toLocaleDateString()}
                </p>
                <div className="hidden group-hover:block absolute bg-slate-700 p-2 rounded-lg shadow-lg left-48 top-12">
                    <p className="text-sm">
                        The last amount of recorded money transferred from Patreon to our PayPal account
                    </p>
                </div>
            </>
        );
    }
    return <p className="text-slate-400">No income recorded</p>;
}

function renderLedgerTable(ledgerData: Movement[]) {
    return ledgerData.map((movement, i) => (
        <tr key={i} className="border-b border-slate-700">
            <td className="p-2">
                {new Date(movement.created_at).toLocaleDateString()}
            </td>
            <td className="p-2">{movement.type}</td>
            <td className={`p-2 text-right ${movement.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                ${parseFloat(movement.amount_usd).toFixed(2)}
            </td>
        </tr>
    ));
}

export default async function LedgerPage() {
    const ledgerData: Movement[] = await getLedgerData();

    if (!ledgerData || ledgerData.length === 0) {
        const reason = !ledgerData ? "Failed to fetch data"
            : !Array.isArray(ledgerData) ? "Invalid data format"
                : "No transactions available";

        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">UnityStation Ledger</h1>
                <div className="bg-slate-800 p-4 rounded-lg">
                    <p className="text-red-500">Error: {reason}</p>
                </div>
            </div>
        );
    } else {
        console.log('Ledger data fetched, first entry:', ledgerData[0]);
    }

    const totalProfitLoss = calculateTotalProfitLoss(ledgerData);
    const currentBalance = totalProfitLoss;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">UnityStation Ledger</h1>

            <div className="flex gap-4 mb-8">
                <div className="bg-slate-800 p-4 rounded-lg relative group flex-1">
                    <h2 className="text-xl mb-2">Current Balance</h2>
                    <p className="text-2xl font-bold text-green-500">
                        ${currentBalance.toFixed(2)} USD
                    </p>
                    <p className="text-sm text-slate-400">
                        {getLastMonthData(ledgerData, currentBalance)}
                    </p>
                    <div className="hidden group-hover:block absolute bg-slate-700 p-2 rounded-lg shadow-lg left-48 top-12">
                        <p className="text-sm">
                            Last recorded balance based off last movement: ${ledgerData[0].balance_after} USD
                        </p>
                    </div>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg flex-1 relative group">
                    <h2 className="text-xl mb-2">Last Collected Income</h2>
                    {getLastIncome(ledgerData)}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-slate-800">
                    <thead>
                        <tr className="bg-slate-700">
                            <th className="p-2 text-left">Date</th>
                            <th className="p-2 text-left">Type</th>
                            <th className="p-2 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderLedgerTable(ledgerData)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}