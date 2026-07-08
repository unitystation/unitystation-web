"use client";

import { useEffect, useState } from "react";
import { FaPaypal } from "react-icons/fa";
import { RiPatreonFill } from "react-icons/ri";
import Container from "../../components/ui/Container";
import DataTable from "../../components/ui/DataTable";
import LinkButton from "../../components/ui/LinkButton";
import PageHeader from "../../components/ui/PageHeader";
import Pagination from "../../components/ui/Pagination";
import Panel from "../../components/ui/Panel";
import { useLedgerApiProvider } from "../../context/ledger/LedgerApiProvider";
import { useLedgerTableContext } from "../../context/ledger/LedgerDataTableProvider";
import { PATREON_URL, PAYPAL_DONATION_URL } from "../../utils/urlContants";

const BALANCE_COUNT_UP_MS = 1200;

const usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

/**
 * The balance figure, counting up from zero once the real number arrives.
 * Jumps straight to the target under prefers-reduced-motion.
 */
function AnimatedBalance({ balance, ready }: { balance: string; ready: boolean }) {
    const target = Number.parseFloat(balance) || 0;
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!ready) return;

        // Reduced motion collapses the count-up into a single frame.
        const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? 0
            : BALANCE_COUNT_UP_MS;

        let raf: number;
        const t0 = performance.now();
        const tick = (now: number) => {
            const progress = duration > 0 ? Math.min((now - t0) / duration, 1) : 1;
            const eased = 1 - Math.pow(1 - progress, 4);
            setValue(target * eased);
            if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [ready, target]);

    return <p className="font-mono text-4xl font-semibold text-success">{usd.format(value)}</p>;
}

export default function LedgerPresentation() {
    const content = useLedgerTableContext();
    const {
        hasNextPage,
        hasPreviousPage,
        goToPreviousPage,
        goToNextPage,
        currentBalance,
        isLoading,
    } = useLedgerApiProvider();

    return (
        <Container className="pb-16">
            <PageHeader title="Funding Ledger" />

            <div className="grid gap-4 lg:grid-cols-[minmax(240px,1fr)_2fr]">
                <Panel title="Current balance">
                    <AnimatedBalance balance={currentBalance} ready={!isLoading} />
                    <p className="mt-4 text-sm text-dim">
                        This is the amount currently available in Unitystation&apos;s project fund.
                        It updates manually after we receive a donation or withdraw from Patreon.
                    </p>
                    <p className="mt-2 text-sm text-dim">
                        If your donation is not listed yet, it will appear soon once we update the
                        ledger.
                    </p>
                </Panel>

                <Panel title="Where does our funding come from?">
                    <p className="text-sm text-dim">
                        Unitystation is sustained entirely through community support; whether by
                        backing us on Patreon or sending direct donations. Every contribution helps
                        cover hosting, development, and infrastructure.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <LinkButton href={PATREON_URL} external iconLeft={RiPatreonFill}>
                            Support us on Patreon
                        </LinkButton>
                        <LinkButton
                            href={PAYPAL_DONATION_URL}
                            external
                            variant="secondary"
                            iconLeft={FaPaypal}
                        >
                            Donate via PayPal
                        </LinkButton>
                    </div>
                </Panel>
            </div>

            <div className="mt-6">
                <DataTable
                    columns={content.columns}
                    data={content.data}
                    emptyMessage="No movements recorded."
                    loading={isLoading}
                />
                <Pagination
                    hasPrevious={hasPreviousPage}
                    hasNext={hasNextPage}
                    onPrevious={goToPreviousPage}
                    onNext={goToNextPage}
                />
            </div>
        </Container>
    );
}
