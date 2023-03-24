import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditScreen from "../../screens/Account/EditAccountScreen";
import AccountScreen from "../../screens/Account/AccountScreen";

const Stack = createNativeStackNavigator();

function ProfileStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
      name="Gestion du compte"
      component={AccountScreen}
      />
      <Stack.Screen
        name="Modifier mon compte"
        component={EditScreen}
      />
    </Stack.Navigator>
  );
}

export default ProfileStackNavigation;
