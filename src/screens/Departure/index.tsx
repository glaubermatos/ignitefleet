import { useRef } from "react";
import { ScrollView, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { LicensePlateInput } from "../../components/LicensePlateInput";
import { TextAreaInput } from "../../components/TextAreaInput";

import { Container, Content } from "./styles";

const keyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

export function Departure() {

    const descriptionRef = useRef<TextInput>(null)

    function handleDepartureRegister() {
        console.log("Ok!")
    }

    return (
        <Container>
            <Header title="Saída" />

            <KeyboardAvoidingView style={{ flex: 1 }} behavior={ keyboardAvoidingViewBehavior }>
                <ScrollView>
                    <Content>
                        <LicensePlateInput
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