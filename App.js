import { Drawer, NativeBaseProvider } from 'native-base';
import TabNavigator from './src/navigation/TabNavigator.js';

function App() {
  return (
    // la page de connexion devrait être la 1ere page à être affichée
      // lors de l'arrivée sur l'appli
    <NativeBaseProvider>
      <TabNavigator />
    </NativeBaseProvider>
  );
}

export default App;