import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

import { SignIn } from './src/screens/SignIn';

import THEME from './src/theme';
import { Loading } from './src/components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold})

  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <ThemeProvider theme={THEME}>
      <StatusBar
        style="light"
        backgroundColor='transparent'
        translucent
      />

      <SignIn />
    </ThemeProvider>
  );
}
