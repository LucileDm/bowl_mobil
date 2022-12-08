import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Box } from "native-base";
import Theme from "./src/utils/theme";
import LoginScreen from "./src/screens/Login/LoginScreen";
import AxiosProvider from "./src/providers/axiosProvider";
import { AuthContext } from "./src/contexts/AuthContext";
import { useState } from "react";
import CommonNavigation from "./src/navigations/Common/CommonNavigation";

function App() {
  const [user, setUser] = useState(null);
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={Theme}>
        <AuthContext.Provider value={{ user, setUser: setUser }}>
          <AxiosProvider>
            <Box flex={1}>
              {/* <TextLogo /> */}
              {!user?.token ? <LoginScreen /> : <CommonNavigation />}
            </Box>
          </AxiosProvider>
        </AuthContext.Provider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
