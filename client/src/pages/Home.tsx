import { useState } from "react";
import { useSelector } from "react-redux";
import { ClipboardPaste, Link2, Share2 } from "lucide-react";
import type { RootState } from "../app/store";
import MyUrlsList from "../features/url/components/MyUrlsList";
import { useGetMyUrlsQuery } from "../features/url/api/urlSlice";
import Pagination from "../shared/components/common/Pagination";
import InlineSpinner from "../shared/components/common/InlineSpinner";
import GenerateUrlForm from "../features/url/components/GenerateUrlForm";
import GeneratedUrlCard from "../features/url/components/GeneratedUrlCard";

const STEPS = [
  { icon: ClipboardPaste, title: "Paste", text: "Drop in any long HTTP or HTTPS link." },
  { icon: Link2, title: "Generate", text: "We create a clean, shareable URL for you." },
  { icon: Share2, title: "Share", text: "Copy it with one click and send it anywhere." },
] as const;

export default function Home() {
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isLoggedIn = !!accessToken;

  const { data, isLoading, isFetching, isError, refetch } = useGetMyUrlsQuery(page, {
    skip: !isLoggedIn,
  });

  const handleGenerated = (url: string) => {
    setGeneratedUrl(url);
    if (page !== 1) setPage(1);
  };

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
        <GenerateUrlForm onGenerated={handleGenerated} />
      </section>

      {generatedUrl && <GeneratedUrlCard key={generatedUrl} url={generatedUrl} />}

      {isLoggedIn && (
        <section className="overflow-hidden rounded-xl border border-surface-border bg-surface">
          <h2 className="border-b border-surface-border px-5 py-3.5 text-sm font-semibold text-text-primary">
            My URLs
          </h2>

          {isLoading ? (
            <InlineSpinner />
          ) : isError ? (
            <div className="flex flex-col items-center gap-3 px-5 py-8 text-center">
              <p className="text-sm text-error-text">Couldn't load your URLs.</p>
              <button
                type="button"
                onClick={() => refetch()}
                className="rounded-lg border border-surface-border bg-surface-hover px-3 py-1.5 text-xs font-medium text-text-muted transition-colors hover:bg-surface-border-strong hover:text-accent-hover"
              >
                Try again
              </button>
            </div>
          ) : (
            <>
              <div className={isFetching ? "opacity-60 transition-opacity" : ""}>
                <MyUrlsList urls={data?.data ?? []} />
              </div>

              {data && data.totalPages > 0 && (
                <Pagination
                  page={page}
                  totalPages={data.totalPages}
                  totalItem={data.total}
                  whichItem="URLs"
                  onDecrease={() => setPage((p) => Math.max(1, p - 1))}
                  onIncrease={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                />
              )}
            </>
          )}
        </section>
      )}

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