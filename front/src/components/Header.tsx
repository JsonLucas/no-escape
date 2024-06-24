import { Box, Flex, HStack, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <Flex w='100%' h='75px' bgColor='lightgrey' alignItems='center'>
            <HStack p='20px' justifySelf='flex-end' pos='relative'>
                <Flex alignItems='center' justifyContent='center' w='50px' h='50px' borderRadius='50%' bgColor='grey'>
                    <FaRegUser size={25} />
                </Flex>
                <IoIosArrowDown size={23} className="arrow-menu" cursor='pointer' onClick={() => setIsMenuOpen(!isMenuOpen)} />
                {isMenuOpen && <Stack pos='absolute' top='90%' p='5px' bgColor='lightgrey' spacing={5} borderRadius='10px'>
                        <Box p='5px'>Configurações</Box>
                        <Box p='5px'>Sair</Box>
                    </Stack>
                }
            </HStack>
        </Flex>
    );
}