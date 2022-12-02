import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Box } from "native-base";
import Theme from "./src/utils/theme";
import TabNavigator from "./src/navigations/Tabs/TabNavigator";

function App() {
  return (
    <NativeBaseProvider theme={Theme}>
      <Box flex={1}>
      <NavigationContainer>
        {/* <TextLogo /> */}
        {/* si user est connecté */}
        <TabNavigator />
      </NavigationContainer>
      </Box>
    </NativeBaseProvider>
  );
}

export default App;
