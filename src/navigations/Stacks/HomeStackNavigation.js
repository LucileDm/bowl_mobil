import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../screens/HomeScreen.js';
import BowlScreen from '../../screens/BowlScreen.js';
import BookingScreen from '../../screens/Booking/BookingScreen.js';
import ReviewScreen from '../../screens/Reviews/ReviewScreen.js';
import TextLogo from '../../components/TextLogo.js';

const Stack = createNativeStackNavigator();
const headerTitle =  { headerTitle: () => <TextLogo /> } ;

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

            <Stack.Screen name='Reservation' component={BookingScreen} />
            <Stack.Screen name='Review' component={ReviewScreen} />
        </Stack.Navigator>
    );
}

export default HomeStackNavigation;