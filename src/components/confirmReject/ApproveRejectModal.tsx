import { useState } from "react";
import PopUpModal from "../popUpModal/PopUpModal";
import Button from "../button/Button";

type ModalProps = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  message?: string;
  handleConfirm: (reason: string) => void;
  isLoading?: boolean;
  confirmButtonText?: string;
  inputLabel?: string;
  isReasonRequired?: boolean;
  isReject?: boolean;
  confirmButtonColour?:
    | "blue"
    | "red"
    | "green"
    | "yellow"
    | "white"
    | "primary"
    | "dark";
};

function ApproveRejectModal({
  modalOpen,
  setModalOpen,
  title,
  message,
  handleConfirm,
  isLoading,
  confirmButtonText,
  inputLabel,
  isReasonRequired = false,
  confirmButtonColour = "primary",
}: ModalProps) {
  const [reason, setReason] = useState("");

  const onConfirm = () => {
    handleConfirm(reason);
    setReason("");
    setModalOpen(false);
  };

  return (
    <PopUpModal open={modalOpen} onClose={() => setModalOpen(false)}>
      <div className="flex flex-col items-start w-[400px]">
        {title && (
          <h2 className="text-lg font-medium text-typography-secondary/70">
            {title}
          </h2>
        )}
        {message && <p className="my-3">{message}</p>}

        {isReasonRequired && (
          <>
            <label htmlFor="description" className="text-sm text-gray-400">
              {inputLabel}
            </label>
            <textarea
              id="description"
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="text-sm placeholder:text-typography-dark/70 placeholder:text-sm appearance-none  ring-typography-secondary/30 block w-full rounded-[8px] py-2.5 pr-10 pl-3  text-gray-900 ring-1 ring-inset focus:ring-inset sm:text-base sm:leading-6 outline-none bg-transparent"
            />
          </>
        )}
      </div>
      <div className="flex gap-5 mt-6">
        <div className="w-2/3">
          <Button
            colour={confirmButtonColour}
            className="h-8 rounded-[5px]"
            fullWidth
            onClick={onConfirm}
            disabled={isReasonRequired && !reason.trim()}
            loading={isLoading}
          >
            {confirmButtonText}
          </Button>
        </div>
        <div className="w-1/3">
          <Button
            colour="light"
            className="h-8 rounded-[5px]"
            fullWidth
            onClick={() => {
              setModalOpen(false), setReason("");
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </PopUpModal>
  );
}

export default ApproveRejectModal;
