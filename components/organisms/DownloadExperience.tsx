'use client';
import { useEffect, useState } from 'react';
import { BiSolidDownload } from 'react-icons/bi';
import { LauncherRelease, OsKey } from '../../types/launcherRelease';
import {
  detectPlatform,
  recommendedLinuxFormat,
  LinuxFamily,
} from '../../utils/detectPlatform';
import { OS_ORDER } from '../osMeta';
import PlatformHeading from '../molecules/PlatformHeading';
import VariantsPanel from '../molecules/VariantsPanel';
import OsSwitcher from '../molecules/OsSwitcher';
import QuietExternalLink from '../atoms/QuietExternalLink';

type Props = {
  release: LauncherRelease | null;
  fallbackUrl: string;
  initialOs?: OsKey; // server-detected platform; the client re-detects only when omitted
  initialLinuxFamily?: LinuxFamily;
};

export default function DownloadExperience({
  release,
  fallbackUrl,
  initialOs,
  initialLinuxFamily,
}: Props) {
  const [selectedOs, setSelectedOs] = useState<OsKey>(initialOs ?? 'win');
  const [linuxFamily, setLinuxFamily] = useState<LinuxFamily | undefined>(initialLinuxFamily);
  const [detected, setDetected] = useState<OsKey | null>(initialOs ?? null);

  useEffect(() => {
    if (initialOs) return;
    const info = detectPlatform();
    if (info.os !== 'unknown') {
      setSelectedOs(info.os);
      setDetected(info.os);
    }
    setLinuxFamily(info.linuxFamily);
  }, [initialOs]);

  if (!release) {
    return (
      <div className="flex justify-center mt-8">
        <a
          href={fallbackUrl}
          target="_blank"
          rel="noreferrer"
          className="uppercase flex items-center justify-center gap-3 py-3 px-6 text-lg bg-gray-800 border-2 border-transparent text-white transition-colors hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
        >
          <BiSolidDownload className="w-7 h-7" aria-hidden />
          View all downloads on GitHub
        </a>
      </div>
    );
  }

  const linuxRecommended = recommendedLinuxFormat(linuxFamily);
  const others = OS_ORDER.filter((os) => os !== selectedOs);

  return (
    <div className="flex flex-col items-center gap-8 mt-10">
      <div className="flex flex-col items-center gap-5">
        <PlatformHeading
          os={selectedOs}
          version={release.version}
          detected={selectedOs === detected}
        />
        <VariantsPanel os={selectedOs} release={release} linuxRecommended={linuxRecommended} />
      </div>

      <OsSwitcher options={others} detected={detected} onSelect={setSelectedOs} />

      <QuietExternalLink href={release.releasesPageUrl}>
        All versions &amp; release notes on GitHub
      </QuietExternalLink>
    </div>
  );
}
