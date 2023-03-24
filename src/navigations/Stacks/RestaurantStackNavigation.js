import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RestaurantListScreen from "./../../screens/Restaurant/RestaurantListScreen";
import RestaurantScreen from "../../screens/Restaurant/RestaurantScreen";
import TextLogo from "../../components/TextLogo.js";

const Stack = createNativeStackNavigator();
const headerTitle = { headerTitle: () => <TextLogo /> };

function RestaurantStackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="RestaurantList"
        component={RestaurantListScreen}
        options={headerTitle}
      />

      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantScreen}
        options={headerTitle}
      />
    </Stack.Navigator>
  );
}

export default RestaurantStackNavigation;
