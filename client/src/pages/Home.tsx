import { useState } from "react";
import { ClipboardPaste, Link2, Share2 } from "lucide-react";
import GenerateUrlForm from "../features/url/components/GenerateUrlForm";
import GeneratedUrlCard from "../features/url/components/GeneratedUrlCard";

const STEPS = [
  { icon: ClipboardPaste, title: "Paste", text: "Drop in any long HTTP or HTTPS link." },
  { icon: Link2, title: "Generate", text: "We create a clean, shareable URL for you." },
  { icon: Share2, title: "Share", text: "Copy it with one click and send it anywhere." },
] as const;

export default function Home() {
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-10">
      <section className="text-center">
        <h1 className="mb-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          Make long links short and shareable
        </h1>
        <p className="text-base text-text-muted">
          Paste a URL below and get a clean link you can copy and share in seconds.
        </p>
      </section>

      <section className="rounded-xl border border-surface-border bg-surface p-6 md:p-8">
        <GenerateUrlForm onGenerated={setGeneratedUrl} />
      </section>

      {generatedUrl && <GeneratedUrlCard key={generatedUrl} url={generatedUrl} />}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STEPS.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-xl border border-surface-border bg-surface p-4 text-center"
          >
            <span className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-tint text-accent">
              <Icon size={17} />
            </span>
            <h3 className="mb-1 text-sm font-semibold text-text-primary">{title}</h3>
            <p className="text-xs text-text-muted">{text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}