import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ReviewScreen from "../../screens/Reviews/ReviewScreen.js";
import TextLogo from "../../components/TextLogo.js";

const Stack = createNativeStackNavigator();
const headerTitle = { headerTitle: () => <TextLogo /> };

function ReviewStack() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="ReviewAdd"
        //component={AddBooking}
        options={headerTitle}
      /> */}

      <Stack.Screen
        name="ReviewList"
        component={ReviewScreen}
        options={headerTitle}
      />
    </Stack.Navigator>
  );
}

export default ReviewStack;
