import Header from '@open-privy-expo-app/screens/welcome/Header';
import Content from './Content';
import AppScreenContainer from '@open-privy-expo-app/components/AppScreenContainer';

export default function WelcomeScreen() {
  return (
    <AppScreenContainer>
      <Header />
      <Content />
    </AppScreenContainer>
  );
}

