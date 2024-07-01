import { Box, Button, Flex, HStack, Stack, useColorMode, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown, IoIosMoon, IoIosSunny } from "react-icons/io";
import { IoSettingsOutline, IoExitOutline, IoHomeOutline } from "react-icons/io5";
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
    const { isAuthenticated,setIsAuthenticated } = useAuth();
    const { toggleColorMode, colorMode } = useColorMode();
    const { remove } = useLocalStorage();
    const { pathname } = useLocation();
    const { profile: { data, isLoading } } = useProfile();
    const toast = useToast();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await logoutRequest();
            setIsAuthenticated(false);
            toast({ description: 'Successfuly logged out.', status: 'success' });
            remove('access_token');
            navigate('/');
        } catch (e: any) {
            let errorMessage = e.message;
            if (e.response) errorMessage = e.response.data.message;

            console.log(e);
            toast({ description: errorMessage, status: 'success' });
        }
    }

    useEffect(() => {
        setProfile({ data, isLoading });
    }, [data]);

    return (
        <Flex w='100%' h='75px' alignItems='center' justifyContent='space-between'>
            <Flex ml='20px' alignItems='center' cursor='pointer'>
                <Box mr='10px' onClick={toggleColorMode}>
                    {colorMode === "dark"
                        ? <IoIosSunny title="Mudar para modo escuro" color='orange' size={25} />
                        : <IoIosMoon title="Mudar para modo claro" color='black' size={25} />
                    }
                </Box>
                {isAuthenticated && <IoHomeOutline aria-label="Home page" title='Home page' size={23} onClick={() => navigate('/home')} />}
            </Flex>
            <HStack p='20px' justifySelf='flex-end' pos='relative'>
                {pathname === "/" && <Button variant='ghost' onClick={() => navigate('/sign-up')}>Cadastre-se</Button>}
                {pathname.includes('sign-up') && <Button variant='ghost' onClick={() => navigate('/')}>Entrar</Button>}
                {isAuthenticated && profile.data && <HStack onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Flex alignItems='center' justifyContent='center' w='50px' h='50px' borderRadius='50%' bgColor='grey' overflow='hidden'>
                        {profile.data.picture && <Image objectFit='cover' w='100%' h='100%' src={profile.data.picture} />}
                        {!profile.data.picture && <FaRegUser size={25} />}
                    </Flex>
                    <IoIosArrowDown size={23} className="arrow-menu" cursor='pointer' />
                    {isMenuOpen &&
                        <Stack pos='absolute' zIndex={99} left='-15px' top='90%' p='5px' bgColor='grey' spacing={5} borderRadius='10px'>
                            <Flex alignItems='center' cursor='pointer' onClick={() => navigate('/profile')}>
                                <IoSettingsOutline />
                                <Text ml='5px'>Configurações</Text>
                            </Flex>
                            <Flex alignItems='center' cursor='pointer' onClick={logout}>
                                <IoExitOutline />
                                <Text ml='5px'>Sair</Text>
                            </Flex>
                        </Stack>
                    }
                </HStack>}
            </HStack>
        </Flex>
    );
}