import { useEffect, useState } from 'react';
import * as Webbrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'

import Realm from 'realm';

import { Container, Title, Slogan } from './styles';

import backgroundImg from '../../assets/background.png'
import { Button } from '../../components/Button';
import { Alert, View } from 'react-native';

import {useApp, UserProvider, AppProvider} from '@realm/react';

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env'

Webbrowser.maybeCompleteAuthSession();

export function SignIn() {
  const app = useApp()

  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const [_, response, googleSignIn] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ['profile', 'email']
  })
  
  function handleGoogleSignIn(){
    setIsAuthenticating(true)

    googleSignIn().then(response => {
      if (response.type !== 'success') {
        setIsAuthenticating(false)
      }
    });  
  }

  useEffect(() => {
    if (response?.type === 'success') {
      if (response.authentication?.idToken) {
        const credentials = Realm.Credentials.jwt(response.authentication.idToken);

        app.logIn(credentials).catch(error => {
          console.log(error)
          Alert.alert('Entrar', 'Não foi possível conectar-se com sua conta Google.')
          setIsAuthenticating(false)
        })

        // fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.authentication.idToken}`)
        //   .then(response => response.json())
        //   .then(console.log)

      } else {
        Alert.alert('Entrar', 'Não foi possível conectar-se com sua conta Google.')
        setIsAuthenticating(false)
      }
    }
  }, [response])

  return (
    <Container source={backgroundImg}>
      <Title>
        Ignite Fleet
      </Title>

      <Slogan>
        Gestão de uso de veículos
      </Slogan>

      <Button 
        onPress={handleGoogleSignIn}
        isLoading={isAuthenticating}
        title='Entrar co  m o Google'
      />
    </Container>
  );
}