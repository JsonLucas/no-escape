import { Button, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { Field } from "../components/Field";
import { Container } from "../components/Container";
import { CiMail } from "react-icons/ci";
import { MdOutlinePhone } from "react-icons/md";
import { MdLockOutline, MdOutlineLockPerson } from "react-icons/md";
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from "../utils/schemas";

export function SignUp() {
    const { register, handleSubmit } = useForm({ resolver: zodResolver(signUpSchema)});

    const signUp = async (data: any) => {
        try {
            console.log(data);
        } catch (e: any) {
            console.log(e);
        }
    }

    return (
        <Container classList={['center', 'flex']}>
            <Stack borderRadius='10px' w='30%' p='10px' boxShadow='0px 1px 10px 0px rgba(0, 0, 0, 0.5)'>
                <Field
                    name='name'
                    placeholder='Name. . .'
                    register={register}
                    variant='flushed'
                    addOn={{
                        orientation: 'left',
                        component: <FaRegUser />
                    }}
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
                />
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
                <Button onClick={handleSubmit(signUp)} mt='20px' colorScheme='green.300' variant='outline'>
                    Sign Up
                </Button>
            </Stack>
        </Container>
    );
}