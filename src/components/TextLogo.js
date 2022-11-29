import { NativeBaseProvider, Text, HStack } from 'native-base';
import { theme } from '../utils/theme.js';

const TextLogo = () => {
    return (
    <NativeBaseProvider theme={theme} >
      <HStack px="5" py="10">
        <Text fontFamily="mauikea" fontSize="20">Bowllywood</Text>
      </HStack>
    </NativeBaseProvider>
  );
}

export default TextLogo;