import { NativeBaseProvider, Text, Box, Button } from "native-base";
import { theme } from "../../utils/theme.js";

function ReviewScreen() {
  return (
    <Box flex={1}>
      <Button onPress={() => navigation.navigate("Avis")}>Bowl</Button>
    </Box>
  );
}

export default ReviewScreen;
