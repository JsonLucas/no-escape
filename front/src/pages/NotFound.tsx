import { Text } from '@chakra-ui/react';
import { Container } from "../components/Container";
import { useNavigate } from 'react-router-dom';

export function NotFound() {
    const navigate = useNavigate();
    return (
        <Container classList={['flex-column', 'center']}>
            <Text>Página não encontrada.</Text>
            <Text fontSize='22px' onClick={() => navigate('/')} cursor='pointer'>Voltar para a página inical.</Text>
        </Container>
    );
}