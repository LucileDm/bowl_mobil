import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import Theme from "./src/utils/theme";
import HomeStackNavigation from "./src/navigations/Stacks/HomeStackNavigation";
// import RegisterScreen from "./src/screens/RegisterScreen.js";

function App() {
  return (
    <NativeBaseProvider theme={Theme}>
      <NavigationContainer>
        {/* <RegisterScreen /> */}
        <HomeStackNavigation />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;