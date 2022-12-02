import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RestaurantScreen from "../../screens/Restaurant/RestaurantScreen.js";
import ReviewStack from "./ReviewStackNavigation.js";
import TextLogo from "../../components/TextLogo.js";

const Stack = createNativeStackNavigator();
const headerTitle = { headerTitle: () => <TextLogo /> };

function ProfileStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Avis"
        component={ReviewStack}
        options={headerTitle}
      />

      <Stack.Screen
        name="Nos enseignes"
        component={RestaurantScreen}
        options={headerTitle}
      />
    </Stack.Navigator>
  );
}

export default ProfileStackNavigation;
