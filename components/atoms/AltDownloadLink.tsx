import { DownloadVariant } from '../../types/launcherRelease';

// Outline Button tokens for secondary downloads, so alternatives read as real
// buttons (not decorative cards) while staying quieter than the primary action.
function AltDownloadLink({ variant }: { variant: DownloadVariant }) {
  return (
    <a
      href={variant.url}
      className="uppercase flex items-center justify-center gap-2 py-2 px-4 bg-gray-800 bg-opacity-30 border-2 border-gray-800 text-white transition-colors hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
    >
      {variant.label} · {variant.sizeMB} MB
    </a>
  );
}

export default AltDownloadLink;
