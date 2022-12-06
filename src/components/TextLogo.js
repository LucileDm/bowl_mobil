import { NativeBaseProvider, Text, HStack, useTheme } from 'native-base';
import { theme } from '../utils/theme.js';
import { useFonts } from 'expo-font';

const TextLogo = () => {

  // get custom fonts
  const [fonts] = useFonts({
    'mauikea': require('../../assets/fonts/mauikea/mauikea.otf'),
    'ibm': require('../../assets/fonts/IBM_Plex_Sans/IBMPlexSans-Regular.ttf')
  })

  const {colors} = useTheme()
  
  return (
      <HStack px="5" >
        <Text fontFamily="mauikea" color={colors.primary.dark_grey} fontSize="20">Bowllywood</Text> 
      </HStack>
  );
}

export default TextLogo;