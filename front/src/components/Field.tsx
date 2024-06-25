import { Input, InputGroup, InputLeftElement, InputRightElement, ResponsiveValue, Textarea } from "@chakra-ui/react";
import { CSSProperties, HTMLInputTypeAttribute, ReactNode } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props {
    name: string,
    placeholder: string,
    register: UseFormRegister<any>,
    type?: HTMLInputTypeAttribute,
    addOn?: {
        component: ReactNode,
        orientation: 'left' | 'right'
    }
    variant?: ResponsiveValue<string>
    options?: RegisterOptions<FieldValues, string>
    isTextArea?: boolean,
    style?: CSSProperties
}

export function Field({ name, placeholder, addOn, register, options, style, type = "text", variant='outline', isTextArea = false }: Props) {
    return (
        <InputGroup>
            {addOn && addOn.orientation === 'left' &&
                <InputLeftElement pointerEvents='none'>
                    {addOn?.component}
                </InputLeftElement>
            }

            {!isTextArea && <Input {...register(name, options)} placeholder={placeholder} type={type} variant={variant} />}
            {isTextArea && <Textarea style={style} {...register(name, options)} placeholder={placeholder} resize='none' rows={4} /> }

            {addOn && addOn.orientation === 'right' &&
                <InputRightElement pointerEvents='none'>
                    {addOn?.component}
                    <Input {...register(name)} placeholder={placeholder} type={type} />
                </InputRightElement>
            }
        </InputGroup>
    );
}