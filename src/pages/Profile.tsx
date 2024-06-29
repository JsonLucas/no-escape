import { Flex, Box, Stack, Text, HStack, Button, Spinner, Image } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Field } from "../components/Field";
import { useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { MdLockOutline, MdOutlineLockPerson, MdOutlinePhone } from "react-icons/md";
import { IoPencil, IoCameraOutline } from "react-icons/io5";
import { useCallback, useContext, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "../utils/schemas";
import { useProfile } from "../hooks/useProfile";
import { MdOutlineCancel } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import { MdOutlineCheck } from "react-icons/md";
import { UserProfileContext } from "../context/UserProfileContext";

type PreviewImage = {
    localUrl: string,
    file: string | ArrayBuffer
}

export function Profile() {
    const { profile, update, updateProfilePicture } = useProfile();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(updateProfileSchema) });
    const { setProfile } = useContext(UserProfileContext);
    const [isEnabled, setIsEnabled] = useState(false);
    const [image, setImage] = useState({} as PreviewImage);
    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            const previewUrl = URL.createObjectURL(file);

            reader.readAsDataURL(file);
            reader.onload = () => {
                if (reader.result) {
                    const base64Data = reader.result;
                    setImage({
                        localUrl: previewUrl,
                        file: base64Data
                    });
                }
            };
        });
    }, []);

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        onDrop,
        maxSize: 1048576,
        accept: {
            'image/*': []
        }
    });

    const updateProfile = async (data: any) => {
        try {
            await update({ ...data, id: profile.data.id });
            setIsEnabled(false);
        } catch (e: any) {
            console.log(e);
        }
    }

    const updatePicture = async () => {
        try {
            await updateProfilePicture(image.file);
            setImage({} as PreviewImage);
        } catch (e: any) {
            console.log(e);
        }
    }

    useEffect(() => {
        if(profile.data) setProfile(profile.data);
    }, [profile.data]);

    return (
        <Container classList={['flex', 'flex-column', 'align-items-center']}>
            <Header />
            <Flex w='50%' m='5% auto' justifyContent='space-between'>
                <Stack>
                    <Box h='20rem' w='20rem' borderRadius='50%' bgColor='white' position='relative' overflow='hidden'>
                        <Image 
                            objectFit='cover' 
                            w='100%' 
                            h='100%' 
                            src={image?.localUrl || (profile.data && profile.data.picture) || "" } 
                        />
                    </Box>
                    <Stack m='auto' justifyContent='center'>
                        <Flex cursor='pointer'   {...getRootProps()}>
                            <IoCameraOutline size={22} style={{ marginRight: '5px' }} />
                            <Text>Alterar foto</Text>
                            <input {...getInputProps()} multiple={false} />
                        </Flex>
                        {acceptedFiles.length > 0 && Object.keys(image).length > 0 &&
                            <Flex cursor='pointer' onClick={updatePicture}>
                                <MdOutlineCheck size={22} style={{ marginRight: '5px' }} />
                                <Text>Confirmar</Text>
                            </Flex>
                        }
                    </Stack>
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
                        <HStack m='20px auto' alignItems='center' w='auto' cursor='pointer'>
                            {isEnabled && <>
                                <MdOutlineCancel />
                                <Text onClick={() => { reset(); setIsEnabled(false) }}>Cancelar</Text>
                            </>}
                            {!isEnabled && <>
                                <IoPencil size={22} />
                                <Text onClick={() => setIsEnabled(!isEnabled)}>Editar</Text>
                            </>}
                        </HStack>
                    </>}
                </Stack>
            </Flex>
        </Container>
    );
}