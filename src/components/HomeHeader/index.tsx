import { Power } from 'phosphor-react-native';

import { Container, Greeting, Message, Name, Picture } from "./styles";

import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import THEME from '../../theme/index'

import { useApp, useUser } from '@realm/react';

export function HomeHeader() {
    const user = useUser()
    const app = useApp()
    const insets = useSafeAreaInsets()
    
    const paddingTop = insets.top + 32;

    function handleSignOut() {
        app.currentUser?.logOut()
    }

    return (
        <Container style={{paddingTop}}>
            <Picture
                source={{ uri: user?.profile.pictureUrl}} 
                placeholder="L184i9offQof00ayfQay~qj[fQj["
            />

            <Greeting>
                <Message>
                    Olá
                </Message>

                <Name>
                   {user?.profile.name}
                </Name>
            </Greeting>

            <TouchableOpacity activeOpacity={0.7} onPress={handleSignOut}>
                <Power size={32} color={THEME.COLORS.GRAY_400} />
            </TouchableOpacity>
        </Container>
    )
}