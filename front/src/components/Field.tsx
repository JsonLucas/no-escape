import { Input, InputGroup, InputLeftElement, InputRightElement, ResponsiveValue, Textarea } from "@chakra-ui/react";
import { CSSProperties, HTMLInputTypeAttribute, ReactNode } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props {
    name: string,
    placeholder: string,
    register: UseFormRegister<any>,
    type?: HTMLInputTypeAttribute,
    leftAddOn?: ReactNode,
    rightAddOn?: ReactNode,
    variant?: ResponsiveValue<string>
    options?: RegisterOptions<FieldValues, string>
    isTextArea?: boolean,
    style?: CSSProperties,
    defaultValue?: string,
    readOnly?: boolean
}

export function Field({ name, placeholder, leftAddOn, rightAddOn, register, options, style, type = "text", variant='outline', isTextArea = false, defaultValue = '', readOnly = false }: Props) {
    return (
        <InputGroup>
            {leftAddOn &&
                <InputLeftElement pointerEvents='none'>
                    {leftAddOn}
                </InputLeftElement>
            }

            {!isTextArea && <Input {...register(name, { ...options })} defaultValue={defaultValue} placeholder={placeholder} type={type} variant={variant} readOnly={readOnly} />}
            {isTextArea && <Textarea style={style} {...register(name, options)} defaultValue={defaultValue} placeholder={placeholder} resize='none' rows={4} readOnly={readOnly} /> }

            {rightAddOn &&
                <InputRightElement pointerEvents='none'>
                    {rightAddOn}
                    <Input {...register(name, options)} placeholder={placeholder} defaultValue={defaultValue} type={type} readOnly={readOnly} />
                </InputRightElement>
            }
        </InputGroup>
    );
}