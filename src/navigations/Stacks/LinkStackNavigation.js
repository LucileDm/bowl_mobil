import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LinkScreen from "../../screens/Link/LinkScreen";
import TextLogo from "../../components/TextLogo.js";
import ReviewStack from "../Stacks/ReviewStackNavigation";
import RestaurantStack from "../Stacks/RestaurantStackNavigation";

const Stack = createNativeStackNavigator();
const headerTitle = { headerTitle: () => <TextLogo /> };

function LinkStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LinkScreen"
        component={LinkScreen}
        options={headerTitle}
      />

      <Stack.Screen
        name="ReviewStack"
        component={ReviewStack}
        options={headerTitle}
      />

      <Stack.Screen
        name="RestaurantListStack"
        component={RestaurantStack}
        options={headerTitle}
      />
    </Stack.Navigator>
  );
}

export default LinkStackNavigation;
