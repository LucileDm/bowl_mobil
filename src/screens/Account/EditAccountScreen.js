import { NativeBaseProvider, Text, Box } from 'native-base';
import { theme } from '../../utils/theme.js';

function EditScreen({route}) {
    const { userID } = route.params;
  return (
      <Box flex={1} >
        <Text>Bowl</Text>
      </Box>
  );
}

export default EditScreen;