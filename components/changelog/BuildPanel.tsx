"use client";

import { BiSolidDownload } from "react-icons/bi";
import Dropdown from "../../components/ui/Dropdown";
import Panel from "../../components/ui/Panel";
import Build from "../../types/build";
import ChangeRow from "./ChangeRow";

/* Game builds are published per platform on the CDN under the same version. */
const BUILD_PLATFORMS = [
    { key: "StandaloneWindows64", label: "Windows" },
    { key: "StandaloneOSX", label: "macOS" },
    { key: "StandaloneLinux64", label: "Linux" },
    { key: "linuxserver", label: "Linux server" },
];

const buildDownloadUrl = (platform: string, version: string) =>
    `https://cdn.unitystation.org/UnityStationDevelop/${platform}/${version}.zip`;

export default function BuildPanel({ build }: { build: Build }) {
    const { version_number, date_created, changes } = build;

    return (
        <Panel title={`Build ${version_number}`} meta={date_created} flush>
            <div className="px-5 sm:px-6">
                {changes?.length > 0 ? (
                    <ul className="divide-y divide-seam/60">
                        {changes.map((change, index) => (
                            <ChangeRow key={index} change={change} />
                        ))}
                    </ul>
                ) : (
                    <p className="py-6 text-center text-sm text-faint">
                        This build has no registered changes :(
                    </p>
                )}
            </div>
            <footer className="flex justify-end border-t border-seam px-5 py-3 sm:px-6">
                <Dropdown
                    label={
                        <>
                            <BiSolidDownload className="h-4 w-4" aria-hidden />
                            Download build
                        </>
                    }
                    items={BUILD_PLATFORMS.map(({ key, label }) => ({
                        label,
                        href: buildDownloadUrl(key, version_number),
                    }))}
                />
            </footer>
        </Panel>
    );
}
