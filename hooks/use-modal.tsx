import { useCallback, useState } from "react";
import Modal from "@/components/modal";
import { isAxiosError } from "axios";

const useModal = () => {
  const modalInitialState = { heading: "", body: "" };
  const [modalState, setModalState] = useState(modalInitialState);

  type HandleOpenModalArgs = {
    heading?: string;
    body?: string;
    error?: unknown;
  };

  const handleOpenModal = useCallback(({ heading, body, error }: HandleOpenModalArgs) => {
    if (error) {
      let message = "Something went wrong. Please try again.";
      if (isAxiosError(error)) message = error.response?.data.message;
      setModalState({ heading: "Error", body: message });
      return;
    }

    if (heading && body) {
      setModalState({ heading, body });
    }
  }, []);

  const ModalComponent = () => {
    return (
      <Modal onClose={() => setModalState(modalInitialState)} heading={modalState.heading} body={modalState.body} />
    );
  };

  return { ModalComponent, handleOpenModal };
};

export default useModal;
