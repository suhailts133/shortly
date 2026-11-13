export default function InlineSpinner() {
    return (
        <div role="status" aria-label="Loading" className="flex items-center justify-center py-10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-surface-border border-t-accent" />
        </div>
    );
}