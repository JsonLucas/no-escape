import { useToast as useChakraToast } from '@chakra-ui/react';

type ToastProps = {
    title?: string,
    description: string,
    colorScheme?: string,
    status: "info" | "warning" | "success" | "error" | "loading"
}

export const useToast = () => {
    const toast = useChakraToast();
    const genericToast = (options: ToastProps) => toast({
        ...options,
        duration: 3000,
        isClosable: true
    });

    return genericToast;
};