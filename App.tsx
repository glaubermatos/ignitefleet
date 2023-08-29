import 'react-native-get-random-values'
import './src/lib/dayjs'

import { StatusBar } from 'expo-status-bar';
import { WifiSlash } from 'phosphor-react-native';
import { ThemeProvider } from 'styled-components/native'
import { useNetInfo } from '@react-native-community/netinfo'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

import {UserProvider, AppProvider} from '@realm/react';
import { RealmProvider, syncConfig } from './src/lib/realm'

import { REALM_APP_ID } from '@env'

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Loading } from './src/components/Loading';
import { TopMessage } from './src/components/TopMessage';

import { SignIn } from './src/screens/SignIn';

import { Routes } from './src/routes';

import theme from './src/theme';


export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold})
  const netInfo = useNetInfo()

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

          {
            !netInfo.isConnected &&
            <TopMessage 
            title='Você está off-line'
            icon={WifiSlash}
          />
          }

          <UserProvider fallback={SignIn}>
            <RealmProvider sync={syncConfig} fallback={Loading}>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
