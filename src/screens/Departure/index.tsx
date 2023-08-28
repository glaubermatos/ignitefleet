import { useRef, useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert } from "react-native";

import { useRealm } from '../../lib/realm/index'
import { Historic } from "../../lib/realm/schemas/Historic";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { LicensePlateInput } from "../../components/LicensePlateInput";
import { TextAreaInput } from "../../components/TextAreaInput";

import { Container, Content } from "./styles";
import { licensePlateValidate } from "../../utils/licensePlateValidate";
import { useUser } from "@realm/react";
import { useNavigation } from "@react-navigation/native";

const keyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

export function Departure() {
    const [description, setDescription] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [isRegistering, setIsREgistering] = useState(false)

    const user = useUser()
    const realm = useRealm()
    const { goBack } = useNavigation()

    const descriptionRef = useRef<TextInput>(null)
    const licensePlateRef = useRef<TextInput>(null)

    function handleDepartureRegister() {
        try {
            if (!licensePlateValidate(licensePlate)) {
                licensePlateRef.current?.focus();
                return Alert.alert("Placa inválida", "A placa é inválida. Por favor informe a placa correta do veículo.")
            }
    
            if (description.trim().length === 0) {
                descriptionRef.current?.focus();
                return Alert.alert("Finalidade", "Por favor, informe a finalidade da utilização do veículo.");
            }

            setIsREgistering(true)

            //write é baseado em transações
            realm.write(() => {
                realm.create('Historic', Historic.generate({
                    user_id: user!.id,
                    license_plate: licensePlate.toUpperCase(),
                    description
                }))
            })

            Alert.alert("Saída", "Saída do veículo registrada com sucesso!");
            goBack()

        } catch (error) {
            console.log(error)
            setIsREgistering(false)
            Alert.alert('Erro', 'Não foi possível registrar a saída do veículo.')
        }
    }

    return (
        <Container>
            <Header title="Saída" />

            {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior={ keyboardAvoidingViewBehavior }> */}
            <KeyboardAwareScrollView extraHeight={100}>
                <ScrollView>
                    <Content>
                        <LicensePlateInput
                            ref={licensePlateRef}
                            onChangeText={setLicensePlate}
                            label="Placa do veículo"
                            placeholder="BRA1234"
                            onSubmitEditing={() => descriptionRef.current?.focus()}
                            returnKeyType="next"
                        />

                        <TextAreaInput 
                            ref={descriptionRef}
                            onChangeText={setDescription}
                            label="Finalidade"
                            placeholder="Vou utlizar o vaículo para..."
                            onSubmitEditing={handleDepartureRegister}
                            returnKeyType="send"
                            blurOnSubmit
                        />

                        <Button 
                            title="Registrar saída"
                            onPress={handleDepartureRegister}
                            isLoading={isRegistering}
                        />
                    </Content>
                </ScrollView>
            </KeyboardAwareScrollView>
            {/* </KeyboardAvoidingView> */}
        </Container>
    );
}