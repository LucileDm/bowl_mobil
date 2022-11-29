import { NativeBaseProvider, Text, Box } from 'native-base';

import { theme } from '../utils/theme.js';
import TextLogo from '../components/TextLogo.js';

function Home() {
  return (
    <NativeBaseProvider theme={theme}>
      <TextLogo />
      <Box flex={1} >
        <Text>Accueil</Text>
      </Box>
    </NativeBaseProvider>
  );
}

export default Home;