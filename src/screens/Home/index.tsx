import dayjs from 'dayjs';
import Realm from "realm";
import { useUser } from '@realm/react';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { Alert, FlatList  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useQuery, useRealm } from '../../lib/realm';

import { Historic } from '../../lib/realm/schemas/Historic';

import { getLastAsyncTimestamp, saveLastSyncTimestamp } from '../../lib/asyncStorage/syncStorage';

import { HomeHeader } from "../../components/HomeHeader";
import { CarStatus } from '../../components/CarStatus';
import { HistoricCard, HistoryCardProps } from '../../components/HistoricCard';

import { Container, Content, Label, Title } from "./styles";
import { TopMessage } from '../../components/TopMessage';
import { CloudArrowUp } from 'phosphor-react-native';

export function Home() {
    const [vehicleHistoric, setVehicleHistoric] = useState<HistoryCardProps[]>([]);
    const [vehicleInUse, setVehicleInUse] = useState<Historic | null>();
    const [percentageToSync, setPercentageToSync] = useState<string | null>(null);

    const realm = useRealm()
    const user = useUser()
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

    async function fetchHistoric() {
        try {
            const response = historic.filtered("status = 'arrival' SORT(created_at DESC)");

            const lastSync = await getLastAsyncTimestamp()

            const formattedHistoric = response.map(item => {
                return {
                    id: item._id!.toString(),
                    licensePlate: item.license_plate,
                    isSync: lastSync > item.updated_at!.getTime(),
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

    // calcula a porcentagem que falta para completar a sincronização dos dados com o banco de dados remoto
    async function progressNotification(transferred: number, transferable: number) {
        const percentage = (transferred/transferable) * 100;

        //salva a data e horario da ultima sincronizção, a sincronizaão termina quando o percente atinge 100%
        if (percentage === 100) {
            await saveLastSyncTimestamp()
            await fetchHistoric()

            setPercentageToSync(null)

            Toast.show({
                text1: "Sincronização de dados",
                text2: "Todos os dados estão sincronizados.",
                type: 'info',
            })
        }

        if (percentage < 100) {
            setPercentageToSync(`${percentage.toFixed(0)}% sincronizado.`)
        }
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

    //sincroniza com o atlasdb
    useEffect(() => {
        realm.subscriptions.update((mutableSubs, realm) => {
            const historicByUserQuery = realm.objects('Historic').filtered(`user_id = '${user!.id}'`);

            mutableSubs.add(historicByUserQuery, { name: 'historic_by_user'})
        })
    }, [realm])

    //notificação de dados transferidos
    useEffect(() => {
        const syncSession = realm.syncSession;

        if (!syncSession) {
            return;
        }

        syncSession.addProgressNotification(
            Realm.ProgressDirection.Upload,
            Realm.ProgressMode.ReportIndefinitely,
            progressNotification
        )

        return () => syncSession.removeProgressNotification(progressNotification)
    }, [])

    return (
        <Container>
            { percentageToSync && <TopMessage title={percentageToSync} icon={CloudArrowUp} /> }

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