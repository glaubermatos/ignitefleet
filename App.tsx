import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

import {UserProvider, AppProvider} from '@realm/react';

import { REALM_APP_ID } from '@env'

import { SignIn } from './src/screens/SignIn';

import THEME from './src/theme';
import { Loading } from './src/components/Loading';
import { Home } from './src/screens/Home';

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold})

  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={THEME}>
        <StatusBar
          style="light"
          backgroundColor='transparent'
          translucent
          />
        <UserProvider fallback={SignIn}>
          <Home />
        </UserProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
