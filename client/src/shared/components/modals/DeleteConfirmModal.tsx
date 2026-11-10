import SubmitButton from "../form/SubmitButton"

type Props = {
    isOpen: boolean
    onConfirm: () => void
    onClose: () => void
    isLoading: boolean
    text: string
}

export default function DeleteConfirmModal({ isOpen, onConfirm, onClose, isLoading, text }: Props) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/60 backdrop-blur-md">
            <div className="relative w-full max-w-md bg-surface rounded-2xl shadow-2xl p-8 animate-in zoom-in duration-200">
                <h2 className="text-4xl font-semibold text-accent mb-6 text-center font-Dynalight-Regular">Blogs</h2>
                <div className="text-center space-y-4">
                    <p className="text-xl font-Jost-Semibold text-text-primary">Confirm Deletion?</p>
                    <p className="text-text-muted">{text}</p>

                    <form
                        className="flex flex-col gap-3 pt-6"
                        onSubmit={(e) => {
                            e.preventDefault()
                            onConfirm()
                        }}
                    >
                        <SubmitButton
                            isLoading={isLoading}
                            label="Confirm & delete"
                            loadingLabel="Deleting"
                            type="submit"
                        />
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-text-muted hover:text-text-faint text-sm font-medium"
                        >
                            Go Back
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}