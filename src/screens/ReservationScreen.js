import { NativeBaseProvider, Text, Box } from 'native-base';
import { theme } from '../utils/theme.js';

function Reservation() {
  return (
    <NativeBaseProvider theme={theme}>
      <Box flex={1} >
        <Text>Reservation</Text>
      </Box>
    </NativeBaseProvider>
  );
}

export default Reservation;