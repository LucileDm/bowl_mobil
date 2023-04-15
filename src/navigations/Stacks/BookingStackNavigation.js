const Stack = createNativeStackNavigator();
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookingScreen from '../../screens/Booking/BookingScreen.js';
import AddBooking from "../../screens/Booking/AddBooking";
import ListBookings from "../../screens/Booking/ListBookings";
import MaintenanceScreen from "../../screens/Maintenance/MaintenanceScreen";
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
      
       <Stack.Screen
        name="Add"
        component={AddBooking}
        options={headerTitle}
      />

      <Stack.Screen
        name="Edit"
        component={MaintenanceScreen}
        options={headerTitle}
      />

      <Stack.Screen
        name="Cancel"
        component={MaintenanceScreen}
        options={headerTitle}
      />
      
      <Stack.Screen options={{headerShown: false}} name='Erreur' component={ErrorStack}/>
    </Stack.Navigator>
  );
}

export default BookingStackNavigation;
