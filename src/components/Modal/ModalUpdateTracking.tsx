import { Text, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { Field } from "../Field";
import { useForm } from "react-hook-form";
import { IoCarOutline } from "react-icons/io5";
import { BsCreditCard2Front } from "react-icons/bs";
import { Track } from "../../interfaces/Track";
import { zodResolver } from "@hookform/resolvers/zod";
import { trackingSchema } from "../../utils/schemas";
import { useTracking } from "../../hooks/useTracking";
import { FormError } from "../FormError";

interface Props {
    isOpen: boolean,
    onClose: () => void,
    id: number,
    defaultValues: Track
}

export function ModalUpdateTracking({ isOpen, onClose, defaultValues, id }: Props) {
    const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm({ defaultValues, resolver: zodResolver(trackingSchema) });
    const { updateTracking } = useTracking();
    const descriptionField = watch('description');

    const updateTrack = async (data: any) => {
        try {
            await updateTracking({ tracking: data, id });
            onClose();
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
                <ModalHeader>Atualizar Rastreio</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Field
                        name='vehicleName'
                        placeholder='Veículo. . .'
                        register={register}
                        variant='flushed'
                        leftAddOn={<IoCarOutline />}
                    />
                    {errors.vehicleName && <FormError error={errors.vehicleName.message?.toString() ?? ""} />}
                    <Field
                        name='vehiclePlate'
                        placeholder='Placa do veículo. . .'
                        register={register}
                        variant='flushed'
                        leftAddOn={<BsCreditCard2Front />}
                    />
                    {errors.vehiclePlate && <FormError error={errors.vehiclePlate.message?.toString() ?? ""} />}
                    <Field
                        name='description'
                        placeholder='Descrição. . .'
                        register={register}
                        isTextArea={true}
                        style={{ marginTop: '15px' }}
                    />
                    <Text w='100%' textAlign='right' color={(descriptionField && descriptionField.length > 100) ? 'red.300' : 'auto'}>
                        {(descriptionField && descriptionField.length) ?? "0"}/100 catacteres
                    </Text>
                    {errors.description && <FormError error={errors.description.message?.toString() ?? ""} />}
                </ModalBody>
                <ModalFooter>
                    <Button variant='ghost' onClick={onCancel}>Cancelar</Button>
                    <Button isLoading={isSubmitting} loadingText='Carregando. . .' variant='outline' ml='5px' onClick={handleSubmit(updateTrack)}>Atualizar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}