'use client';
import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

function CopyableCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context); the command stays selectable.
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 normal-case">
      <code className="text-xs text-gray-300 bg-gray-800 rounded px-2 py-1 select-all">{command}</code>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? 'Command copied' : 'Copy install command'}
        className="p-1 rounded text-gray-400 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
      >
        {copied ? <FiCheck className="w-4 h-4" aria-hidden /> : <FiCopy className="w-4 h-4" aria-hidden />}
      </button>
    </div>
  );
}

export default CopyableCommand;
