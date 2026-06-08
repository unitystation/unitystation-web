import { LauncherRelease, OsKey } from '../../types/launcherRelease';
import HeroDownloadLink from '../atoms/HeroDownloadLink';
import AltDownloadLink from '../atoms/AltDownloadLink';
import CopyableCommand from '../atoms/CopyableCommand';
import QuietExternalLink from '../atoms/QuietExternalLink';
import PackageOption from './PackageOption';

type Props = {
  os: OsKey;
  release: LauncherRelease;
  linuxRecommended?: 'aur' | 'deb' | 'rpm';
};

export default function VariantsPanel({ os, release, linuxRecommended }: Props) {
  if (os === 'win') {
    const { recommended, alternatives } = release.platforms.windows;
    return (
      <div className="flex flex-col items-center gap-3">
        {recommended && <HeroDownloadLink variant={recommended} />}
        {recommended && <p className="text-xs text-gray-400">{recommended.sizeMB} MB</p>}
        <div className="flex flex-col items-center gap-2">
          {alternatives.map((v) => (
            <AltDownloadLink key={v.url} variant={v} />
          ))}
        </div>
      </div>
    );
  }

  if (os === 'mac') {
    const { recommended, note } = release.platforms.mac;
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        {recommended && <HeroDownloadLink variant={recommended} />}
        {recommended && <p className="text-xs text-gray-400">{recommended.sizeMB} MB</p>}
        <p className="text-xs text-amber-400 max-w-sm">{note}</p>
      </div>
    );
  }

  // linux: every option is an equal-width row so deb, rpm and AUR read as peers.
  const { deb, rpm, aur } = release.platforms.linux;
  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm">
      <p className="text-sm text-gray-400">Choose your Linux package</p>

      {deb && (
        <PackageOption href={deb.url} recommended={linuxRecommended === 'deb'}>
          <span>{deb.label} · {deb.sizeMB} MB</span>
        </PackageOption>
      )}

      {rpm && (
        <PackageOption href={rpm.url} recommended={linuxRecommended === 'rpm'}>
          <span>{rpm.label} · {rpm.sizeMB} MB</span>
        </PackageOption>
      )}

      <PackageOption recommended={linuxRecommended === 'aur'}>
        <span>Arch Linux (AUR)</span>
        <CopyableCommand command={aur.cmd} />
        <QuietExternalLink href={aur.pageUrl} className="normal-case">
          View on AUR
        </QuietExternalLink>
      </PackageOption>
    </div>
  );
}
