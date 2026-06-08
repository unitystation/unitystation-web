import GithubReleaseResponse, { Asset } from '../types/githubReleaseResponse';
import {
  LauncherRelease,
  DownloadVariant,
} from '../types/launcherRelease';
import { AUR_INSTALL_CMD, AUR_PAGE_URL } from './urlContants';

const MAC_INTEL_NOTE =
  'This build is for Apple Silicon (M-series) Macs. We do not ship a prebuilt Intel download, so check the GitHub repo if you need one.';

function bytesToMB(size: number): number {
  return Math.round((size / 1048576) * 10) / 10;
}

function variant(asset: Asset | undefined, label: string): DownloadVariant | undefined {
  if (!asset) return undefined;
  return { label, url: asset.browser_download_url, sizeMB: bytesToMB(asset.size) };
}

function find(assets: Asset[], predicate: (name: string) => boolean): Asset | undefined {
  return assets.find((a) => predicate(a.name.toLowerCase()));
}

function mapLauncherRelease(raw: GithubReleaseResponse): LauncherRelease {
  const assets = raw.assets;

  const winInstaller = find(assets, (n) => n.includes('setup') && n.endsWith('.exe'));
  const winPortable = find(assets, (n) => n.includes('portable') && n.endsWith('.zip'));
  const macDmg = find(assets, (n) => n.endsWith('.dmg'));
  const linuxDeb = find(assets, (n) => n.endsWith('.deb'));
  const linuxRpm = find(assets, (n) => n.endsWith('.rpm'));

  return {
    version: raw.tag_name,
    releasesPageUrl: raw.html_url,
    platforms: {
      windows: {
        recommended: variant(winInstaller, 'Installer (.exe)'),
        alternatives: [variant(winPortable, 'Portable (.zip)')].filter(
          (v): v is DownloadVariant => v !== undefined,
        ),
      },
      mac: {
        recommended: variant(macDmg, 'Apple Silicon (.dmg)'),
        note: MAC_INTEL_NOTE,
      },
      linux: {
        deb: variant(linuxDeb, 'Debian / Ubuntu (.deb)'),
        rpm: variant(linuxRpm, 'Fedora / SUSE (.rpm)'),
        aur: { cmd: AUR_INSTALL_CMD, pageUrl: AUR_PAGE_URL },
      },
    },
  };
}

export default mapLauncherRelease;
