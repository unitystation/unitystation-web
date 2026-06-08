import React from 'react';
import { headers } from 'next/headers';
import PageHeading from '../common/uiLibrary/PageHeading';
import { LauncherRelease } from '../../types/launcherRelease';
import { GITHUB_RELEASES_URL, LAUNCHER_REPO_URL } from '../../utils/urlContants';
import mapLauncherRelease from '../../utils/launcherRelease';
import { detectPlatform } from '../../utils/detectPlatform';
import fetchLatestRelease from './fetchLatestRelease';
import DownloadExperience from '../../components/organisms/DownloadExperience';
import QuietExternalLink from '../../components/atoms/QuietExternalLink';

export const metadata = {
  title: 'Download · Unitystation',
  description: 'Download the Pudu Launcher and start playing Unitystation.',
};

const DownloadPage = async () => {
  let release: LauncherRelease | null = null;
  try {
    release = mapLauncherRelease(await fetchLatestRelease());
  } catch {
    release = null;
  }

  // Detect the platform on the server from the request so the right OS is in the
  // first paint. The client effect only re-runs when this comes back unknown.
  const userAgent = (await headers()).get('user-agent') ?? undefined;
  const platform = detectPlatform(userAgent);
  const initialOs = platform.os === 'unknown' ? undefined : platform.os;

  return (
    <div className="flex flex-col items-center text-center px-4 py-12">
      <PageHeading isCentered>Download Pudu Launcher</PageHeading>
      <p className="max-w-xl text-gray-400">
        The Pudu Launcher keeps your game up to date and gets you into a round quickly.
        We&apos;ve highlighted the build for your system below.
      </p>

      <DownloadExperience
        release={release}
        fallbackUrl={GITHUB_RELEASES_URL}
        initialOs={initialOs}
        initialLinuxFamily={platform.linuxFamily}
      />

      <QuietExternalLink href={LAUNCHER_REPO_URL} className="mt-10">
        View the launcher source on GitHub
      </QuietExternalLink>
    </div>
  );
};

export default DownloadPage;
