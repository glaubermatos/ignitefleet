import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { HomeHeader } from "../../components/HomeHeader";
import { CarStatus } from '../../components/CarStatus';

import { Container, Content } from "./styles";
import { useNavigation } from '@react-navigation/native';

export function Home() {
    const { navigate } = useNavigation()

    function handleRegisterMoviment() {
        navigate("departure")
    }

    return (
        <Container>
            <HomeHeader />

            <Content>
                <CarStatus onPress={handleRegisterMoviment}/>
            </Content>

        </Container>
    );
}