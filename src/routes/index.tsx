import { AppRoutes } from './app.routes';
import { NavigationContainer } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Toast from 'react-native-toast-message';
import { TopMessage } from '../components/TopMessage';

export function Routes() {
    const insets = useSafeAreaInsets()

    return (
        <NavigationContainer>
            <AppRoutes />

            <Toast 
                config={{
                    info: ({ text2 }) => <TopMessage title={String(text2)} />
                }}
                topOffset={insets.top}
            />
        </NavigationContainer>
    );
}