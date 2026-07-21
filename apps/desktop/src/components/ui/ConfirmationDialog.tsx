import Dialog from "./Dialog";

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;

  confirmText?: string;
  cancelText?: string;

  variant?: "danger" | "warning";

  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmationDialog = ({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  onConfirm,
  onClose,
}: ConfirmationDialogProps) => {
  const confirmButtonClass =
    variant === "danger"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-amber-500 hover:bg-amber-600";

  return (
    <Dialog
      open={open}
      title={title}
      onClose={onClose}
      size="sm"
      footer={
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`rounded-md px-4 py-2 text-sm font-medium text-white transition ${confirmButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      }
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 text-5xl">⚠️</div>

        <p className="text-slate-700">
          {message}
        </p>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog;