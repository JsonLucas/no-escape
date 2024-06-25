import { Flex, Box, Stack, Text, HStack, Button } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Field } from "../components/Field";
import { useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { MdLockOutline, MdOutlineLockPerson, MdOutlinePhone } from "react-icons/md";
import { IoPencil, IoCameraOutline } from "react-icons/io5";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../utils/schemas";

export function Profile() {
    const { register, handleSubmit } = useForm({ resolver: zodResolver(signUpSchema) });
    const [isEnabled, setIsEnabled] = useState(false);

    const updateData = async (data: any) => {
        try {
            console.log(data);
        } catch (e: any) {
            console.log(e);
        }
    }

    return (
        <Container classList={['flex', 'flex-column', 'align-items-center']}>
            <Header />
            <Flex w='50%' m='5% auto' justifyContent='space-between'>
                <Stack>
                    <Box h='20rem' w='20rem' borderRadius='50%' bgColor='white' position='relative'>
                        <HStack position='absolute' justifyContent='center' alignItems='end' bg='linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.9))' w='100%' h='100%' top='0' borderRadius='50%'>
                            <Flex mb='1.5rem'>
                                <IoCameraOutline size={22} />
                                <Text ml='5px'>Alterar foto</Text>
                            </Flex>
                        </HStack>
                    </Box>
                    <Flex justifyContent='center'>
                        <HStack alignItems='center' w='auto' cursor='pointer' onClick={() => setIsEnabled(!isEnabled)}>
                            <IoPencil size={22} />
                            <Text>Editar</Text>
                        </HStack>
                    </Flex>
                </Stack>
                <Stack justifyContent='center' w='55%'>
                    <Field
                        name='name'
                        placeholder='Name. . .'
                        register={register}
                        variant='flushed'
                        addOn={{
                            orientation: 'left',
                            component: <FaRegUser />
                        }}
                        options={{ disabled: !isEnabled }}
                    />
                    <Field
                        name='email'
                        placeholder='Email. . .'
                        register={register}
                        variant='flushed'
                        addOn={{
                            orientation: 'left',
                            component: <CiMail />
                        }}
                        options={{ disabled: true }}
                    />
                    <Field
                        name='phone'
                        placeholder='Phone. . .'
                        register={register}
                        variant='flushed'
                        addOn={{
                            orientation: 'left',
                            component: <MdOutlinePhone />
                        }}
                        options={{ disabled: true }}
                    />
                    <Field
                        name='password'
                        placeholder='Password. . .'
                        register={register}
                        variant='flushed'
                        addOn={{
                            orientation: 'left',
                            component: <MdLockOutline />
                        }}
                        options={{ disabled: !isEnabled }}
                    />
                    {isEnabled && <>
                        <Field
                            name='confirmPassword'
                            placeholder='Confirm Password. . .'
                            register={register}
                            variant='flushed'
                            addOn={{
                                orientation: 'left',
                                component: <MdOutlineLockPerson />
                            }}
                        />
                        <Button mt='10px' variant='outline' onClick={handleSubmit(updateData)}>Atualizar Dados</Button>
                    </>}
                </Stack>
            </Flex>
        </Container>
    );
}