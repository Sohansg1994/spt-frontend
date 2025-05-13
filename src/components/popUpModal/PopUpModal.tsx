import { InformationCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import ReactDOM from "react-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function PopUpModal({ onClose, open, children }: Props) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-surface rounded-lg shadow-lg w-fit p-6">
        <div className="flex justify-between mb-5">
          <div className="bg-status-green w-10 h-10 flex items-center justify-center rounded-full">
            <InformationCircleIcon className="w-6 h-6 text-typography-primary" />
          </div>
          <button
            onClick={onClose}
            className="text-typography-primary hover:font-semibold focus:outline-none transform transition-transform duration-200 hover:scale-125"
          >
            ✕
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}
