import { NavigationContainer } from '@react-navigation/native';
import HomeStackNavigation from './src/navigations/HomeStackNavigation';

function App() {
  return (
    <NavigationContainer>
      <HomeStackNavigation />
    </NavigationContainer>
  );
}

export default App;