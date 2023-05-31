import { useState } from "react";
import Modal from "./modal";

const useModal = () => {
  const initialModalState = {
    heading: "",
    bodyComponent: <div></div>,
    confirmButtonProps: {},
    closeButtonTitle: "",
  };
  const [modalState, setModalState] = useState(initialModalState);
  const { heading, bodyComponent, confirmButtonProps, closeButtonTitle } = modalState;

  const handleCloseModal = () => setModalState(initialModalState);

  const ModalComponent = () => {
    return (
      <Modal
        heading={heading}
        bodyComponent={bodyComponent}
        confirmButtonProps={confirmButtonProps}
        closeButtonTitle={closeButtonTitle}
        onClose={handleCloseModal}
      />
    );
  };

  return { setModalState, ModalComponent };
};

export default useModal;
