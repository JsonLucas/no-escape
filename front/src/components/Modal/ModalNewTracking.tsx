import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { Field } from "../Field";
import { useForm } from "react-hook-form";
import { IoCarOutline } from "react-icons/io5";
import { BsCreditCard2Front } from "react-icons/bs";
import { Track } from "../../interfaces/Track";
import { zodResolver } from "@hookform/resolvers/zod";
import { trackingSchema } from "../../utils/schemas";

interface Props {
    isOpen: boolean,
    onClose: () => void;
}

export function ModalNewTracking({ isOpen, onClose }: Props) {
    const { register, handleSubmit, reset } = useForm({ defaultValues: {} as Track, resolver: zodResolver(trackingSchema) });
    const saveTrack = async (data: any) => {
        try {
            console.log(data);
        } catch (e: any) {
            console.log(e);
        }
    }

    const onCancel = () => {
        reset();
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Cadastrar Rastreio</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Field
                        name='vehicleName'
                        placeholder='Veículo. . .'
                        register={register}
                        variant='flushed'
                        addOn={{
                            orientation: 'left',
                            component: <IoCarOutline />
                        }}
                    />
                    <Field
                        name='vehiclePlate'
                        placeholder='Placa do veículo. . .'
                        register={register}
                        variant='flushed'
                        addOn={{
                            orientation: 'left',
                            component: <BsCreditCard2Front />
                        }}
                    />
                    <Field
                        name='description'
                        placeholder='Descrição. . .'
                        register={register}
                        isTextArea={true}
                        style={{ marginTop: '15px' }}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button variant='ghost' onClick={onCancel}>Cancelar</Button>
                    <Button variant='outline' ml='5px' onClick={handleSubmit(saveTrack)}>Salvar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}