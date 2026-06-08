'use client';
import { OsKey } from '../../types/launcherRelease';
import Capsule from '../../app/common/uiLibrary/capsule';
import { OS_META } from '../osMeta';

type Props = {
  options: OsKey[];
  detected: OsKey | null;
  onSelect: (os: OsKey) => void;
};

export default function OsSwitcher({ options, detected, onSelect }: Props) {
  return (
    <div className="flex items-center gap-4 text-sm text-gray-400">
      <span>On a different OS?</span>
      {options.map((os) => {
        const { label, Icon } = OS_META[os];
        return (
          <button
            key={os}
            type="button"
            onClick={() => onSelect(os)}
            aria-label={`Show ${label} downloads`}
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded uppercase text-gray-400 transition-colors hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          >
            <Icon className="w-4 h-4" aria-hidden />
            <span>{label}</span>
            {os === detected && <Capsule text="Detected" colour="blue" />}
          </button>
        );
      })}
    </div>
  );
}
