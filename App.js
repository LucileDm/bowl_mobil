import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Box } from "native-base";
import Theme from "./src/utils/theme";
import TabNavigator from "./src/navigations/Tabs/TabNavigator";
import LoginScreen from "./src/screens/LoginScreen";
import AxiosProvider from "./src/providers/axiosProvider";
import { AuthContext } from "./src/contexts/AuthContext";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  return (
    <NativeBaseProvider theme={Theme}>
      <AuthContext.Provider value={{ user, setUser: setUser }}>
        <AxiosProvider>
          <Box flex={1}>
            <NavigationContainer>
              {/* <TextLogo /> */}
              {/* si user est connecté */}
              <LoginScreen />
              <TabNavigator />
            </NavigationContainer>
          </Box>
        </AxiosProvider>
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}

export default App;
