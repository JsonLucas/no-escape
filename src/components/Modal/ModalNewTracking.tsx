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
    onClose: () => void;
}

export function ModalNewTracking({ isOpen, onClose }: Props) {
    const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            vehicleName: '',
            vehiclePlate: '',
            description: ''
        },
        resolver: zodResolver(trackingSchema)
    });
    const { createTracking } = useTracking();
    const descriptionField = watch('description');
    const saveTrack = async (data: any) => {
        try {
            await createTracking(data);
            reset();
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
                <ModalHeader>Cadastrar Rastreio</ModalHeader>
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
                    <Text w='100%' textAlign='right' color={descriptionField.length > 100 ? 'red.300' : 'auto'}>
                        {descriptionField.length}/100 catacteres
                    </Text>
                    {errors.description && <FormError error={errors.description.message?.toString() ?? ""} />}
                </ModalBody>
                <ModalFooter>
                    <Button variant='ghost' onClick={onCancel}>Cancelar</Button>
                    <Button isLoading={isSubmitting} loadingText='Carregando. . .' variant='outline' ml='5px' onClick={handleSubmit(saveTrack)}>Salvar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}