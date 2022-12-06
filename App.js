import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Box, Text, useTheme } from "native-base";
import Theme from "./src/utils/theme";
import HomeStackNavigation from "./src/navigations/Stacks/HomeStackNavigation";
// import RegisterScreen from "./src/screens/RegisterScreen.js";

function App() {

  // const {colors} = useTheme();
  // bgColor={colors.primary.pale_green}

  return (
    <NativeBaseProvider theme={Theme}>
      <Box flex={1} 
      >
        <NavigationContainer>
          <HomeStackNavigation />
          {/* <RegisterScreen /> */}
        </NavigationContainer>
      </Box>
    </NativeBaseProvider>
  );
}

export default App;