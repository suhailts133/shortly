import { useEffect, useRef, useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import type { MyUrls } from "../type/url.interface";

const COPIED_RESET_MS = 2000;

function UrlRow({ item }: { item: MyUrls }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.url);
      setCopied(true);
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), COPIED_RESET_MS);
    } catch {
      setCopied(false);
    }
  };

  return (
    <li className="flex flex-col gap-2 px-5 py-3.5 sm:flex-row sm:items-center sm:gap-4">
      <div className="min-w-0 flex-1">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-text-primary hover:text-accent-hover"
        >
          <span className="truncate">{item.url}</span>
          <ExternalLink size={14} className="shrink-0 text-text-muted" />
        </a>
        <a
          href={item.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={item.originalUrl}
          className="mt-0.5 block truncate text-xs text-text-faint hover:text-text-muted"
        >
          {item.originalUrl}
        </a>
      </div>

      <span className="shrink-0 text-xs text-text-faint">
        {new Date(item.date).toLocaleDateString()}
      </span>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-surface-border bg-surface-hover px-3 py-1.5 text-xs font-medium text-text-muted transition-colors duration-200 hover:bg-surface-border-strong hover:text-accent-hover"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </li>
  );
}

export default function MyUrlsList({ urls }: { urls: MyUrls[] }) {
  if (urls.length === 0) {
    return (
      <p className="px-5 py-8 text-center text-sm text-text-muted">
        You haven't generated any URLs yet.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-surface-border">
      {urls.map((item) => (
        <UrlRow key={`${item.url}-${item.date}`} item={item} />
      ))}
    </ul>
  );
}