import Build from "../../../types/build";
import Change from "../../../types/change";
import ChangeComponent from "../../molecules/changelog/ChangeComponent";
import React, {useEffect, useRef, useState} from "react";
import Panel from "../../molecules/layout/Panel";
import Button from "../../atoms/Button";
import {BiSolidChevronDown} from "react-icons/bi";
import classNames from "classnames";

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

//TODO: make this component a general dropdown instead and move it to commons
const DownloadBuildDropdown = (props: { version: string }) => {
    'use client'

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const platforms = [
        "linuxserver",
        "StandaloneLinux64",
        "StandaloneOSX",
        "StandaloneWindows64"
    ];

    const listClasses = classNames(
        'absolute top-full mt-2 w-56 rounded-md shadow-lg bg-slate-600 ring-1 ring-black ring-opacity-5 transition-opacity transition-transform duration-500 ease-out',
        {
            'opacity-100 translate-y-0': isOpen,
            'opacity-0 -translate-y-4 pointer-events-none': !isOpen
        }
    );

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <Button upperCase={false} iconRight={BiSolidChevronDown} onClick={handleClick}>
                Download
            </Button>
            <div className={listClasses}>
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {platforms.map((platform) => (
                        <a
                            key={platform}
                            href={`https://unitystationfile.b-cdn.net/UnityStationDevelop/${platform}/${props.version}.zip`}
                            className="block px-4 py-2 text-sm text-blue-50 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                            onClick={handleClick}
                        >
                            {platform}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

const BuildComponent = (props: BuildProps) => {
    const { version_number, date_created, changes } = props.build;
    const changesList = populateChangeList(changes);

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
            <div className='relative mt-2 flex justify-end'>
                <DownloadBuildDropdown version={version_number}  />
            </div>
        </Panel>
    )
}

export default BuildComponent;
