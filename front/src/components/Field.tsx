import { Input, InputGroup, InputLeftElement, InputRightElement, ResponsiveValue } from "@chakra-ui/react";
import { HTMLInputTypeAttribute, ReactNode } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
    name: string,
    placeholder: string,
    register: UseFormRegister<FieldValues>,
    type?: HTMLInputTypeAttribute,
    addOn?: {
        component: ReactNode,
        orientation: 'left' | 'right'
    }
    variant?: ResponsiveValue<string>
}

export function Field({ name, placeholder, type = "text", variant='outline', addOn, register }: Props) {
    return (
        <InputGroup>
            {addOn && addOn.orientation === 'left' &&
                <InputLeftElement pointerEvents='none'>
                    {addOn?.component}
                </InputLeftElement>
            }

            <Input {...register(name)} placeholder={placeholder} type={type} variant={variant} />

            {addOn && addOn.orientation === 'right' &&
                <InputRightElement pointerEvents='none'>
                    {addOn?.component}
                    <Input {...register(name)} placeholder={placeholder} type={type} />
                </InputRightElement>
            }
        </InputGroup>
    );
}