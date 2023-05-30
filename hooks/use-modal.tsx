import { useState } from "react";
import { ModalStatus } from "@/models/ModalStatus";
import Modal from "@/components/modal";

const useModal = () => {
  const modalDefaultState = { isModalOpen: false, status: "" as ModalStatus, heading: "", body: "" };
  const [modalState, setModalState] = useState(modalDefaultState);

  const ModalComponent = () => {
    return (
      <Modal
        isOpen={modalState.isModalOpen}
        onClose={() => setModalState(modalDefaultState)}
        status={modalState.status}
        heading={modalState.heading}
        body={modalState.body}
      />
    );
  };

  return { ModalComponent, modalState, setModalState };
};

export default useModal;
