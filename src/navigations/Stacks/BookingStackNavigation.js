import { createNativeStackNavigator } from "@react-navigation/native-stack";

//J'importe mes écrans
import AddBooking from "../../screens/Booking/AddBooking";
import ListBookings from "../../screens/Booking/ListBookings";
import TextLogo from "../../components/TextLogo.js";

//Je déclare ma stack
const Stack = createNativeStackNavigator();
//Je set mon headerTitle
const headerTitle = { headerTitle: () => <TextLogo /> };

function BookingStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Ajouter une réservation"
        component={AddBooking}
        options={headerTitle}
      />

      <Stack.Screen
        name="Liste des réservations"
        component={ListBookings}
        options={headerTitle}
      />
    </Stack.Navigator>
  );
}

export default BookingStackNavigation;
