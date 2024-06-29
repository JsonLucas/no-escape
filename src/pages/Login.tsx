import { Button, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Field } from "../components/Field";
import { Container } from "../components/Container";
import { CiMail } from "react-icons/ci";
import { MdLockOutline } from "react-icons/md";
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from "../utils/schemas";
import { loginRequest } from "../api/user";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";

export function Login() {
    const { register, handleSubmit } = useForm({ resolver: zodResolver(loginSchema)});
    const { add } = useLocalStorage();
    const navigate = useNavigate();

    const login = async (data: any) => {
        try {
            // console.log(data);
            const response = await loginRequest(data);
            add('access_token', response.session);
            navigate('/home');
        } catch (e: any) {
            console.log(e);
        }
    }

    return (
        <Container>
            <Header /> 
            <Stack m='10% auto' borderRadius='10px' w='30%' p='10px' boxShadow='0px 1px 10px 0px rgba(0, 0, 0, 0.5)'>
                <Field
                    name='email'
                    placeholder='Email. . .'
                    register={register}
                    variant='flushed'
                    leftAddOn={<CiMail />}
                />
                <Field
                    name='password'
                    placeholder='Password. . .'
                    register={register}
                    type='password'
                    variant='flushed'
                    leftAddOn={<MdLockOutline />}
                />
                <Button onClick={handleSubmit(login)} mt='20px' colorScheme='green.300' variant='outline'>
                    Entrar
                </Button>
            </Stack>
        </Container>
    );
}