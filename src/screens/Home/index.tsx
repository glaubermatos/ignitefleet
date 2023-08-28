import { useSafeAreaInsets } from 'react-native-safe-area-context'


import { HomeHeader } from "../../components/HomeHeader";
import { CarStatus } from '../../components/CarStatus';

import { Container, Content, Label, Title } from "./styles";
import { useNavigation } from '@react-navigation/native';
import { useQuery, useRealm } from '../../lib/realm';
import { Historic } from '../../lib/realm/schemas/Historic';
import { useEffect, useState } from 'react';
import { Alert, FlatList  } from 'react-native';
import { HistoricCard, HistoryCardProps } from '../../components/HistoricCard';
import dayjs from 'dayjs';

export function Home() {
    const [vehicleHistoric, setVehicleHistoric] = useState<HistoryCardProps[]>([]);
    const [vehicleInUse, setVehicleInUse] = useState<Historic | null>();

    const realm = useRealm()
    const historic = useQuery(Historic);

    const { navigate } = useNavigation()

    function handleRegisterMoviment() {
        if (vehicleInUse?._id) {
            return navigate('arrival', { id: vehicleInUse._id.toString()});
        } else {
            navigate("departure")
        }
    }

    function fetchVehicleInUse() {
        try {
            const vehicle = historic.filtered("status = 'departure'")[0]
            setVehicleInUse(vehicle)
        } catch (error) {
            Alert.alert("Veículo em uso", "Não foi possível carregar o veículo em uso.")
            console.log(error)
        }
    }

    function fetchHistoric() {
        try {
            const response = historic.filtered("status = 'arrival' SORT(created_at DESC)");

            const formattedHistoric = response.map(item => {
                return {
                    id: item._id!.toString(),
                    licensePlate: item.license_plate,
                    isSync: false,
                    created: dayjs(item.created_at).format('[Saída em] DD/MM/YYYY [às] HH:mm')
                }
            })
    
            setVehicleHistoric(formattedHistoric);

        } catch (error) {
            console.log(error)
            Alert.alert('Error', 'Não foi possível carregar o histórico.')
        }
    }

    function handleHistoricDetails(id: string) {
        navigate('arrival', { id })
    }

    //carrega no momento que a interface for carregada
    useEffect(() => {
        fetchVehicleInUse();
    }, [])

    // recarrega os dados quando ouver uma mudança nos dados, listener
    useEffect(() => {
        realm.addListener('change', () => fetchVehicleInUse())

        return () => {
            if (realm && !realm.isClosed) {
                realm.removeListener('change', fetchVehicleInUse)
            }
        }
    }, [])

    useEffect(() => {
        fetchHistoric()
    }, [historic])

    return (
        <Container>
            <HomeHeader />

            <Content>
                <CarStatus
                    licensePlate={vehicleInUse?.license_plate}
                    onPress={handleRegisterMoviment}
                />

                <Title>
                    Histórico
                </Title>

                <FlatList 
                    data={vehicleHistoric}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <HistoricCard
                        onPress={() => handleHistoricDetails(item.id)}
                            data={item}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListEmptyComponent={() => (
                        <Label>
                            Nenhum registro de utilização de veículo.
                        </Label>
                    )}
                />

            </Content>

        </Container>
    );
}