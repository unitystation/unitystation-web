import Build from "../../types/build";
import Change from "../../types/change";
import ChangeComponent from "./changeComponent";
import React, { useState } from "react";
import Panel from "../common/uiLibrary/panel";

function populateChangeList(changes: Change[]) {
    let changesList;

    if (changes?.length > 0) {
        changesList = changes.map((change: Change, index: number) => {
            return (
                <ChangeComponent
                    key={index}
                    change={change}
                />

            )
        });
    } else {
        changesList =
            <li className={'py-3 sm:py-4'}>
                <div className={'flex items-center space-x-4'}>
                    <div className={'flex-1 min-w-fit'}>
                        <p className={'text-center text-gray-500'}>This build has no registered changes :(</p>
                    </div>
                </div>
            </li>
    }

    return changesList;
}

interface BuildProps {
    build: Build
}

const BuildComponent = (props: BuildProps) => {
    const { version_number, date_created, changes } = props.build;
    const changesList = populateChangeList(changes);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const platforms = [
        "linuxserver",
        "StandaloneLinux64",
        "StandaloneOSX",
        "StandaloneWindows64"
    ];

    const renderDownloadSection = () => {
        return (
            <div className="relative mt-2 flex justify-end">
                <button
                    onClick={toggleDropdown}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                >
                    Download
                </button>
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-12 w-56 rounded-md shadow-lg bg-slate-600 ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            {platforms.map((platform) => (
                                <a
                                    key={platform}
                                    href={`https://unitystationfile.b-cdn.net/UnityStationDevelop/${platform}/${version_number}.zip`}
                                    className="block px-4 py-2 text-sm text-blue-50 hover:bg-gray-100 hover:text-gray-900"
                                    role="menuitem"
                                >
                                    {platform}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <Panel>
            <div className='flex justify-between'>
                <h5 className="lg:text-xl font-bold leading-none text-white">
                    Build: {version_number}
                </h5>
                <h5 className="lg:text-xl font-bold leading-none text-white">
                    Date: {date_created}
                </h5>
            </div>
            <div className="flow-root">
                <ul className="divide-y divide-gray-700">
                    {changesList}
                </ul>
            </div>
            {renderDownloadSection()}
        </Panel>
    )
}

export default BuildComponent;