import { useEffect, useRef, useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";

interface GeneratedUrlCardProps {
  url: string;
}

const COPIED_RESET_MS = 2000;

export default function GeneratedUrlCard({ url }: GeneratedUrlCardProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      timeoutRef.current = window.setTimeout(() => setCopied(false), COPIED_RESET_MS);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-xl border border-accent/40 bg-accent-tint p-5">
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-accent-tint-text">
        Your generated URL
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-surface-border bg-bg-raised px-4 py-2.5 text-sm text-text-primary hover:border-accent"
        >
          <span className="truncate">{url}</span>
          <ExternalLink size={14} className="shrink-0 text-text-muted" />
        </a>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-text-on-accent transition-colors duration-200 hover:bg-accent-hover"
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}