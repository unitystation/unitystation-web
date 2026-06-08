import type { IconType } from 'react-icons';
import { FaWindows, FaApple, FaLinux } from 'react-icons/fa';
import { OsKey } from '../types/launcherRelease';

export const OS_META: Record<OsKey, { label: string; Icon: IconType }> = {
  win: { label: 'Windows', Icon: FaWindows },
  mac: { label: 'macOS', Icon: FaApple },
  linux: { label: 'Linux', Icon: FaLinux },
};

export const OS_ORDER: OsKey[] = ['win', 'mac', 'linux'];
