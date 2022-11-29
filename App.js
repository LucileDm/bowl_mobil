import Home from './src/screens/Home.js';
import { useFonts } from 'expo-font';

function App() {
  const [fontsLoaded] = useFonts({
    'mauikea': require('./assets/fonts/mauikea/mauikea.otf'),
    'body': require('./assets/fonts/IBM_Plex_Sans/IBMPlexSans-Regular.ttf')
  })

  return (
    // la page de connexion devrait être la 1ere page à être affichée
    // lors de l'arrivée sur l'appli
    <Home />
  );
}

export default App;