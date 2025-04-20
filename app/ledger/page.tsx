import {LedgerApiProvider} from "../../context/ledger/LedgerApiProvider";
import LedgerPresentation from "./presentation";
import {LedgerTableProvider} from "../../context/ledger/LedgerDataTableProvider";

const LedgerPage = () => {
    return (
        <LedgerApiProvider>
            <LedgerTableProvider>
                <LedgerPresentation />
            </LedgerTableProvider>
        </LedgerApiProvider>
    )
}

export default LedgerPage;