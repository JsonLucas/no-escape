import { Box, Flex, HStack, Stack, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoIosMoon, IoIosSunny } from "react-icons/io";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { toggleColorMode, colorMode } = useColorMode();
    
    return (
        <Flex w='100%' h='75px' bgColor='lightgrey' alignItems='center' justifyContent='space-between'>
            <Box ml='20px' onClick={toggleColorMode} cursor='pointer'>
                {colorMode === "dark" 
                    ? <IoIosSunny title="Mudar para modo escuro" color='orange' size={25} /> 
                    : <IoIosMoon title="Mudar para modo claro" color='black' size={25} />
                }
            </Box>
            <HStack p='20px' justifySelf='flex-end' pos='relative'>
                <Flex alignItems='center' justifyContent='center' w='50px' h='50px' borderRadius='50%' bgColor='grey'>
                    <FaRegUser size={25} />
                </Flex>
                <IoIosArrowDown size={23} className="arrow-menu" cursor='pointer' onClick={() => setIsMenuOpen(!isMenuOpen)} />
                {isMenuOpen && <Stack pos='absolute' left='-10px' top='90%' p='5px' bgColor='lightgrey' spacing={5} borderRadius='10px'>
                        <Box>Configurações</Box>
                        <Box>Sair</Box>
                    </Stack>
                }
            </HStack>
        </Flex>
    );
}