import { NativeBaseProvider,
      Text,
      VStack,
      Box, 
      useTheme}
    from 'native-base';

import { theme } from '../utils/theme.js';
import { useFonts } from 'expo-font';

const GreenTitle = (props) => {
    
  // get custom fonts
  const [fonts] = useFonts({
      'mauikea': require('../../assets/fonts/mauikea/mauikea.otf'),
      'ibm': require('../../assets/fonts/IBM_Plex_Sans/IBMPlexSans-Regular.ttf')
  })

  const { colors } = useTheme();

  return (
    <NativeBaseProvider theme={theme} >
      
      <Box position="relative" >
        <Box 
          backgroundColor={colors.primary.pale_green}
          position="absolute"
          width="45%"
          height="90%"
          ></Box>
      
        <VStack pl="8" pt={6}>
          <Text style={{fontFamily: "ibm"}} 
              fontSize={props.titleSize ?? "2xl"}
              color="colors.primary.dark_grey" 
              bold>{props.title}</Text>

          <Text style={{fontFamily: "ibm"}}
              lineHeight="2xs"
              fontSize="md"
              color="colors.primary.dark_grey" >{props.subTitle}</Text>
        </VStack>
      </Box>

    </NativeBaseProvider>
  );
}

export default GreenTitle;