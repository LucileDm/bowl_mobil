import { NativeBaseProvider, Text, HStack } from 'native-base';
import { theme } from '../utils/theme.js';
import { useFonts, isLoaded } from 'expo-font';

const TextLogo = () => {

  // get custom fonts
  if (!isLoaded('mauikea') || !isLoaded('body'))
  {
    useFonts({
      'mauikea': require('../../assets/fonts/mauikea/mauikea.otf'),
      'body': require('../../assets/fonts/IBM_Plex_Sans/IBMPlexSans-Regular.ttf')
    })
  }

  return (
    <NativeBaseProvider theme={theme} >
      <HStack px="5" >
        <Text fontFamily="mauikea" fontSize="20">Bowllywood</Text> 
      </HStack>
    </NativeBaseProvider>
  );
}

export default TextLogo;