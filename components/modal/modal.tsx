import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonProps,
} from "@chakra-ui/react";

type ModalProps = {
  heading: string;
  bodyComponent: React.ReactNode;
  confirmButtonProps: ButtonProps;
  closeButtonTitle: string;
  onClose: () => void;
};

const Modal = ({ heading, bodyComponent, confirmButtonProps, closeButtonTitle, onClose }: ModalProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog isOpen={!!heading && !!bodyComponent} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {heading}
          </AlertDialogHeader>

          <AlertDialogBody>{bodyComponent}</AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme="secondary" ref={cancelRef} onClick={onClose}>
              {closeButtonTitle}
            </Button>
            {confirmButtonProps && (
              <Button ml={4} {...confirmButtonProps}>
                {confirmButtonProps.children}
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Modal;
