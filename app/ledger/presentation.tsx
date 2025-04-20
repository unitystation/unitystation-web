'use client';

import DataTable from "../../components/organisms/DataTable";
import {useLedgerTableContext} from "../../context/ledger/LedgerDataTableProvider";
import Container from "../common/uiLibrary/container";
import PageHeading from "../common/uiLibrary/PageHeading";
import {useLedgerApiProvider} from "../../context/ledger/LedgerApiProvider";
import Panel from "../common/uiLibrary/panel";
import {RiPatreonFill} from "react-icons/ri";
import {FaPaypal} from "react-icons/fa";
import {PATREON_URL, PAYPAL_DONATION_URL} from "../../utils/urlContants";

export default function LedgerPresentation() {
    const content = useLedgerTableContext();
    const {hasNextPage, hasPreviousPage, goToPreviousPage, goToNextPage, currentBalance} = useLedgerApiProvider();

    return (
        <Container>
            <PageHeading>Funding Ledger</PageHeading>
            <div className="flex justify-between gap-4">
                <Panel className="rounded-lg w-50">
                    <div className="text-lg font-semibold text-gray-200">Current Balance</div>
                    <div className="text-3xl font-bold text-green-400">
                        ${currentBalance}
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                        This is the amount currently available in Unitystation’s project fund.
                        It updates manually after we receive a donation or withdraw from Patreon.
                    </p>
                    <p className="mt-2 text-sm text-gray-400">
                        If your donation is not listed yet, it will appear soon once we update the ledger.
                    </p>
                </Panel>
                <Panel className="rounded-lg">
                    <div className="text-lg font-semibold text-gray-200 mb-2">
                        Where does our funding come from?
                    </div>

                    <p className="text-sm text-gray-400 mb-4">
                        Unitystation is sustained entirely through community support; whether by backing us on Patreon or sending direct donations. Every contribution helps cover hosting, development, and infrastructure.
                    </p>

                    <div className="flex gap-4 items-center mt-4">
                        <a
                            href={PATREON_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 text-white bg-[#ff424d] rounded hover:bg-[#e63946] transition"
                        >
                            <RiPatreonFill size={20} />
                            Support us on Patreon
                        </a>

                        <a
                            href={PAYPAL_DONATION_URL}
                            className="flex items-center gap-2 px-4 py-2 text-white bg-[#00457C] rounded hover:bg-[#003a6b] transition"
                        >
                            <FaPaypal size={20} />
                            Donate via PayPal
                        </a>
                    </div>
                </Panel>
            </div>

            <DataTable columns={content.columns} data={content.data} />

            {/*TODO: make this shit a generic component and stylise it*/}
            <div className="flex justify-between p-5">
                <div className="flex-1">
                    {hasPreviousPage && (
                        <button className="hover:!text-blue-700" onClick={goToPreviousPage}>Previous</button>
                    )}
                </div>

                <div className="flex-1 text-right">
                    {hasNextPage && (
                        <button className="hover:!text-blue-700" onClick={goToNextPage}>Next</button>
                    )}
                </div>
            </div>
        </Container>
    );
}