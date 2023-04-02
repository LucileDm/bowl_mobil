import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ReviewScreen from "../../screens/Reviews/ReviewScreen.js";
import TextLogo from "../../components/TextLogo.js";
import MaintenanceScreen from '../../screens/Maintenance/MaintenanceScreen.js';
import HomeScreen from '../../screens/Home/HomeScreen.js';

const Stack = createNativeStackNavigator();
const headerTitle = { headerTitle: () => <TextLogo /> };

function ReviewStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReviewAdd"
        component={MaintenanceScreen}
        options={headerTitle}
      />

      <Stack.Screen
        name="ReviewList"
        component={MaintenanceScreen}
        options={headerTitle}
      />

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={headerTitle}
      />
    </Stack.Navigator>
  );
}

export default ReviewStack;
