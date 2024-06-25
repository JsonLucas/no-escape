import { Box, Button, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { IoPencil, IoTrash } from "react-icons/io5";
import { ModalNewTracking } from "../components/Modal/ModalNewTracking";
import { ModalUpdateTracking } from "../components/Modal/ModalUpdateTracking";
import { Track } from "../interfaces/Track";

export function Home() {
    const [isNewTrackOpen, setIsNewTrackOpen] = useState(false);
    const [isUpdateTrackOpen, setIsUpdateTrackOpen] = useState(false);

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
                <Text textAlign='center' fontSize='23px' fontStyle='italic'>Nenhum rastreio cadastrado.</Text>
                <Stack spacing={2}>
                    <Stack spacing={0} w='100%'>
                        <Flex justifyContent='space-between'>
                            <Text>nome do veículo</Text>
                            <HStack>
                                <IoPencil onClick={() => setIsUpdateTrackOpen(true)} size={19} cursor='pointer' />
                                <IoTrash size={19} cursor='pointer' />
                            </HStack>
                        </Flex>
                        <Text>placa</Text>
                        <Text>descrição</Text>
                    </Stack>
                    <ModalNewTracking isOpen={isNewTrackOpen} onClose={() => setIsNewTrackOpen(false)} />
                    {/* <ModalUpdateTracking isOpen={isNewTrackOpen} onClose={() => setIsUpdateTrackOpen(false)} defaultValues={{} as Track} /> */}
                </Stack>
            </Stack>
        </Container>
    );
}