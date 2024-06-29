import { Box, Button, Flex, HStack, Stack, useColorMode, Image } from "@chakra-ui/react";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown, IoIosMoon, IoIosSunny } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useUserProfileContext } from "../context/UserProfileContext";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { profile } = useUserProfileContext();
    const { toggleColorMode, colorMode } = useColorMode();
    const { get, remove } = useLocalStorage();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const logout = async () => {
        navigate('/');
        remove('access_token');
    }

    return (
        <Flex w='100%' h='75px' alignItems='center' justifyContent='space-between'>
            <Box ml='20px' onClick={toggleColorMode} cursor='pointer'>
                {colorMode === "dark"
                    ? <IoIosSunny title="Mudar para modo escuro" color='orange' size={25} />
                    : <IoIosMoon title="Mudar para modo claro" color='black' size={25} />
                }
            </Box>
            <HStack p='20px' justifySelf='flex-end' pos='relative'>
                {pathname === "/" && <Button variant='ghost' onClick={() => navigate('/sign-up')}>Cadastre-se</Button>}
                {pathname.includes('sign-up') && <Button variant='ghost' onClick={() => navigate('/')}>Entrar</Button>}
                {get('access_token') && <>
                    <Flex alignItems='center' justifyContent='center' w='50px' h='50px' borderRadius='50%' bgColor='grey' overflow='hidden'>
                        {profile.picture && <Image objectFit='cover' w='100%' h='100%' src={profile.picture} />}
                        {!profile.picture && <FaRegUser size={25} />}
                    </Flex>
                    <IoIosArrowDown size={23} className="arrow-menu" cursor='pointer' onClick={() => setIsMenuOpen(!isMenuOpen)} />
                    {isMenuOpen && <Stack pos='absolute' left='-10px' top='90%' p='5px' bgColor='lightgrey' spacing={5} borderRadius='10px'>
                        <Box cursor='pointer' onClick={() => navigate('/profile')}>Configurações</Box>
                        <Box cursor='pointer' onClick={logout}>Sair</Box>
                    </Stack>
                    }
                </>}
            </HStack>
        </Flex>
    );
}