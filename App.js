import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Box, Text, useTheme } from "native-base";
import Theme from "./src/utils/theme";
import HomeStackNavigation from "./src/navigations/Stacks/HomeStackNavigation";
// import RegisterScreen from "./src/screens/RegisterScreen.js";

function App() {

  // const {colors} = useTheme();
  
  return (
    <NativeBaseProvider theme={Theme}>
      <NavigationContainer>
        <HomeStackNavigation />
        {/* <RegisterScreen /> */}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;