import Home from './src/screens/Home.js';
import RegisterScreen from './src/screens/RegisterScreen.js';
import { FranchiseRequestAddScreen } from './src/screens/FranchiseRequestAddScreen';
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
              <LoginScreen />
              {/* si user est connecté */}
             { user?.data.token ? 
                <TabNavigator />
              : null }
            </NavigationContainer>
          </Box>
        </AxiosProvider>
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}

export default App;
