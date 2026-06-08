import type { ReactNode } from 'react';
import CornerBadge from '../atoms/CornerBadge';

// One shared row style so every option lines up at the same width and weight.
const BASE =
  'relative w-full flex flex-col items-center justify-center gap-2 py-3 px-4 text-sm uppercase ' +
  'border-2 border-gray-800 bg-gray-800 bg-opacity-30 text-white transition-colors';

// Added when the row is itself the action (a download link).
const LINK =
  'hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900';

type Props = {
  recommended?: boolean;
  /** When set, the whole row is the download link; otherwise it is a container. */
  href?: string;
  children: ReactNode;
};

export default function PackageOption({ recommended, href, children }: Props) {
  const badge = recommended ? <CornerBadge text="Recommended" /> : null;

  if (href) {
    return (
      <a href={href} className={`${BASE} ${LINK}`}>
        {children}
        {badge}
      </a>
    );
  }

  return (
    <div className={BASE}>
      {children}
      {badge}
    </div>
  );
}
