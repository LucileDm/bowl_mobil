import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen.js';
import BowlScreen from '../screens/BowlScreen.js';
import ReservationScreen from '../screens/ReservationScreen.js';
import ReviewScreen from '../screens/ReviewScreen.js';
import TextLogo from '../components/TextLogo.js';

const Stack = createNativeStackNavigator();
const headerTitle = { headerTitle: () => <TextLogo /> } ;

function HomeStackNavigation() {
    return(
        <Stack.Navigator>

            <Stack.Screen 
                name='Home'
                component={HomeScreen}
                options={headerTitle}
                />
            
            <Stack.Screen
                name='Bowl'
                component={BowlScreen}
                options={headerTitle}
                />

            <Stack.Screen name='Reservation' component={ReservationScreen} />
            <Stack.Screen name='Review' component={ReviewScreen} />
        </Stack.Navigator>
    );
}

export default HomeStackNavigation;