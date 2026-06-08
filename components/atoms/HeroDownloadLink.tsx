import { BiSolidDownload } from 'react-icons/bi';
import { DownloadVariant } from '../../types/launcherRelease';

// Mirrors the filled Button/LinkButton tokens (gray-800, square, uppercase) so the
// primary download reads as part of the site rather than a one-off blue CTA.
function HeroDownloadLink({ variant }: { variant: DownloadVariant }) {
  return (
    <a
      href={variant.url}
      className="uppercase flex items-center justify-center gap-3 py-3 px-6 text-lg bg-gray-800 border-2 border-transparent text-white transition-colors hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
    >
      <BiSolidDownload className="w-7 h-7" aria-hidden />
      <span>Download · {variant.label}</span>
    </a>
  );
}

export default HeroDownloadLink;
