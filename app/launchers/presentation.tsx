import PageSection from "../common/uiLibrary/pageSection";
import Panel from "../common/uiLibrary/panel";
import PageHeading from "../common/uiLibrary/PageHeading";
import LinkButton from "../common/uiLibrary/linkButton";

export default function DownloadPresentation() {
    return (
        <PageSection>
            <Panel>
                <div className="max-w-4xl mx-auto">
                    <PageHeading isCentered>Choose a launcher</PageHeading>
                    <p className="text-center text-lg mb-8 text-gray-300">Choose a launcher below to download and install.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <h3 className="text-2xl font-semibold mb-2">StationHub</h3>
                            <p className="mb-4 text-sm text-gray-400">The official UnityStation launcher.</p>
                            <div className="mt-auto">
                                <LinkButton filled={true} text={"View Release"} linkTo={"https://github.com/unitystation/stationhub/releases"} />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <h3 className="text-2xl font-semibold mb-2">PuduLauncher</h3>
                            <p className="mb-4 text-sm text-gray-400">The modern launcher for UnityStation.</p>
                            <div className="mt-auto">
                                <LinkButton filled={false} text={"View Releases"} linkTo={"https://github.com/corp-0/PuduLauncher/releases"} />
                            </div>
                        </div>
                    </div>
                </div>
            </Panel>
        </PageSection>
    );
}