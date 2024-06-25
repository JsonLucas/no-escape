import { Button, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Field } from "../components/Field";
import { Container } from "../components/Container";
import { CiMail } from "react-icons/ci";
import { MdLockOutline } from "react-icons/md";
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from "../utils/schemas";

export function Login() {
    const { register, handleSubmit } = useForm({ resolver: zodResolver(signUpSchema)});

    const signUp = async (data: any) => {
        try {
            console.log(data);
        } catch (e: any) {
            console.log(e);
        }
    }

    return (
        <Container classList={['align-items-center', 'justify-content-center', 'flex']}>
            <Stack borderRadius='10px' w='30%' p='10px' boxShadow='0px 1px 10px 0px rgba(0, 0, 0, 0.5)'>
                <Field
                    name='email'
                    placeholder='Email. . .'
                    register={register}
                    variant='flushed'
                    addOn={{
                        orientation: 'left',
                        component: <CiMail />
                    }}
                />
                <Field
                    name='password'
                    placeholder='Password. . .'
                    register={register}
                    type='password'
                    variant='flushed'
                    addOn={{
                        orientation: 'left',
                        component: <MdLockOutline />
                    }}
                />
                <Button onClick={handleSubmit(signUp)} mt='20px' colorScheme='green.300' variant='outline'>
                    Entrar
                </Button>
            </Stack>
        </Container>
    );
}