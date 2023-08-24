import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native'
import { SignIn } from './src/screens/SignIn';
import THEME from './src/theme';

export default function App() {
  return (
    <ThemeProvider theme={THEME}>
      <StatusBar style="auto" />
      <SignIn />
    </ThemeProvider>
  );
}
