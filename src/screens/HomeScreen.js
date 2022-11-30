import { NativeBaseProvider, Text, Box } from 'native-base';
import { Button } from 'react-native';

import { theme } from '../utils/theme.js';

function Home({ navigation }) {
  return (
    <NativeBaseProvider theme={theme}>
      <Box flex={1}>
        <Text textAlign="center" >Accueil</Text>

        <Button
          title="Bowl"
          onPress={() => navigation.navigate('Bowl')}
          />

        <Button
          title="Reservation"
          onPress={() => navigation.navigate('Reservation')}
          />

        <Button
          title="Review"
          onPress={() => navigation.navigate('Review')}
        />
      </Box>
    </NativeBaseProvider>
  );
}

export default Home;