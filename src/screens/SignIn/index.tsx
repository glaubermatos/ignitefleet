import { Container, Title, Slogan } from './styles';

import backgroundImg from '../../assets/background.png'
import { Button } from '../../components/Button';
import { View } from 'react-native';

export function SignIn() {
  return (
    <Container source={backgroundImg}>
      <Title>
        Ignite Fleet
      </Title>

      <Slogan>
        Gestão de uso de veículos
      </Slogan>

      <Button 
        isLoading={false}
        title='Entrar com o Google'
      />
    </Container>
  );
}