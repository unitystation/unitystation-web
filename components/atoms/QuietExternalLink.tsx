import type { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

// Opens in a new tab so it never pulls the user away from what they were doing.
function QuietExternalLink({ href, children, className = '' }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`text-xs text-gray-400 underline transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-sm ${className}`}
    >
      {children}
    </a>
  );
}

export default QuietExternalLink;
