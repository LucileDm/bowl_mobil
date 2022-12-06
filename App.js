import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Box, Text } from "native-base";
import Theme from "./src/utils/theme";
import HomeStackNavigation from "./src/navigations/Stacks/HomeStackNavigation";
// import RegisterScreen from "./src/screens/RegisterScreen.js";

function App() {
  return (
    <NativeBaseProvider theme={Theme}>
      <Box flex={1}>
        <NavigationContainer>
          <HomeStackNavigation />
          {/* <RegisterScreen /> */}
        </NavigationContainer>
      </Box>
    </NativeBaseProvider>
  );
}

export default App;