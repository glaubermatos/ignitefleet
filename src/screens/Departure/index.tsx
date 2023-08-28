import { useRef, useState } from "react";
import { ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { LicensePlateInput } from "../../components/LicensePlateInput";
import { TextAreaInput } from "../../components/TextAreaInput";

import { Container, Content } from "./styles";
import { licensePlateValidate } from "../../utils/licensePlateValidate";

const keyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

export function Departure() {
    const [description, setDescription] = useState('');
    const [licensePlate, setLicensePlate] = useState('');

    const descriptionRef = useRef<TextInput>(null)
    const licensePlateRef = useRef<TextInput>(null)

    function handleDepartureRegister() {
        if (!licensePlateValidate(licensePlate)) {
            licensePlateRef.current?.focus();
            return Alert.alert("Placa inválida", "A placa é inválida. Por favor informe a placa correta do veículo.")
        }
    }

    return (
        <Container>
            <Header title="Saída" />

            <KeyboardAvoidingView style={{ flex: 1 }} behavior={ keyboardAvoidingViewBehavior }>
                <ScrollView>
                    <Content>
                        <LicensePlateInput
                            ref={licensePlateRef}
                            label="Placa do veículo"
                            placeholder="BRA1234"
                            onSubmitEditing={() => descriptionRef.current?.focus()}
                            returnKeyType="next"
                        />

                        <TextAreaInput 
                            ref={descriptionRef}
                            label="Finalidade"
                            placeholder="Vou utlizar o vaículo para..."
                            onSubmitEditing={handleDepartureRegister}
                            returnKeyType="send"
                            blurOnSubmit
                        />

                        <Button 
                            title="Registrar saída"
                            onPress={handleDepartureRegister}
                            />
                    </Content>
                </ScrollView>
            </KeyboardAvoidingView>
        </Container>
    );
}