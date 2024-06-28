import { Flex, Box, Stack, Text, HStack, Button, Spinner } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Field } from "../components/Field";
import { useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { MdLockOutline, MdOutlineLockPerson, MdOutlinePhone } from "react-icons/md";
import { IoPencil, IoCameraOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "../utils/schemas";
import { useProfile } from "../hooks/useProfile";

export function Profile() {
    const { profile, update } = useProfile();
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({ resolver: zodResolver(updateProfileSchema) });
    const [isEnabled, setIsEnabled] = useState(false);

    const updateProfile = async (data: any) => {
        try {
            console.log(data);
            await update({ ...data, id: profile.data.id });
        } catch (e: any) {
            console.log(e);
        }
    }

    useEffect(() => {
        console.log(errors);
    }, [errors]);

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
                    {profile.isLoading && <Spinner />}
                    {profile.data && <>
                        <Field
                            name='name'
                            placeholder='Name. . .'
                            register={register}
                            variant='flushed'
                            defaultValue={profile.data.name}
                            leftAddOn={<FaRegUser />}
                            options={{ disabled: !isEnabled }}
                        />
                        <Field
                            name='email'
                            placeholder='Email. . .'
                            register={register}
                            variant='flushed'
                            defaultValue={profile.data.email}
                            leftAddOn={<CiMail />}
                            readOnly={true}
                        />
                        <Field
                            name='phone'
                            placeholder='Phone. . .'
                            register={register}
                            defaultValue={profile.data.phone}
                            variant='flushed'
                            leftAddOn={<MdOutlinePhone />}
                            readOnly={true}
                        />
                        {isEnabled && <>
                            <Field
                                name='password'
                                placeholder='Password. . .'
                                register={register}
                                variant='flushed'
                                leftAddOn={<MdLockOutline />}
                                options={{ disabled: !isEnabled }}
                            />
                            <Field
                                name='confirmPassword'
                                placeholder='Confirm Password. . .'
                                register={register}
                                variant='flushed'
                                leftAddOn={<MdOutlineLockPerson />}
                            />
                            <Button mt='10px' variant='outline' onClick={handleSubmit(updateProfile)}>Atualizar Dados</Button>
                        </>}
                    </>}
                </Stack>
            </Flex>
        </Container>
    );
}