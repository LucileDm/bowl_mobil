import { NavigationContainer } from '@react-navigation/native';
import HomeSackNavigation from './src/navigations/HomeStackNavigation';

function App() {
  return (
    <NavigationContainer>
      {/* <TextLogo /> */}
      {/* si user est connecté */}
      <HomeSackNavigation />

    </NavigationContainer>
  );
}

export default App;