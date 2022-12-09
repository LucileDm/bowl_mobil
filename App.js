import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import Theme from "./src/utils/theme";
import AxiosProvider from "./src/providers/axiosProvider";
import { AuthContext } from "./src/contexts/AuthContext";
import { useState } from "react";
import CommonNavigation from "./src/navigations/Common/CommonNavigation";
import LoginStackNavigation from "./src/navigations/Stacks/LoginStackNavigation.js";

function App() {
  const [user, setUser] = useState(null);

  return (
    <NativeBaseProvider theme={Theme}>
      <AuthContext.Provider value={{ user, setUser: setUser }}>
        <AxiosProvider>
            <NavigationContainer>
            {console.log(!user?.token)}
              {!user?.token ? <LoginStackNavigation /> : <CommonNavigation />}
              {console.log('ta mere', !user?.token)}
            </NavigationContainer>
        </AxiosProvider>
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}

export default App;