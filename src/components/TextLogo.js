import { Text, HStack, useTheme } from 'native-base';
import { useFonts } from 'expo-font';

const TextLogo = () => {

  // get custom fonts
  const [fonts] = useFonts({
    // 'mauikea': require('../../assets/fonts/mauikea/mauikea.ttf')
  })

  const {colors} = useTheme()
  
  return (
      <HStack px="5" >
        <Text style={{fontFamily: "mauikea"}} color={colors.primary.dark_grey} fontSize="20">Bowllywood</Text> 
      </HStack>
  );
}

export default TextLogo;