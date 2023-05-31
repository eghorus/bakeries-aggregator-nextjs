import { MouseEventHandler, useState } from "react";
import ConfirmModal from "@/components/confirm-modal";

const useConfirmModal = (onConfirm: MouseEventHandler<HTMLButtonElement>) => {
  type ModalState = { heading: string; message: string; confirmButtonTitle?: string };
  const initialModalState: ModalState = { heading: "", message: "", confirmButtonTitle: "" };
  const [confirmModalState, setConfirmModalState] = useState(initialModalState);

  const onClose = () => {
    setConfirmModalState(initialModalState);
  };

  const ConfirmModalComponent = () => (
    <ConfirmModal
      heading={confirmModalState.heading}
      message={confirmModalState.message}
      confirmButtonTitle={confirmModalState.confirmButtonTitle}
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );

  return { openConfirmModal: setConfirmModalState, ConfirmModalComponent };
};

export default useConfirmModal;
