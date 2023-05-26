import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type AuthResponseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  heading: string;
  body: string;
};

export default function AuthResponseModal({ isOpen, onClose, heading, body }: AuthResponseModalProps) {
  const statusColor = heading.toLowerCase() === "success" ? "green.500" : "red.500";

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent borderTop="4px" borderColor="primary.500">
        <ModalHeader
          py="2"
          borderBottom="1px"
          borderColor="blackAlpha.200"
          color={statusColor}
          textAlign="center"
          textTransform="capitalize"
        >
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
    </Modal>
  );
}
