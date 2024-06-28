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
import { Header } from "../components/Header";
import { FormError } from "../components/FormError";
import { signUpRequest } from "../api/user";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export function SignUp() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(signUpSchema)});
    const { add } = useLocalStorage();
    const navigate = useNavigate();

    const signUp = async (data: any) => {
        try {
            const response = await signUpRequest(data);
            add('access_token', response.session);
            navigate('/home')
        } catch (e: any) {
            console.log(e);
        }
    }

    return (
        <Container>
            <Header />
            <Stack m='5% auto' borderRadius='10px' w='30%' p='10px' boxShadow='0px 1px 10px 0px rgba(0, 0, 0, 0.5)'>
                <Field
                    name='name'
                    placeholder='Name. . .'
                    register={register}
                    variant='flushed'
                    leftAddOn={<FaRegUser />}
                />
                {errors.name && <FormError error={errors.name.message?.toString() ?? ""} />}
                <Field
                    name='email'
                    placeholder='Email. . .'
                    register={register}
                    variant='flushed'
                    leftAddOn={<CiMail />}
                />
                {errors.email && <FormError error={errors.email.message?.toString() ?? ""} />}
                <Field
                    name='phone'
                    placeholder='Phone. . .'
                    register={register}
                    variant='flushed'
                    leftAddOn={<MdOutlinePhone />}
                />
                {errors.phone && <FormError error={errors.phone.message?.toString() ?? ""} />}
                <Field
                    name='password'
                    placeholder='Password. . .'
                    register={register}
                    type="password"
                    variant='flushed'
                    leftAddOn={<MdLockOutline />}
                />
                {errors.password && <FormError error={errors.password.message?.toString() ?? ""} />}
                <Field
                    name='confirmPassword'
                    placeholder='Confirm Password. . .'
                    register={register}
                    variant='flushed'
                    type="password"
                    leftAddOn={<MdOutlineLockPerson />}
                />
                {errors.confirmPassword && <FormError error={errors.confirmPassword.message?.toString() ?? ""} />}
                <Button isLoading={isSubmitting} loadingText='Enviando...' onClick={handleSubmit(signUp)} mt='20px' colorScheme='green.300' variant='outline'>
                    Sign Up
                </Button>
            </Stack>
        </Container>
    );
}