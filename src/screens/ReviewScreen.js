import { NativeBaseProvider, Text, Box } from 'native-base';
import { theme } from '../utils/theme.js';

function Review() {
  return (
    <NativeBaseProvider theme={theme}>
      <Box flex={1} >
        <Text>Review</Text>
      </Box>
    </NativeBaseProvider>
  );
}

export default Review;