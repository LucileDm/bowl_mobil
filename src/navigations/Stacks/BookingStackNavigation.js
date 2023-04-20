const Stack = createNativeStackNavigator();
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookingScreen from '../../screens/Booking/BookingScreen.js';
import TextLogo from "../../components/TextLogo.js";
import ErrorStack from './ErrorStackNavigation';
// import routeProtector from '../../utils/routeProtector.js';

const headerTitle = { headerTitle: () => <TextLogo /> };

function BookingStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Reservations'
        options={headerTitle}
        component={BookingScreen} />
      
      <Stack.Screen options={{headerShown: false}} name='Erreur' component={ErrorStack}/>
    </Stack.Navigator>
  );
}

export default BookingStackNavigation;
