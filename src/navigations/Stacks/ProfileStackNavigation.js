import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditScreen from "../../screens/Account/EditAccountScreen";
import AccountScreen from "../../screens/Account/AccountScreen";
import TextLogo from "../../components/TextLogo";

const Stack = createNativeStackNavigator();
const headerTitle = { headerTitle: () => <TextLogo /> }

function ProfileStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
      name="Gestion du compte"
      component={AccountScreen}
      options={headerTitle}
      />
      <Stack.Screen
        name="Modifier mon compte"
        component={EditScreen}
        options={headerTitle}
      />
    </Stack.Navigator>
  );
}

export default ProfileStackNavigation;
