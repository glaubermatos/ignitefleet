import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

import {UserProvider, AppProvider} from '@realm/react';

import { REALM_APP_ID } from '@env'

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SignIn } from './src/screens/SignIn';

import theme from './src/theme';

import { Routes } from './src/routes';
import { RealmProvider } from './src/lib/realm'

import { Loading } from './src/components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold})

  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800}}>
          <StatusBar
            style="light"
            backgroundColor='transparent'
            translucent
            />
          <UserProvider fallback={SignIn}>
            <RealmProvider>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
