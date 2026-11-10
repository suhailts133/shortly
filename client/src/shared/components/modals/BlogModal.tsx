import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Calendar, User } from "lucide-react";
import type { BlogsDTO } from "../../../features/url/type/blog.interface";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    blog: BlogsDTO;
    showAuthor?: boolean;
};

export default function BlogModal({ isOpen, onClose, blog, showAuthor = true }: Props) {
    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKeyDown);

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/60 backdrop-blur-md"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={blog.title}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl max-h-[90vh] bg-surface rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in duration-200"
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-3 right-3 z-10 inline-flex items-center justify-center text-text-muted bg-surface hover:bg-surface-hover hover:text-accent-hover border border-surface-border hover:border-surface-border-strong rounded-lg p-2 transition-all duration-200"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="h-56 sm:h-72 shrink-0 overflow-hidden bg-surface-hover">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-6 sm:p-8 overflow-y-auto">
                    <h2 className="text-3xl font-semibold text-accent mb-3 font-Dynalight-Regular">
                        {blog.title}
                    </h2>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted mb-5">
                        {showAuthor && blog.userName && (
                            <span className="inline-flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5" />
                                {blog.userName}
                            </span>
                        )}
                        <span className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {blog.createdAt}
                        </span>
                    </div>

                    <div className="h-px bg-surface-border mb-5" />

                    <p className="text-sm font-dm-sans-light text-text-muted leading-relaxed whitespace-pre-line">
                        {blog.description}
                    </p>

                    <div className="pt-6 text-center">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-text-muted hover:text-text-faint text-sm font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}