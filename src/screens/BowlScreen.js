import { NativeBaseProvider, Text, Box } from 'native-base';
import { theme } from '../utils/theme.js';

function Bowl() {
  return (
    <NativeBaseProvider theme={theme}>
      <Box flex={1} >
        <Text>Bowl</Text>
      </Box>
    </NativeBaseProvider>
  );
}

export default Bowl;