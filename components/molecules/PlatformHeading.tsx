import { OsKey } from '../../types/launcherRelease';
import Capsule from '../../app/common/uiLibrary/capsule';
import { OS_META } from '../osMeta';

type Props = {
  os: OsKey;
  version: string;
  detected: boolean;
};

export default function PlatformHeading({ os, version, detected }: Props) {
  const { label, Icon } = OS_META[os];
  return (
    <div className="flex items-center gap-4">
      <Icon className="w-12 h-12 text-white" aria-hidden />
      <div className="flex flex-col items-start gap-1">
        <span className="text-3xl font-extrabold leading-none text-white">{label}</span>
        <span className="text-xs uppercase tracking-wide text-gray-400">
          Pudu Launcher · {version}
        </span>
      </div>
      {detected && <Capsule text="Detected" colour="blue" />}
    </div>
  );
}
