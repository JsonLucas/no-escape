import { Box, Button, Flex, HStack, Stack, useColorMode, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown, IoIosMoon, IoIosSunny } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useUserProfileContext } from "../context/UserProfileContext";
import { logoutRequest } from "../api/user";
import { useProfile } from "../hooks/useProfile";
import { useToast } from "../hooks/useToast";
import { useAuth } from "../context/AuthContext";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { profile, setProfile } = useUserProfileContext();
    const { isAuthenticated } = useAuth();
    const { toggleColorMode, colorMode } = useColorMode();
    const { get, remove } = useLocalStorage();
    const { pathname } = useLocation();
    const { profile: { data, isLoading } } = useProfile();
    const toast = useToast();
    const navigate = useNavigate();

    const logout = async () => {
        remove('access_token');
        try {
            await logoutRequest();
            toast({ description: 'Successfuly logged out.', status: 'success' });
        } catch (e: any) {
            let errorMessage = e.message;
            if(e.response) errorMessage = e.response.data.message;

            console.log(e);
            toast({ description: errorMessage, status: 'success' });
        }
        navigate('/');
    }

    useEffect(() => {
        setProfile({ data, isLoading });
    }, [data]);

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
                {isAuthenticated && profile.data && <>
                    <Flex alignItems='center' justifyContent='center' w='50px' h='50px' borderRadius='50%' bgColor='grey' overflow='hidden'>
                        {profile.data.picture && <Image objectFit='cover' w='100%' h='100%' src={profile.data.picture} />}
                        {!profile.data.picture && <FaRegUser size={25} />}
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