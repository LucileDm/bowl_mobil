import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Box } from "native-base";
import Theme from "./src/utils/theme";
import TabNavigator from "./src/navigations/Tabs/TabNavigator";
import LoginScreen from "./src/screens/Login/LoginScreen";
import AxiosProvider from "./src/providers/axiosProvider";
import { AuthContext } from "./src/contexts/AuthContext";
import { useState } from "react";
import CommonNavigator from "./src/navigations/CommonNavigator";

function App() {
  const [user, setUser] = useState(null);
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={Theme}>
        <AuthContext.Provider value={{ user, setUser: setUser }}>
          <AxiosProvider>
            <Box flex={1}>
              {/* <TextLogo /> */}
              {!user?.token ? <LoginScreen /> : <CommonNavigator />}
            </Box>
          </AxiosProvider>
        </AuthContext.Provider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
