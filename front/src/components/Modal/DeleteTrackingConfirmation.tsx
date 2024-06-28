import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { useTracking } from "../../hooks/useTracking";
import { ITrack } from "../../interfaces/Track";

interface Props {
  isOpen: boolean,
  onClose: () => void,
  cancelRef: React.MutableRefObject<any>,
  tracking: ITrack;
}

export function DeleteTrackingConfirmation({ isOpen, onClose, cancelRef, tracking }: Props) {
  const { deleteTracking } = useTracking();
  const onConfirmDelete = async () => {
    try {
      await deleteTracking(tracking.id);
      onClose();
    } catch (e: any) {
      console.log(e);
    }
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Excluir rastreamento
          </AlertDialogHeader>

          <AlertDialogBody>
            Você tem certeza que deseja excluir o rastreamento do veículo <b>{tracking.vehicleName}</b>? Essa ação é irreversível.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme='red' onClick={onConfirmDelete} ml={3}>
              Confirmar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}