const Stack = createNativeStackNavigator();
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookingScreen from '../../screens/Booking/BookingScreen.js';
// import AddBooking from "../../screens/Booking/AddBooking";
// import ListBookings from "../../screens/Booking/ListBookings";
import TextLogo from "../../components/TextLogo.js";

const headerTitle = { headerTitle: () => <TextLogo /> };

function BookingStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Reservation'
        component={BookingScreen}
        options={headerTitle}
        />
      
      {/* <Stack.Screen
        name="Ajouter une réservation"
        component={AddBooking}
        options={headerTitle}
      />

      <Stack.Screen
        name="Liste des réservations"
        component={ListBookings}
        options={headerTitle}
      /> */}
    </Stack.Navigator>
  );
}

export default BookingStackNavigation;
