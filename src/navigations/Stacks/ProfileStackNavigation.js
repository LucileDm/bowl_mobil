import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditScreen from "../../screens/Account/EditAccountScreen";

const Stack = createNativeStackNavigator();

function ProfileStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Modifier mon compte"
        component={EditScreen}
      />
    </Stack.Navigator>
  );
}

export default ProfileStackNavigation;
