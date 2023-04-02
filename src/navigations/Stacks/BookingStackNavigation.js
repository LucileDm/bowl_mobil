const Stack = createNativeStackNavigator();
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookingScreen from '../../screens/Booking/BookingScreen.js';
import AddBooking from "../../screens/Booking/AddBooking";
import ListBookings from "../../screens/Booking/ListBookings";
import TextLogo from "../../components/TextLogo.js";
import RouteProtector from './components/RouteProtector';

const headerTitle = { headerTitle: () => <TextLogo /> };

function BookingStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Reservations'
        component={
          <RouteProtector permittedRoles={['ROLE_USER']}>
            {BookingScreen}
          </RouteProtector>
        }
        options={headerTitle}
        />
      
       <Stack.Screen
        name="Add"
        component={
          <RouteProtector permittedRoles={['ROLE_USER', 'ROLE_WAITER', 'ROLE_CEO']}>
            {AddBooking}
          </RouteProtector>
        }
        options={headerTitle}
      />

      <Stack.Screen
        name="Edit"
        component={
          <RouteProtector permittedRoles={['ROLE_USER', 'ROLE_WAITER', 'ROLE_CEO']}>
            {AddBooking}
          </RouteProtector>
        }
        options={headerTitle}
      />

      <Stack.Screen
        name="Cancel"
        component={
          <RouteProtector permittedRoles={['ROLE_USER', 'ROLE_WAITER', 'ROLE_CEO']}>
            {AddBooking}
          </RouteProtector>
        }
        options={headerTitle}
      />
      
    </Stack.Navigator>
  );
}

export default BookingStackNavigation;
