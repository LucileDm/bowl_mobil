import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import Theme from "./src/utils/theme";
import HomeStackNavigation from "./src/navigations/Stacks/HomeStackNavigation";
import AxiosProvider from "./src/providers/axiosProvider";
import { AuthContext } from "./src/contexts/AuthContext";
import { useState } from "react";

import TabNavigator from "./src/navigations/Tabs/TabNavigator";
import LoginStackNavigation from "./src/navigations/Stacks/LoginStackNavigation.js";

function App() {
  const [user, setUser] = useState(null);

  return (
    <NativeBaseProvider theme={Theme}>
      <AuthContext.Provider value={{ user, setUser: setUser }}>
        <AxiosProvider>
            <LoginStackNavigation />
            <NavigationContainer>
              {/* si user est connecté */}
              { user?.data.token ? 
              <>
              <HomeStackNavigation />
              <TabNavigator /> 
              </>
              : null }
            </NavigationContainer>
        </AxiosProvider>
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}

export default App;