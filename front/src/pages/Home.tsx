import { Box, Button, Flex, HStack, Spinner, Stack, Text } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { FaPlus } from "react-icons/fa6";
import { useRef, useState } from "react";
import { IoPencil, IoTrash } from "react-icons/io5";
import { ModalNewTracking } from "../components/Modal/ModalNewTracking";
import { ModalUpdateTracking } from "../components/Modal/ModalUpdateTracking";
import { ITrack, Track } from "../interfaces/Track";
import { useTracking } from "../hooks/useTracking";
import { DeleteTrackingConfirmation } from "../components/Modal/DeleteTrackingConfirmation";

export function Home() {
    const { trackings } = useTracking();
    const [isNewTrackOpen, setIsNewTrackOpen] = useState(false);
    const [isUpdateTrackOpen, setIsUpdateTrackOpen] = useState(false);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const cancelRef = useRef();

    return (
        <Container>
            <Header />
            <Stack m='5% auto' w='40%'>
                <Box>
                    <Button variant='ghost' w='auto' onClick={() => setIsNewTrackOpen(true)}>
                        <FaPlus />
                        <Text ml='5px' fontWeight='400'>Novo Rastreio</Text>
                    </Button>
                </Box>
                {trackings.isLoading && <Spinner />}
                {trackings.data && trackings.data.length === 0 && <Text textAlign='center' fontSize='23px' fontStyle='italic'>Nenhum rastreio cadastrado.</Text>}
                {trackings.data &&
                    <Stack spacing={2}>
                        {trackings.data.map((item: ITrack) =>
                            <Stack key={`${item.vehiclePlate}-${item.id}`} spacing={0} w='100%'>
                                <Flex justifyContent='space-between'>
                                    <Text>{item.vehicleName}</Text>
                                    <HStack>
                                        <IoPencil onClick={() => setIsUpdateTrackOpen(true)} size={19} cursor='pointer' />
                                        <IoTrash onClick={() => setIsDeleteConfirmationOpen(true)} size={19} cursor='pointer' />
                                    </HStack>
                                </Flex>
                                <Text>{item.vehiclePlate}</Text>
                                <Text>{(item.description && item.description.length > 0) ? item.description : 'Nenhuma descrição fornecida.'}</Text>
                                <ModalUpdateTracking isOpen={isUpdateTrackOpen} onClose={() => setIsUpdateTrackOpen(false)} id={item.id} defaultValues={item} />
                                <DeleteTrackingConfirmation isOpen={isDeleteConfirmationOpen} onClose={() => setIsDeleteConfirmationOpen(false)} cancelRef={cancelRef} tracking={item} />
                            </Stack>
                        )}
                    </Stack>
                }
                <ModalNewTracking isOpen={isNewTrackOpen} onClose={() => setIsNewTrackOpen(false)} />
            </Stack>
        </Container>
    );
}