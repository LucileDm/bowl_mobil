import Home from './src/screens/Home.js';
import RegisterScreen from './src/screens/RegisterScreen.js';
import { NativeBaseProvider } from 'native-base';
import { FranchiseRequestAddScreen } from './src/screens/FranchiseRequestAddScreen';

function App() {
  return (
    // la page de connexion devrait être la 1ere page à être affichée
      // lors de l'arrivée sur l'appli
    <NativeBaseProvider>
       {/* <Home /> */}
      {/* <RegisterScreen /> */}
      <FranchiseRequestAddScreen />
    </NativeBaseProvider>
  );
}

export default App;