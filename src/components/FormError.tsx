import { Text } from "@chakra-ui/react";

interface Props {
    error: string
}

export function FormError({ error }: Props) {
    return (
        <Text color='red.300' w='100%'>{error}</Text>
    );
}