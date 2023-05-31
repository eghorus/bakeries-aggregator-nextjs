import {
  Button,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type ModalProps = {
  onClose: () => void;
  heading: string;
  body: string;
};

const Modal = ({ onClose, heading, body }: ModalProps) => {
  const status = heading.toLowerCase().includes("success")
    ? "success"
    : heading.toLowerCase().includes("error")
    ? "error"
    : "info";
  const statusColor = status === "success" ? "green.500" : status === "error" ? "red.500" : "primary.500";

  return (
    <ChakraModal isOpen={!!heading} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent borderTop="4px" borderColor="primary.200" borderRadius="xl">
        <ModalHeader py="2" borderBottom="1px" borderColor="primary.200" color={statusColor} textAlign="center">
          {heading}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
