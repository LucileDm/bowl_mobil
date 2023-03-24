import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { ActivityIndicator } from "react-native";
import Theme from "./src/utils/theme";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen"; 
import AxiosProvider from "./src/providers/axiosProvider";
import { AuthContext } from "./src/contexts/AuthContext";
import { useEffect, useState } from "react";
import CommonNavigation from "./src/navigations/Common/CommonNavigation";
import LoginStackNavigation from "./src/navigations/Stacks/LoginStackNavigation.js";
import Toast from 'react-native-toast-message';
import toastConfig from './src/utils/toastConfig.js';

SplashScreen.preventAutoHideAsync();

function App() {
  
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [user, setUser] = useState(null);

  let fontsList = {
    'mauikea': require('./assets/fonts/mauikea.otf'),
    'ibm': require('./assets/fonts/IBM_Plex_Sans/IBMPlexSans-Regular.ttf'),
  };

  async function loadFontsAsync() {
    await Font.loadAsync(fontsList);
    setFontsLoaded(true);
    await SplashScreen.hideAsync();
  }

  useEffect(() => {
    loadFontsAsync();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={Theme}>
      <AuthContext.Provider value={{ user, setUser: setUser }}>
        <AxiosProvider>
            <NavigationContainer>
              {!user?.data.token ? <LoginStackNavigation /> : <CommonNavigation />}
            </NavigationContainer>
          	<Toast config={toastConfig} />
        </AxiosProvider>
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default App;