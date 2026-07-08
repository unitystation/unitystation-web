import { LedgerApiProvider } from "../../context/ledger/LedgerApiProvider";
import { LedgerTableProvider } from "../../context/ledger/LedgerDataTableProvider";
import LedgerPresentation from "../../components/ledger/LedgerPresentation";

const LedgerPage = () => {
    return (
        <LedgerApiProvider>
            <LedgerTableProvider>
                <LedgerPresentation />
            </LedgerTableProvider>
        </LedgerApiProvider>
    );
};

export default LedgerPage;
