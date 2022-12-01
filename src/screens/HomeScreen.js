import { NativeBaseProvider, Text, Box, Button } from 'native-base';

import { theme } from '../utils/theme.js';

function Home({ navigation }) {
  return (
    <NativeBaseProvider theme={theme}>
      <Box flex={1}>
        <Text textAlign="center" >Accueil</Text>

        <Button
          onPress={() => navigation.navigate('Bowl')}>Bowl</Button>

        <Button
          onPress={() => navigation.navigate('Ajouter une réservation')}>Réserver mes places!</Button>

        <Button
          onPress={() => navigation.navigate('Review')}>Avis</Button>
      </Box>
    </NativeBaseProvider>
  );
}

export default Home;