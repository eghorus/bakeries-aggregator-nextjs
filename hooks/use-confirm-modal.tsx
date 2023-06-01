import { MouseEventHandler, useCallback, useState } from "react";
import { isAxiosError } from "axios";
import ConfirmModal from "@/components/elements/confirm-modal";

const useConfirmModal = (onConfirm?: MouseEventHandler<HTMLButtonElement>) => {
  type ModalState = { heading: string; message: string; confirmButtonTitle?: string; error?: unknown };
  type onOpenProps = { heading?: string; message?: string; confirmButtonTitle?: string; error?: unknown };
  const initialModalState: ModalState = { heading: "", message: "", confirmButtonTitle: "" };
  const [confirmModalState, setConfirmModalState] = useState(initialModalState);

  const onOpen = useCallback(({ heading, message, confirmButtonTitle, error }: onOpenProps) => {
    if (error) {
      let message = "Something went wrong. Please try again.";
      if (isAxiosError(error)) message = error.response?.data.message;
      setConfirmModalState({ heading: "Error", message });
      return;
    }

    if (heading && message) {
      setConfirmModalState({ heading, message, confirmButtonTitle });
    }
  }, []);

  const onClose = () => {
    setConfirmModalState(initialModalState);
  };

  const ConfirmModalComponent = () => (
    <ConfirmModal
      heading={confirmModalState.heading}
      message={confirmModalState.message}
      confirmButtonTitle={confirmModalState.confirmButtonTitle}
      onConfirm={onConfirm ? onConfirm : () => {}}
      onClose={onClose}
    />
  );

  return { onOpen, ConfirmModalComponent };
};

export default useConfirmModal;
